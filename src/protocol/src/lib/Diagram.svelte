<script>
  import { onMount, tick } from "svelte"
  import tooltipsCopy from "../assets/tooltips.json"
  import gsap from "gsap"
  import ScrollTrigger from "gsap/ScrollTrigger"
  import { customAlphabet } from "nanoid"
  import tippy, { hideAll } from "tippy.js"
  import "tippy.js/dist/tippy.css"
  const nanoid = customAlphabet("abcdefghijklmnopqr", 5)
  gsap.registerPlugin(ScrollTrigger)
  import "tippy.js/animations/scale-subtle.css"
  import Arrow from "../assets/arrow.svg?raw";

  export let svg = ""
  export let data = {} //pass json to override global tooltips

  let tooltipsJSON = {
    ...tooltipsCopy,
    ...data,
  }

  const id = nanoid()

  let circles = []
  let currentTooltip = null
  let scrollTooltip = null

  onMount(async () => {
    if (!svg) return
    svg = svg.replaceAll("url(#Shadow)", "")
    await tick()
    const ref = document.querySelector(`#${id} svg`)
    ref.setAttribute("width", "100%")
    ref.setAttribute("height", "100%")
    addTooltips()
    await tick()
    //attach tippy to tooltips
    document.querySelectorAll(`#${id} button`).forEach((ele) => {
      tippy(ele, {
        animation: "scale-subtle",
        allowHTML: true,
        zIndex: 40,
        arrow: Arrow,
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              enabled: false
            },
          ],
        },
      })
    })
    const circles = gsap.utils.toArray(".circle")
    circles.forEach((elem) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: elem,
          start: "top center",
          end: "bottom center",
          markers: false,
          onEnter: () => {
            scrollTooltip = currentTooltip = elem.id
          },
          onEnterBack: () => {
            scrollTooltip = currentTooltip = elem.id
          },
        },
      })
    })
  })

  //this function runs every time currentTooltip changes
  $: showTooltip(currentTooltip)

  function showTooltip(tip) {
    if (!tip) return
    hideAll() //this hides all instances of tippy
    // https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
    document.querySelector("#" + tip)._tippy.show() //only show selected
  }

  function addTooltips() {
    const ref = document.querySelector("#" + id)
    /*
      TBD: This is a brittle/fuzzy way of finding the circles in the svg.
      Omnigraffle does not consistently export circles as svg circles, instead 
      exports as svg paths. 
    */
    const nodes = [...ref.querySelectorAll("tspan")].filter(
      (i) =>
        Object.keys(tooltipsJSON).includes(i.innerHTML) &&
        tooltipsJSON[i.innerHTML].length
    )
    const _circles = []
    for (const node of nodes) {
      const circle = node.closest("g").getBoundingClientRect()
      const key = node.innerHTML //text inside svg circle, eg: 01, 99
      _circles.push({
        key,
        tooltipText: tooltipsJSON[key],
        x: circle.x + window.scrollX,
        y: circle.y + window.scrollY,
        width: circle.width, //only need to use width cause its a circle
        height: circle.height, //getting height in case shape in design file changes
      })
    }
    //sort by tooltip keys (01, 10, 99) for keyboard tabbing
    circles = _circles.sort((a, b) => a.key - b.key)
  }
</script>

<svelte:window on:scroll={addTooltips} on:resize={addTooltips} />

<div {id} class="flex justify-center">
  {#each circles as circle, index (index)}
    {@const circleId = `${id}-${index}`}
    <button
      id={circleId}
      data-tippy-content={`(${circle.key}) ${circle.tooltipText}`}
      on:mouseenter={() => (currentTooltip = circleId)}
      on:mouseleave={() => {
        currentTooltip = scrollTooltip
        showTooltip(currentTooltip)
      }}
      on:focus={() => (currentTooltip = circleId)}
      on:blur={() => {
        currentTooltip = scrollTooltip
        showTooltip(currentTooltip)
      }}
      class="circle absolute rounded-full flex items-center justify-center z-50"
      style="left: {circle.x}px; top: {circle.y}px; width: {circle.width}px; height: {circle.height}px"
    />
  {/each}
  {@html svg}
</div>
