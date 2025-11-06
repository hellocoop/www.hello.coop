import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.onload = async () => {
    processFeed();
    handleDropdown();

    gsap.registerPlugin(MotionPathPlugin);
    // -----------------------------
    // LINE PATH ANIMATIONS
    // -----------------------------
    const forwardIds = ["one", "two", "three", "four", "five", "six", "seven"];
    const reverseIds = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    // -----------------------------
    // USER ICONS SETUP
    // -----------------------------
    // no "user_1" — starts from "user" then "user_2" to "user_36"
    const userIds = ["user", ...Array.from({ length: 35 }, (_, i) => `user_${i + 2}`)];
    userIds.forEach(id => gsap.set(`#${id}`, { opacity: 0.5, scale: 1, filter: "none" }));

    // divide users into groups (4 per reverse line)
    const userGroups = reverseIds.map((_, i) => userIds.slice(i * 4, i * 4 + 4));

    // -----------------------------
    // FLICKER FUNCTION
    // -----------------------------
    function flickerUser(groupIndex) {
        const group = userGroups[groupIndex];
        if (!group || group.length === 0) return;

        const id = gsap.utils.random(group);
        const el = `#${id}`;

        gsap.killTweensOf(el); // prevent overlap

        const glowColors = [
            "rgba(255,255,255,0.9)",
            "rgba(173,216,255,0.9)",
            "rgba(255,248,200,0.9)",
            "rgba(180,255,210,0.9)"
        ];
        // const glowColor = gsap.utils.random(glowColors);

        // light-up pulse animation
        gsap.to(el, {
            opacity: 0.75,
            scale: 1.025,
            // filter: `drop-shadow(0 0 6px ${glowColor})`,
            duration: gsap.utils.random(0.15, 0.3),
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // smooth fade back to base state
                gsap.to(el, {
                    opacity: 0.5,
                    scale: 1,
                    filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
                    duration: gsap.utils.random(0.25, 0.5),
                    ease: "power1.out"
                });
            }
        });
    }

    // -----------------------------
    // MAIN ANIMATION FUNCTION
    // -----------------------------
    function animate(id, reverse = false, index = 0) {
        const path = `#${id}-path`;
        const dur = gsap.utils.random(1.5, 3);

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: gsap.utils.random(0.5, 4),
            delay: gsap.utils.random(0, 3),
            defaults: { ease: "power1.inOut" }
        });

        tl.fromTo(
            `#${id}`,
            { opacity: 0 },
            {
                duration: dur,
                motionPath: {
                    path,
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: [path, 90],
                    start: reverse ? 1 : 0,
                    end: reverse ? 0 : 1
                },
                keyframes: [
                    { opacity: gsap.utils.random(0.6, 1), duration: gsap.utils.random(0.1, 0.4), ease: "power1.in" },
                    { opacity: gsap.utils.random(0.8, 1), duration: gsap.utils.random(1, 2) },
                    { opacity: 0, duration: gsap.utils.random(0.1, 0.4), ease: "power1.out" }
                ],
                onComplete: () => {
                    if (reverse) flickerUser(index); // flicker when reverse line finishes
                }
            }
        );
    }

    // -----------------------------
    // RUN ANIMATIONS
    // -----------------------------
    forwardIds.forEach(id => animate(id, false));
    reverseIds.forEach((id, i) => animate(id, true, i));
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
                            alt="${title}" class="w-full md:w-1/3 rounded-sm" />
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