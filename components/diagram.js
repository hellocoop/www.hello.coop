'use client';

import { useEffect, useState, useRef, useCallback } from "react"
import tooltipsCopy from "../data/tooltips.json"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { customAlphabet } from "nanoid"
import tippy, { hideAll } from "tippy.js"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale-subtle.css"

const nanoid = customAlphabet("abcdefghijklmnopqr", 5)
gsap.registerPlugin(ScrollTrigger)

export default function Diagram({ svg = "", data = {} }) {
    const [id, setId] = useState(null)               // client-only ID
    const [circles, setCircles] = useState([])       // tooltip hotspots
    const [processedSvg, setProcessedSvg] = useState("")
    const [currentTooltip, setCurrentTooltip] = useState(null)
    const [scrollTooltip, setScrollTooltip] = useState(null)

    const containerRef = useRef(null)

    // merged tooltips
    const tooltipsJSON = { ...tooltipsCopy, ...data }

    // -- tooltip show helper ---------------------------------------------------
    const showTooltip = useCallback((tip) => {
        if (!tip) return
        hideAll()
        const el = document.querySelector("#" + tip)
        if (el && el._tippy) el._tippy.show()
    }, [])

    // -- find circles in SVG ---------------------------------------------------
    const addTooltips = useCallback(() => {
        if (!containerRef.current) return
        const ref = containerRef.current

        const nodes = [...ref.querySelectorAll("tspan")].filter(
            (n) => tooltipsJSON[n.innerHTML]
        )

        const list = []
        for (const node of nodes) {
            const g = node.closest("g")
            if (!g) continue
            const rect = g.getBoundingClientRect()
            const key = node.innerHTML

            list.push({
                key,
                tooltipText: tooltipsJSON[key],
                x: rect.x + window.scrollX,
                y: rect.y + window.scrollY,
                width: rect.width,
                height: rect.height,
            })
        }

        setCircles(list.sort((a, b) => a.key - b.key))
    }, [tooltipsJSON])

    // -- preprocess SVG --------------------------------------------------------
    useEffect(() => {
        if (!svg) return
        setProcessedSvg(svg.replaceAll("url(#Shadow)", ""))
    }, [svg])

    // -- assign client-only ID -------------------------------------------------
    useEffect(() => {
        setId(nanoid())     // runs only in browser → no hydration mismatch
    }, [])

    // if ID is not ready yet, don't render anything (avoids mismatch)
    if (!id) return null

    return (
        <div id={id} ref={containerRef} className="flex justify-center">

            {circles.map((circle, index) => {
                const circleId = `${id}-${index}`
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
                            height: `${circle.height}px`,
                        }}
                    />
                )
            })}

            <div dangerouslySetInnerHTML={{ __html: processedSvg }} />
        </div>
    )
}
