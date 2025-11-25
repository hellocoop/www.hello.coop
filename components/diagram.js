'use client'

import { useEffect, useState, useRef, useId } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import tippy, { hideAll } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'
import tooltipsCopy from '../public/protocol/tooltips.json'

gsap.registerPlugin(ScrollTrigger)

export default function TooltipSVG({ svg: initialSvg = '', data = {} }) {
    const id = useId() // SSR-safe unique ID
    const containerRef = useRef(null)
    const [svg, setSvg] = useState(initialSvg)
    const [circles, setCircles] = useState([])
    const [currentTooltip, setCurrentTooltip] = useState(null)
    const [scrollTooltip, setScrollTooltip] = useState(null)

    useEffect(() => {
        // remove toc for extra space
        const toc = document.querySelector('.nextra-toc')
        toc.style.display = 'none'
    }, [])

    const tooltipsJSON = { ...tooltipsCopy, ...data }

    // Update tooltips positions
    const addTooltips = () => {
        if (!containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()

        const nodes = Array.from(containerRef.current.querySelectorAll('tspan')).filter(
            i =>
                Object.keys(tooltipsJSON).includes(i.textContent) &&
                tooltipsJSON[i.textContent].length
        )

        const _circles = nodes
            .map(node => {
                const g = node.closest('g')
                if (!g) return null
                const rect = g.getBoundingClientRect()
                const key = node.textContent
                return key
                    ? {
                          key,
                          tooltipText: tooltipsJSON[key],
                          // position relative to container
                          x: rect.x - containerRect.x,
                          y: rect.y - containerRect.y,
                          width: rect.width,
                          height: rect.height,
                      }
                    : null
            })
            .filter(Boolean)

        _circles.sort((a, b) => a.key - b.key)
        setCircles(_circles)
    }

    // Show only the selected tooltip
    useEffect(() => {
        if (!currentTooltip) return
        hideAll()
        const tip = document.getElementById(currentTooltip)
        tip?._tippy?.show()
    }, [currentTooltip])

    // Initialize SVG, tooltips, and GSAP
    useEffect(() => {
        if (!svg || !containerRef.current) return

        // Remove any unwanted SVG url references
        setSvg(svg.replaceAll('url(#Shadow)', ''))

        addTooltips()

        // Initialize tippy on buttons
        const buttons = containerRef.current.querySelectorAll('button')
        buttons.forEach(ele => {
            tippy(ele, {
                animation: 'scale-subtle',
                allowHTML: true,
                zIndex: 40,
                arrow: true,
                popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
            })
        })

        // GSAP scroll triggers
        const circleElems = gsap.utils.toArray('.circle')
        circleElems.forEach(elem => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: elem,
                    start: 'top center',
                    end: 'bottom center',
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

        // Recalculate on resize/scroll
        const handleResizeScroll = () => addTooltips()
        window.addEventListener('resize', handleResizeScroll)
        window.addEventListener('scroll', handleResizeScroll)

        return () => {
            window.removeEventListener('resize', handleResizeScroll)
            window.removeEventListener('scroll', handleResizeScroll)
        }
    }, [svg])

    return (
        <div ref={containerRef} id={id} className="protocol-diagram flex justify-center relative">
            {circles.map((circle, index) => {
                const circleId = `${id}-${index}`
                return (
                    <button
                        key={circleId}
                        id={circleId}
                        data-tippy-content={`(${circle.key}) ${circle.tooltipText}`}
                        onMouseEnter={() => setCurrentTooltip(circleId)}
                        onMouseLeave={() => setCurrentTooltip(scrollTooltip)}
                        onFocus={() => setCurrentTooltip(circleId)}
                        onBlur={() => setCurrentTooltip(scrollTooltip)}
                        className="circle absolute rounded-full flex items-center justify-center z-50 cursor-pointer"
                        style={{
                            left: circle.x,
                            top: circle.y,
                            width: circle.width,
                            height: circle.height,
                        }}
                    />
                )
            })}
            <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
    )
}
