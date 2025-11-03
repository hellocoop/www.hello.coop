import AOS from 'aos';
import { animate, createTimeline, svg } from 'animejs';
import 'aos/dist/aos.css';

window.onload = async () => {
    processFeed();
    handleDropdown();

    AOS.init({
        offset: 500, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: "ease", // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });

    orgsHaveControlAnimation();
}

function orgsHaveControlAnimation() {
    createTimeline({
        loop: true,
        loopDelay: 1000,
        easing: "easeInOutSine",
    })
    .set('#provisioned-user', {
        translateX: -75,
        translateY: 50,
    })
    .set('#provisioned-cursor', {
        translateX: -75,
        translateY: 50,
    })
    .set(['#provisioned-cursor', '#deprovisioned-cursor', '#provisioned-user-cloud', '#provisioned-user-app-1', '#provisioned-user-app-2', '#provisioned-user-app-3', '#provisioned-user-app-line-1', '#provisioned-user-app-line-2', '#provisioned-user-app-line-3', '#provisioned-user-cloud-line', '#deprovisioned-user-cloud-line', '#deprovisioned-user-app-line-1', '#deprovisioned-user-app-line-2', '#deprovisioned-user-app-line-3'], {
        opacity: 0,
    })
    .add('#provisioned-user', {
        translateX: -75,
        translateY: 50,
        opacity: 1,
        duration: 1000,
    })
    .add('#provisioned-cursor', {
        translateX: -75,
        translateY: 50,
        opacity: 1,
        duration: 500,
    })
    .add('#provisioned-user', {
        scale: 1.5,
        duration: 500,
        transformOrigin: "10px 10px",
    })
    .add('#provisioned-user', {
        translateX: 0,
        translateY: 0,
        duration: 1000,
    })
    .add('#provisioned-cursor', {
        translateX: 0,
        translateY: 0,
        duration: 1000,
    }, "<<")
    .add('#provisioned-user', {
        scale: 1,
        duration: 500,
        transformOrigin: "10px 10px",
    })
    .add('#provisioned-cursor', {
        opacity: 0,
        duration: 1000,
    })
    .add('#provisioned-user-cloud-line', {
        opacity: [0,1,0],
        translateX: 100,
        duration: 1500,
    }, "<<")
    .add('#provisioned-user-cloud', {
        opacity: 1,
        duration: 500,
    })
    .add('#provisioned-user-app-line-1', {
        opacity: [0,1,0],
        duration: 1500,
        translateX: 150,
        translateY: -85,
    })
    .add('#provisioned-user-app-line-2', {
        opacity: [0,1,0],
        duration: 1500,
        translateX: 150,
        translateY: 90,
    }, "<<")
    .add('#provisioned-user-app-line-3', {
        opacity: [0,1,0],
        duration: 1500,
        translateX: 75,
        translateY: 82.5,
    }, "<<")
    .add('#provisioned-user-app-1', {
        opacity: 1,
        duration: 500,
    })
    .add('#provisioned-user-app-2', {
        opacity: 1,
        duration: 500,
    }, "<<")
    .add('#provisioned-user-app-3', {
        opacity: 1,
        duration: 500,
    }, "<<")
    .add("#deprovisioned-cursor", {
        opacity: 1,
        duration: 1000,
        delay: 1000,
    })
    .add('#deprovisioned-user', {
        scale: 1.5,
        duration: 500,
        transformOrigin: "10px 10px",
    })
    .add("#deprovisioned-cursor", {
        translateX: 57,
        translateY: 50,
        duration: 1000,
    })
    .add("#deprovisioned-user", {
        translateX: 40,
        translateY: 35,
        duration: 1000,
    }, "<<")
    .add('#deprovisioned-user', {
        opacity: 0,
        duration: 500,
    })
    .add('#deprovisioned-cursor', {
        opacity: 0,
        duration: 500,
    })
    .add('#deprovisioned-user-cloud-line', {
        opacity: [0,1,0],
        duration: 1500,
        translateX: 100,
    })
    .add('#deprovisioned-user-cloud', {
        opacity: 0,
        duration: 500,
    })
    .add('#deprovisioned-user-app-line-1', {
        opacity: [0,1,0],
        translateY: -100,
        translateX: 85,
        duration: 1500,
    })
    .add('#deprovisioned-user-app-line-2', {
        opacity: [0,1,0],
        translateX: 200,
        duration: 1500,
    }, "<<")
    .add('#deprovisioned-user-app-line-3', {
        opacity: [0,1,0],
        translateY: 90,
        translateX: 150,
        duration: 1500,
    }, "<<")
    .add('#deprovisioned-user-app-1', {
        opacity: 0,
        duration: 500,
    })
    .add('#deprovisioned-user-app-2', {
        opacity: 0,
        duration: 500,
    }, "<<")
    .add('#deprovisioned-user-app-3', {
        opacity: 0,
        duration: 500,
    }, "<<")
}

async function processFeed() {
    console.log("Processing feed")
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
                            alt="${title}" class="w-full md:w-1/3 rounded-lg" />
                        <div>
                            <span class="text-base md:text-xl opacity-50">${date}</span>
                            <h3 class="text-xl md:text-3xl font-semibold my-3 md:my-4">${title}</h3>
                            <p class="text-lg md:text-2xl opacity-50 line-clamp-3">${description}</p>
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
    const mobileNavToggle = document.getElementById('movile-nav-toggle');
    const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');
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