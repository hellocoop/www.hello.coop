import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.onload = async () => {
    processFeed();
    handleDropdown();

    gsap.registerPlugin(MotionPathPlugin);

    interchangeAnimation();
    lifecycleAnimation();
    offboardingAnimation();
}

function interchangeAnimation() {
    gsap.registerPlugin(MotionPathPlugin);

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
    const MAX_CONCURRENT = 2;          // max flows running at once
    const CONCURRENT_DELAY = [0.25, 0.6]; // delay between concurrent starts (s)

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

function lifecycleAnimation() {
    // Set initial states for green, blue, and yellow
    ["#hello-lifecycle #cursor-1", "#hello-lifecycle #cursor-2", "#hello-lifecycle #cursor-3"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
    gsap.set("#hello-lifecycle #green-1", { scale: 1, opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #green-2", { opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #green-3", { opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #blue-1", { scale: 1, opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #blue-2", { opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #blue-3", { opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #yellow-1", { scale: 1, opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #yellow-2", { opacity: 1, x: 0, y: 0 });
    gsap.set("#hello-lifecycle #yellow-3", { opacity: 1, x: 0, y: 0 });
    ["#hello-lifecycle #one", "#hello-lifecycle #two", "#hello-lifecycle #three"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
    ["#hello-lifecycle #a", "#hello-lifecycle #b", "#hello-lifecycle #c"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));

    const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        repeat: -1,
        repeatDelay: 0.25,
    });

    // 1. Cursor-1 fades in
    tl.addLabel("start")
        .to("#hello-lifecycle #cursor-1", {
            opacity: 1,
            duration: 0.4,
        }, "start")
        // 2. Scale green-1
        .to("#hello-lifecycle #green-1", {
            scale: 1.2,
            duration: 0.3,
            transformOrigin: "center center",
        }, ">+0.2")
        // 3. Move cursor and green-1 to 50 translate x and y
        .to(["#hello-lifecycle #cursor-1", "#hello-lifecycle #green-1"], {
            x: 50,
            y: 50,
            duration: 0.5,
        }, ">+0.1")
        // 4. Scale green-1 to 0 and fade out, start #one path animation at same time
        .addLabel("greenFadeOut")
        .to("#hello-lifecycle #green-1", {
            scale: 0,
            opacity: 0,
            duration: 0.25,
        }, "greenFadeOut")
        .set("#hello-lifecycle #one", { opacity: 1 }, "greenFadeOut")
        .to("#hello-lifecycle #one", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #one-path",
                align: "#hello-lifecycle #one-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, "greenFadeOut")
        .to("#hello-lifecycle #one", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #one-path",
                align: "#hello-lifecycle #one-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 5. Fade out cursor (almost immediately after green-1 starts fading)
        .to("#hello-lifecycle #cursor-1", {
            opacity: 0,
            duration: 0.25,
        }, "greenFadeOut+=0.1")
        // 6. At end of #one animation, fade out green-2
        .to("#hello-lifecycle #green-2", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // 7. When green-2 fades out, start #a animation on #a-b-c-path
        .set("#hello-lifecycle #a", { opacity: 1 }, ">-0.25")
        .to("#hello-lifecycle #a", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, ">-0.25")
        .to("#hello-lifecycle #a", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 8. Once #a animation is done, fade out green-3
        .to("#hello-lifecycle #green-3", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // BLUE SEQUENCE
        // 1. Cursor-2 fades in
        .to("#hello-lifecycle #cursor-2", {
            opacity: 1,
            duration: 0.4,
        }, ">+0.5")
        // 2. Scale blue-1
        .to("#hello-lifecycle #blue-1", {
            scale: 1.2,
            duration: 0.3,
            transformOrigin: "center center",
        }, ">+0.2")
        // 3. Move cursor and blue-1 to 50 translate x and y
        .to(["#hello-lifecycle #cursor-2", "#hello-lifecycle #blue-1"], {
            x: -30,
            y: 35,
            duration: 0.5,
        }, ">+0.1")
        // 4. Scale blue-1 to 0 and fade out, start #two path animation at same time
        .addLabel("blueFadeOut")
        .to("#hello-lifecycle #blue-1", {
            scale: 0,
            opacity: 0,
            duration: 0.25,
        }, "blueFadeOut")
        .set("#hello-lifecycle #two", { opacity: 1 }, "blueFadeOut")
        .to("#hello-lifecycle #two", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #two-path",
                align: "#hello-lifecycle #two-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, "blueFadeOut")
        .to("#hello-lifecycle #two", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #two-path",
                align: "#hello-lifecycle #two-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 5. Fade out cursor-2 (almost immediately after blue-1 starts fading)
        .to("#hello-lifecycle #cursor-2", {
            opacity: 0,
            duration: 0.25,
        }, "blueFadeOut+=0.1")
        // 6. At end of #two animation, fade out blue-2
        .to("#hello-lifecycle #blue-2", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // 7. When blue-2 fades out, start #b animation on #a-b-c-path
        .set("#hello-lifecycle #b", { opacity: 1 }, ">-0.25")
        .to("#hello-lifecycle #b", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, ">-0.25")
        .to("#hello-lifecycle #b", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 8. Once #b animation is done, fade out blue-3
        .to("#hello-lifecycle #blue-3", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // YELLOW SEQUENCE
        // 1. Cursor-3 fades in
        .to("#hello-lifecycle #cursor-3", {
            opacity: 1,
            duration: 0.4,
        }, ">+0.5")
        // 2. Scale yellow-1
        .to("#hello-lifecycle #yellow-1", {
            scale: 1.2,
            duration: 0.3,
            transformOrigin: "center center",
        }, ">+0.2")
        // 3. Move cursor and yellow-1 to 50 translate x and y
        .to(["#hello-lifecycle #cursor-3", "#hello-lifecycle #yellow-1"], {
            x: 65,
            y: -75,
            duration: 0.5,
        }, ">+0.1")
        // 4. Scale yellow-1 to 0 and fade out, start #three path animation at same time
        .addLabel("yellowFadeOut")
        .to("#hello-lifecycle #yellow-1", {
            scale: 0,
            opacity: 0,
            duration: 0.25,
        }, "yellowFadeOut")
        .set("#hello-lifecycle #three", { opacity: 1 }, "yellowFadeOut")
        .to("#hello-lifecycle #three", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #three-path",
                align: "#hello-lifecycle #three-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, "yellowFadeOut")
        .to("#hello-lifecycle #three", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #three-path",
                align: "#hello-lifecycle #three-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 5. Fade out cursor-3 (almost immediately after yellow-1 starts fading)
        .to("#hello-lifecycle #cursor-3", {
            opacity: 0,
            duration: 0.25,
        }, "yellowFadeOut+=0.1")
        // 6. At end of #three animation, fade out yellow-2
        .to("#hello-lifecycle #yellow-2", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // 7. When yellow-2 fades out, start #c animation on #a-b-c-path
        .set("#hello-lifecycle #c", { opacity: 1 }, ">-0.25")
        .to("#hello-lifecycle #c", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, ">-0.25")
        .to("#hello-lifecycle #c", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#hello-lifecycle #a-b-c-path",
                align: "#hello-lifecycle #a-b-c-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        // 8. Once #c animation is done, fade out yellow-3
        .to("#hello-lifecycle #yellow-3", {
            opacity: 0,
            duration: 0.25,
        }, ">")
        // Reset: Fade in all users at the same time (consistent with offboarding animation)
        .addLabel("reset")
        // Reset positions and states first
        .set([
            "#hello-lifecycle #cursor-1",
            "#hello-lifecycle #cursor-2",
            "#hello-lifecycle #cursor-3"
        ], {
            opacity: 0,
            x: 0,
            y: 0,
        }, "reset")
        .set([
            "#hello-lifecycle #green-1",
            "#hello-lifecycle #blue-1",
            "#hello-lifecycle #yellow-1"
        ], {
            scale: 1,
            opacity: 0,
            x: 0,
            y: 0,
        }, "reset")
        .set([
            "#hello-lifecycle #green-2",
            "#hello-lifecycle #green-3",
            "#hello-lifecycle #blue-2",
            "#hello-lifecycle #blue-3",
            "#hello-lifecycle #yellow-2",
            "#hello-lifecycle #yellow-3"
        ], {
            opacity: 0,
            x: 0,
            y: 0,
        }, "reset")
        // Fade in all users at the same time
        .to([
            "#hello-lifecycle #green-1",
            "#hello-lifecycle #green-2",
            "#hello-lifecycle #green-3",
            "#hello-lifecycle #blue-1",
            "#hello-lifecycle #blue-2",
            "#hello-lifecycle #blue-3",
            "#hello-lifecycle #yellow-1",
            "#hello-lifecycle #yellow-2",
            "#hello-lifecycle #yellow-3"
        ], {
            opacity: 1,
            duration: 0.3,
        }, "reset+=0.2")
}

function offboardingAnimation() {
    // Set initial states
    ["#github-offboarding #one", "#github-offboarding #a"].forEach(id => gsap.set(id, { opacity: 0, x: 0, y: 0 }));
    gsap.set("#github-offboarding #cursor", { opacity: 0, x: 0, y: 0 });
    gsap.set("#github-offboarding #deprovisioned-user-1", { scale: 1, opacity: 0, x: 0, y: 0 });
    gsap.set("#github-offboarding #deprovisioned-user-2", { opacity: 0, x: 0, y: 0 });
    gsap.set("#github-offboarding #deprovisioned-user-3", { opacity: 0, x: 0, y: 0 });

    const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        repeat: -1,
        repeatDelay: 0.25,
    });

    // 2. Start with users and cursor fade in, then selection and movement
    tl.addLabel("fadeInUsers")
        .to(["#github-offboarding #deprovisioned-user-3", "#github-offboarding #deprovisioned-user-2", "#github-offboarding #deprovisioned-user-1"], {
            opacity: 1,
            duration: 0.3,
        }, "fadeInUsers")
        // Cursor fades in (appears in place), after a short delay following users
        .to("#github-offboarding #cursor", {
            opacity: 1,
            duration: 0.4,
        }, "fadeInUsers+=0.5")
        // 3. Deprovisioned user 2 scales (to indicate it being selected by cursor)
        .to("#github-offboarding #deprovisioned-user-1", {
            scale: 1.2,
            duration: 0.3,
            transformOrigin: "center center",
        }, ">+0.2")
        // 4. Move both cursor and deprovisioned user 2 to translate x and y of 50
        .to(["#github-offboarding #cursor", "#github-offboarding #deprovisioned-user-1"], {
            x: 50,
            y: 50,
            duration: 0.5,
        }, ">+0.1")

        // 5. Scale and the deprovisioned user 2 to 0 and opacity to 0 as well at the same time
        // 6. Should start at same time of 5, start path animation #one
        .addLabel("fadeAndPath")
        .to("#github-offboarding #deprovisioned-user-1", {
            scale: 0,
            opacity: 0,
            duration: 0.25,
        }, "fadeAndPath")
        .to("#github-offboarding #cursor", {
            opacity: 0,
            duration: 0.25,
        }, "fadeAndPath")
        .set("#github-offboarding #one", { opacity: 1 }, "fadeAndPath")
        .to("#github-offboarding #one", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#github-offboarding #one-path",
                align: "#github-offboarding #one-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, "fadeAndPath")
        .to("#github-offboarding #one", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#github-offboarding #one-path",
                align: "#github-offboarding #one-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")
        .to("#github-offboarding #deprovisioned-user-2", {
            opacity: 0,
            duration: 0.25,
        })
        // 7. Start path animation #a
        .set("#github-offboarding #a", { opacity: 1 }, ">-0.25")
        .to("#github-offboarding #a", {
            duration: 0.35,
            ease: "none",
            motionPath: {
                path: "#github-offboarding #a-path",
                align: "#github-offboarding #a-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.7,
            },
        }, ">-0.25")
        .to("#github-offboarding #a", {
            duration: 0.15,
            ease: "power1.out",
            opacity: 0,
            motionPath: {
                path: "#github-offboarding #a-path",
                align: "#github-offboarding #a-path",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.7,
                end: 1,
            },
        }, ">")

        // 8. Wait for path animations to be done, then reduce opacity of deprovisioned user to 0
        // #one ends at fadeAndPath+=0.5, #a ends at fadeAndPath+=0.75 (starts at fadeAndPath+=0.25, duration 0.5)
        .to("#github-offboarding #deprovisioned-user-3", {
            opacity: 0,
            duration: 0.25,
        }, ">")

        // 9. Set deprovisioned user to translate x and y of 0
        .to("#github-offboarding #deprovisioned-user-3", {
            x: 0,
            y: 0,
            duration: 0,
        }, ">")
}

async function handleDropdown() {
    const mobileNavToggle = document.querySelector('#movile-nav-toggle');
    const mobileNavDropdown = document.querySelector('#mobile-nav-dropdown');
    mobileNavToggle.onclick = () => {
        mobileNavDropdown.classList.toggle('hidden');
        if (mobileNavDropdown.classList.contains('hidden')) {
            document.body.classList.remove('overflow-y-hidden');
        } else {
            document.body.classList.add('overflow-y-hidden');
        }
    }
    window.onresize = () => {
        if (window.innerWidth > 768) {
            document.body.classList.remove('overflow-y-hidden');
        }
    }
}