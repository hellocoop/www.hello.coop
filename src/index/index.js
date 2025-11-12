// home page specific scripts

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.addEventListener('load', () => {
    processFeed();
    gsap.registerPlugin(MotionPathPlugin);
    interchangeAnimation();
});

function interchangeAnimation() {
    const dictionary = {
        one: ["a"],
        two: ["b", "f", "n"],
        three: ["c", "j"],
        four: ["d", "i"],
        five: ["m", "k", "e"],
        six: ["n", "f"],
        seven: ["g", "l"],
    };

    const flashColors = {
        a: "#0EA5E9",
        b: "#F59E0B",
        c: "#10B981",
        d: "#D946EF",
        e: "#F54900",
        f: "#F0B000",
        g: "#894EFC",
        h: "#F59E0B",
        i: "#D946EF",
        j: "#10B981",
        k: "#F54900",
        l: "#894EFC",
        m: "#F54900",
        n: "#F0B000",
    };

    // ⚙️ Controls
    const VELOCITY = 250;              // px per second (speed along path)
    const FLOW_INTERVAL = [0.8, 1.5];  // seconds between spawn attempts
    const MAX_CONCURRENT = 3;          // max flows running at once
    const CONCURRENT_DELAY = [0.25, 0.5]; // delay between concurrent starts (s)

    // Track state
    const activeElements = new Set();
    let activeFlows = 0;

    // ───────────────────────────────
    // Utility helpers
    // ───────────────────────────────

    function randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function resetOpacities() {
        const all = [
            "one", "two", "three", "four", "five", "six", "seven",
            "a", "b", "c", "d", "e", "f", "g", "h",
            "i", "j", "k", "l", "m", "n",
        ];
        all.forEach(id => gsap.set(`#${id}`, { opacity: 0 }));
    }

    function isPathLeftToRight(pathSelector) {
        const path = document.querySelector(pathSelector);
        if (!path) return true;
        const length = path.getTotalLength();
        const start = path.getPointAtLength(0);
        const end = path.getPointAtLength(length);
        return end.x > start.x;
    }

    function getDurationForPath(pathSelector) {
        const path = document.querySelector(pathSelector);
        if (!path) return 2;
        const length = path.getTotalLength();
        return length / VELOCITY;
    }

    function pickAvailable(keys) {
        for (let i = 0; i < 20; i++) {
            const candidate = randomItem(keys);
            if (!activeElements.has(candidate)) {
                activeElements.add(candidate);
                return candidate;
            }
        }
        return randomItem(keys);
    }

    // ───────────────────────────────
    // Core flow animation
    // ───────────────────────────────

    function flowAnimation() {
        const firstKeys = Object.keys(dictionary);
        const first = pickAvailable(firstKeys);
        const secondOptions = dictionary[first];
        const second = pickAvailable(secondOptions);
        const third = `${second}-${Math.floor(Math.random() * 4) + 1}`;
        const flashColor = flashColors[second] || "#0EA5E9";

        const firstPath = `#${first}-path`;
        const secondPath = `#${second}-path`;
        const forward = isPathLeftToRight(secondPath);

        const firstDuration = getDurationForPath(firstPath);
        const secondDuration = getDurationForPath(secondPath);

        activeFlows++;

        const tl = gsap.timeline({
            defaults: { ease: "power1.out" },
            onComplete: () => {
                activeElements.delete(first);
                activeElements.delete(second);
                activeFlows--;
            },
        });

        // Step 1: top-level animation
        tl.fromTo(
            `#${first}`,
            { opacity: 0 },
            {
                duration: firstDuration,
                motionPath: {
                    path: firstPath,
                    align: firstPath,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: 0,
                    end: 1,
                },
                keyframes: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 0.05 * firstDuration },
                    { opacity: 1, duration: 0.85 * firstDuration },
                    { opacity: 0, duration: 0.1 * firstDuration },
                ],
            }
        );

        // Step 2: second-level animation
        tl.fromTo(
            `#${second}`,
            { opacity: 0 },
            {
                duration: secondDuration,
                motionPath: {
                    path: secondPath,
                    align: secondPath,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    start: forward ? 0 : 1,
                    end: forward ? 1 : 0,
                },
                keyframes: [
                    { opacity: 0, duration: 0 },
                    { opacity: 1, duration: 0.05 * secondDuration },
                    { opacity: 1, duration: 0.85 * secondDuration },
                    { opacity: 0, duration: 0.1 * secondDuration },
                ],
            }
        );

        // Step 3: single clean stroke flash
        tl.to(`#${third}`, {
            stroke: flashColor,
            opacity: 0.75,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            yoyoEase: "power1.inOut",
            ease: "power2.inOut",
            onStart: () => gsap.set(`#${third}`, { stroke: "currentColor", opacity: 0.35 }),
        });

        return tl;
    }

    // ───────────────────────────────
    // Loop controller
    // ───────────────────────────────

    function startFlowLoop() {
        function spawnFlow() {
            if (activeFlows < MAX_CONCURRENT) {
                flowAnimation();

                // add stagger delay before next concurrent flow
                const delayBetween = gsap.utils.random(CONCURRENT_DELAY[0], CONCURRENT_DELAY[1]);
                gsap.delayedCall(delayBetween, () => {
                    if (activeFlows < MAX_CONCURRENT) {
                        flowAnimation();
                    }
                });
            }

            // schedule next spawn attempt
            const nextDelay = gsap.utils.random(FLOW_INTERVAL[0], FLOW_INTERVAL[1]);
            gsap.delayedCall(nextDelay, spawnFlow);
        }

        resetOpacities();
        spawnFlow();
    }

    // 🚀 Start animation loop
    startFlowLoop();
}

