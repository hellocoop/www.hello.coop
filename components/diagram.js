'use client';

import { useEffect, useState, useRef, useCallback } from "react"
import tooltipsCopy from "../data/tooltips.json"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { customAlphabet } from "nanoid"
import tippy, { hideAll } from "tippy.js"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"
// import { Arrow } from "@/lib/svg-loader"

const nanoid = customAlphabet("abcdefghijklmnopqr", 5)
gsap.registerPlugin(ScrollTrigger)

export default function Diagram({ svg = "", data = {} }) {
  const [circles, setCircles] = useState([])
  const [currentTooltip, setCurrentTooltip] = useState(null)
  const [scrollTooltip, setScrollTooltip] = useState(null)
  const [processedSvg, setProcessedSvg] = useState("")
  const containerRef = useRef(null)
  const idRef = useRef(nanoid())

  const tooltipsJSON = {
    ...tooltipsCopy,
    ...data,
  }

  const showTooltip = useCallback((tip) => {
    if (!tip) return
    hideAll() //this hides all instances of tippy
    // https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
    const element = document.querySelector("#" + tip)
    if (element && element._tippy) {
      element._tippy.show() //only show selected
    }
  }, [])

  const addTooltips = useCallback(() => {
    if (!containerRef.current) return
    const ref = containerRef.current
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
    const sortedCircles = _circles.sort((a, b) => a.key - b.key)
    setCircles(sortedCircles)
  }, [tooltipsJSON])

  useEffect(() => {
    if (!svg) return
    setProcessedSvg(svg.replaceAll("url(#Shadow)", ""))
  }, [svg])

  useEffect(() => {
    if (!processedSvg || !containerRef.current) return
    
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      if (!containerRef.current) return
      const ref = containerRef.current.querySelector(`svg`)
      if (ref) {
        ref.setAttribute("width", "100%")
        ref.setAttribute("height", "100%")
      }
      addTooltips()
      
      //attach tippy to tooltips
      setTimeout(() => {
        if (!containerRef.current) return
        containerRef.current.querySelectorAll(`button`).forEach((ele) => {
          tippy(ele, {
            animation: "scale-subtle",
            allowHTML: true,
            zIndex: 40,
            // arrow: Arrow,
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
                setScrollTooltip(elem.id)
                setCurrentTooltip(elem.id)
              },
              onEnterBack: () => {
                setScrollTooltip(elem.id)
                setCurrentTooltip(elem.id)
              },
            },
          })
        })
      }, 100)
    }, 100)

    const handleScroll = () => addTooltips()
    const handleResize = () => addTooltips()
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [processedSvg, addTooltips])

  useEffect(() => {
    showTooltip(currentTooltip)
  }, [currentTooltip, showTooltip])

//   if (!processedSvg) return null

  return (
    <div id={idRef.current} ref={containerRef} className="flex justify-center">
      {circles.map((circle, index) => {
        const circleId = `${idRef.current}-${index}`
        return (
          <button
            key={circleId}
            id={circleId}
            data-tippy-content={`(${circle.key}) ${circle.tooltipText}`}
            onMouseEnter={() => setCurrentTooltip(circleId)}
            onMouseLeave={() => {
              setCurrentTooltip(scrollTooltip)
              showTooltip(scrollTooltip)
            }}
            onFocus={() => setCurrentTooltip(circleId)}
            onBlur={() => {
              setCurrentTooltip(scrollTooltip)
              showTooltip(scrollTooltip)
            }}
            className="circle absolute rounded-full flex items-center justify-center z-50"
            style={{
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              width: `${circle.width}px`,
              height: `${circle.height}px`
            }}
          />
        )
      })}
      <div dangerouslySetInnerHTML={{ __html: processedSvg }} />
    </div>
  )
}

