<svelte:options tag="flip-anim"/>

<script>
	import { onMount } from 'svelte';
	import { linear, elasticOut } from 'svelte/easing'
	import Typewriter from 'typewriter-effect/dist/core';
	
	const duration = 1000;
	let typewriter;
	let ref;

	export let data = `[]`;
	let logos = JSON.parse(data);

	onMount(() => {
		typewriter = createTypewriterInstance();
	})
	
	const customNodeCreator = (character) => {
        return document.createTextNode(character);
      }

	function createTypewriterInstance(){
		// ref = document.getElementById("say-hello-with");
		const instance = new Typewriter(ref, {
	        loop: false,
	        delay: 50,
	        onCreateTextNode: customNodeCreator,
      	});

      	return instance.typeString('say Hellō with').start().callFunction(state => {
      		handleTypewriterCallFn(state);
      	});
	}

	function handleTypewriterCallFn(state){	
		state.elements.cursor.style.visibility = 'hidden';
		startLogoFlip = true;
		interval = setInterval(()=>{
			i++;
		}, 1000)
	}

	$:if(logos.length && i >= logos.length){
		i=0;
		clearInterval(interval);
		startLogoFlip = false;
		resetAnimation();
	}
	
	let i = 0;
	let interval;
	let texts = ["say Hellō with", "say Hellō how you want"]
	let selectedTextIndex = 0;
	let startLogoFlip = false;
	let startEndAnim = false;
	
	function resetAnimation(){
		startEndAnim=true;
		setTimeout(()=>{
			startEndAnim=false;
			//wati for element dom mount
			setTimeout(()=>{
				typewriter = createTypewriterInstance();
			}, 300)
		}, 2250)
	}

function inwards(node, params) {
	const { delay = 0, duration = 500, easing = elasticOut, type = "logo" } = params
	
	return {
		delay,
		duration: type === "logo" ? duration : 4000,
		easing: type === "logo" ? linear : elasticOut,
		css: t => `transform: rotateX(${90-(t*90)}deg)  translateZ(${-30+(t*30)}px)`
	}
}

function outwards(node, params) {
	const { delay = 0, duration, easing = elasticOut, type = "logo" } = params
	
	return {
		delay,
		duration: type === "logo" ? duration : 4000,
		easing: type === "logo" ? linear : elasticOut,
		css: t => `transform: rotateX(${(t*90)-90}deg)  translateZ(${(t*30)-30}px)`
	}
}
</script>

<div class="flex">
	{#if !startEndAnim}
		<h1 bind:this={ref} id="say-hello-with" class="text-2xl md:text-4xl absolute font-bold text-charcoal" out:outwards={{duration: 200}}> </h1>
	{:else}
		<h1 class="text-2xl md:text-4xl font-bold absolute text-charcoal" in:inwards={{type:"text"}}>say Hellō how you want</h1>
	{/if}
	{#if logos.length && startLogoFlip}
		{#key i}
			<img src={logos[i].link} alt="{logos[i].alt}" in:inwards out:outwards class="margin absolute mt-0.5 h-6 md:h-8" />
		{/key}
	{/if}
</div>
	
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

<style>
	img{
		transform-style: preserve-3d;
	}
	.margin{
		margin-left:  15.5rem;
	}
	@media screen and (max-width: 992px) {
	  .margin {
	    margin-left: 10.4rem;
	  }
	}
</style>