async function processFeed() {
    const loadingPlaceholder = document.querySelector("#news-loading-placeholder")
    try {
        const res = await fetch("https://blog.hello.coop/feed")
        const txt = await res.text()
        const xml = new window.DOMParser().parseFromString(txt, "text/xml")
        const allPosts = xml.querySelectorAll("item")

        // Filter out posts with "Developer" category
        // const filteredPosts = Array.from(allPosts).filter(post => {
        //     const categories = post.querySelectorAll("category")
        //     for (let category of categories) {
        //         if (category.textContent === "Developer") {
        //             return false // Exclude this post
        //         }
        //     }
        //     return true // Include this post
        // })
        const filteredPosts = [...allPosts].slice(0, 3)

        // Remove the loading placeholder
        loadingPlaceholder.remove()

        const postsRef = document.querySelector("#posts")
        for (const post of filteredPosts) {
            const title = post.querySelector("title")?.textContent
            const rawDescription = post.querySelector("description")?.textContent
            const descriptionPlaceholder = document.createElement("div");
            descriptionPlaceholder.innerHTML = rawDescription
            const description = descriptionPlaceholder.textContent
            const url = post.querySelector("link")?.textContent
            const image = post.querySelector("content")?.getAttribute("url")
            //PST is UTC-8
            const date = dayjs(post.querySelector("pubDate")?.textContent).subtract(8, 'hours').format('ddd, DD MMM YYYY')
            const li = `
                <li>
                    <a href="${url}" target="_blank" class="no-global-hover flex flex-col md:flex-row items-center gap-5 md:gap-10 hover:bg-charcoal/10 dark:hover:bg-gray/10 rounded-md p-4 -m-4 transition-all">
                        <img src="${image}"
                            alt="${title}" class="w-full md:w-1/3 rounded-sm flex-shrink-0" />
                        <div>
                            <span class="text-base md:text-xl opacity-50">${date}</span>
                            <h3 class="text-xl md:text-3xl font-semibold my-3 md:my-4">${title}</h3>
                            <p class="text-base md:text-lg lg:text-2xl opacity-50 line-clamp-3">${description}</p>
                        </div>
                    </a>
                </li>
            `
            postsRef.insertAdjacentHTML("beforeend", li)
        }
    } catch (err) {
        console.error(err)
        loadingPlaceholder.textContent = "Oops! Failed to fetch latest feed from blog.hello.coop"
    }
}