import { createTimeline, spring } from 'animejs';

window.onload = async () => {
    processFeed();
    handleDropdown();
    usersHaveLostControlAnimation();
    orgsHaveControlAnimation();
}

function usersHaveLostControlAnimation() {
    createTimeline({
        loop: true,
        loopDelay: 1000,
        easing: "easeInOutSine",
    })
}

function orgsHaveControlAnimation() {
    createTimeline({
        loop: true,
        loopDelay: 500,
        easing: "easeInOutSine",
    })
        .set('#provisioned-user', {
            translateX: -75,
            translateY: 50,
        })
        .set('#provisioned-cursor', {
            translateX: -75,
            translateY: 60,
        })
        .set(['#orgs-have-control', '#provisioned-user', '#provisioned-cursor', '#deprovisioned-cursor', '#provisioned-user-cloud', '#provisioned-user-app-1', '#provisioned-user-app-2', '#provisioned-user-app-3', '#provisioned-user-app-line-1', '#provisioned-user-app-line-2', '#provisioned-user-app-line-3', '#provisioned-user-cloud-line', '#deprovisioned-user-cloud-line', '#deprovisioned-user-app-line-1', '#deprovisioned-user-app-line-2', '#deprovisioned-user-app-line-3'], {
            opacity: 0,
        })
        .set(['#deprovisioned-user', '#deprovisioned-user-cloud', '#deprovisioned-user-app-1', '#deprovisioned-user-app-2', '#deprovisioned-user-app-3'], {
            opacity: 1,
        })
        .add('#orgs-have-control', {
            opacity: 1,
            duration: 500,
        })
        .add('#provisioned-user', {
            translateX: -75,
            translateY: 50,
            opacity: 1,
            duration: 250,
        })
        .add('#provisioned-cursor', {
            translateX: -75,
            translateY: 50,
            opacity: 1,
            duration: 250,
        })
        .add('#provisioned-user', {
            scale: 1.5,
            duration: 250,
            transformOrigin: "10px 10px",
            ease: spring({ bounce: .5 }),
        })
        .add('#provisioned-user', {
            translateX: 0,
            translateY: 0,
            duration: 500,
            ease: spring({ bounce: .15 }),
        }, "-=1500")
        .add('#provisioned-cursor', {
            translateX: 0,
            translateY: 0,
            duration: 500,
            ease: spring({ bounce: .15 }),
        }, "<<")
        .add('#provisioned-user', {
            scale: 1,
            duration: 250,
            transformOrigin: "10px 10px",
            ease: spring({ bounce: .5 }),
        }, "-=1000")
        .add('#provisioned-cursor', {
            opacity: 0,
            translateY: 10,
            duration: 250,
        }, "-=1500")
        .add('#provisioned-user-cloud-line', {
            opacity: [0, 1, 0],
            translateX: [0, 135],
            ease: 'easeInOutSine',
            duration: 750,
        }, "-=1750")
        .add('#provisioned-user-cloud', {
            opacity: 1,
            duration: 250,
        }, "-=1250")
        .add('#provisioned-user-app-line-1', {
            opacity: [0, 1, 0],
            duration: 750,
            translateX: 227,
            translateY: -120,
            ease: 'easeInOutSine',
        }, "-=1000")
        .add('#provisioned-user-app-line-2', {
            opacity: [0, 1, 0],
            duration: 750,
            translateX: 202,
            translateY: 114,
            ease: 'easeInOutSine',
        }, "<<")
        .add('#provisioned-user-app-line-3', {
            opacity: [0, 1, 0],
            duration: 750,
            translateX: 72,
            translateY: 134,
            ease: 'easeInOutSine',
        }, "<<")
        .add('#provisioned-user-app-1', {
            opacity: 1,
            duration: 250,
        }, "-=500")
        .add('#provisioned-user-app-2', {
            opacity: 1,
            duration: 250,
        }, "<<")
        .add('#provisioned-user-app-3', {
            opacity: 1,
            duration: 250,
        }, "<<")
        .add("#deprovisioned-cursor", {
            opacity: 1,
            duration: 250,
        })
        .add('#deprovisioned-user', {
            scale: 1.5,
            duration: 250,
            transformOrigin: "10px 10px",
            ease: spring({ bounce: .5 }),
        })
        .add("#deprovisioned-cursor", {
            translateX: 57,
            translateY: 50,
            duration: 500,
            ease: spring({ bounce: .15 }),
        }, "-=1500")
        .add("#deprovisioned-user", {
            translateX: 40,
            translateY: 35,
            duration: 500,
            ease: spring({ bounce: .15 }),
        }, "<<")
        .add('#deprovisioned-user', {
            opacity: 0,
            duration: 250,
        }, "-=750")
        .set('#deprovisioned-user', {
            translateX: 0,
            translateY: 0,
            scale: 1,
        })
        .add('#deprovisioned-cursor', {
            opacity: 0,
            duration: 250,
            translateY: 70,
        }, "-=1000")
        .add('#deprovisioned-user-cloud-line', {
            opacity: [0, 1, 0],
            duration: 750,
            translateX: [0, 135],
            ease: 'easeInOutSine',
        }, "-=1500")
        .add('#deprovisioned-user-cloud', {
            opacity: 0,
            duration: 250,
        }, "-=1000")
        .add('#deprovisioned-user-app-line-1', {
            opacity: [0, 1, 0],
            translateY: -156,
            translateX: 93,
            duration: 750,
            ease: 'easeInOutSine',
        }, "-=750")
        .add('#deprovisioned-user-app-line-2', {
            opacity: [0, 1, 0],
            translateX: 254,
            duration: 750,
        }, "<<")
        .add('#deprovisioned-user-app-line-3', {
            opacity: [0, 1, 0],
            translateY: 115,
            translateX: 202,
            duration: 750,
        }, "<<")
        .add('#deprovisioned-user-app-1', {
            opacity: 0,
            duration: 250,
        }, "-=250")
        .add('#deprovisioned-user-app-2', {
            opacity: 0,
            duration: 250,
        }, "<<")
        .add('#deprovisioned-user-app-3', {
            opacity: 0,
            duration: 250,
        }, "<<")
        .add('#orgs-have-control', {
            opacity: 0,
            duration: 250,
            delay: 500,
        })
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