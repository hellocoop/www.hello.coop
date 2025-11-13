// home page specific scripts

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

window.addEventListener('load', () => {
    processFeed();
    gsap.registerPlugin(MotionPathPlugin);
    interchangeAnimation();
});

function interchangeAnimation() {
    // Set initial opacity to 0 for all numbered elements
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    
    // Set opacity to 0 and position at start of path for #one through #seven
    numbers.forEach(num => {
        const elementSelector = `#interchange-animation #${num}`;
        const pathSelector = `#interchange-animation #${num}-path`;
        gsap.set(elementSelector, { 
            opacity: 0,
        });
    });
    
    // Set opacity to 0 for #a-one through #k-seven
    letters.forEach(letter => {
        numbers.forEach(num => {
            gsap.set(`#interchange-animation #${letter}-${num}`, { opacity: 0 });
        });
    });
    
    // Show the SVG
    gsap.to("#interchange-animation svg", {
        opacity: 1,
        duration: 1,
        onComplete: () => {
            // Start the animation after SVG is visible
            animateOne();
        }
    });
}

function animateOne() {
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    
    // Color mapping for numbers
    const numberColors = {
        'one': '#0EA5E9',
        'two': '#F59E0B',
        'three': '#10B981',
        'four': '#D946EF',
        'five': '#F54900',
        'six': '#F0B000',
        'seven': '#894EFC'
    };
    
    // Track active animations to prevent duplicates
    const activeAnimations = {
        numbers: new Set(), // Track which numbers are currently animating
        letterNumbers: new Set() // Track which letter-number combinations are currently animating (e.g., "a-one")
    };
    
    // Start multiple concurrent animations with delays
    const delayBetweenSequences = 1.5; // seconds between starting each sequence
    const numConcurrentSequences = 5;
    
    // Start the first sequence immediately
    animateRandomSequence(0);
    
    // Start additional sequences with delays
    for (let i = 1; i < numConcurrentSequences; i++) {
        setTimeout(() => {
            animateRandomSequence(i);
        }, delayBetweenSequences * i * 1000);
    }
    
    function animateRandomSequence(sequenceId) {
        // Pick a number that's not currently animating
        let availableNumbers = numbers.filter(num => !activeAnimations.numbers.has(num));
        if (availableNumbers.length === 0) {
            // If all numbers are animating, wait a bit and try again
            setTimeout(() => animateRandomSequence(sequenceId), 200);
            return;
        }
        const randomNum = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        activeAnimations.numbers.add(randomNum);
        
        const numElementSelector = `#interchange-animation #${randomNum}`;
        const numPathSelector = `#interchange-animation #${randomNum}-path path`;
        
        // Get the color for this number
        const appColor = numberColors[randomNum];
        
        // Pick a letter-number combination that's not currently animating
        let availableLetterNumbers = [];
        for (const letter of letters) {
            const letterNumKey = `${letter}-${randomNum}`;
            if (!activeAnimations.letterNumbers.has(letterNumKey)) {
                availableLetterNumbers.push(letter);
            }
        }
        
        if (availableLetterNumbers.length === 0) {
            // If all letter-number combinations are animating, wait a bit and try again
            activeAnimations.numbers.delete(randomNum);
            setTimeout(() => animateRandomSequence(sequenceId), 200);
            return;
        }
        
        const randomLetter = availableLetterNumbers[Math.floor(Math.random() * availableLetterNumbers.length)];
        const letterNumKey = `${randomLetter}-${randomNum}`;
        activeAnimations.letterNumbers.add(letterNumKey);
        
        const letterElementSelector = `#interchange-animation #${letterNumKey}`;
        const letterPathSelector = `#interchange-animation #${randomLetter}-path path`;
        
        // Randomly pick an app number (1...4)
        const randomApp = Math.floor(Math.random() * 4) + 1;
        const appSelector = `#interchange-animation #${randomLetter}-app-${randomApp}`;
        
        // Get path elements to calculate lengths
        const numPathElement = document.querySelector(numPathSelector);
        const letterPathElement = document.querySelector(letterPathSelector);
        
        if (!numPathElement || !letterPathElement) {
            setTimeout(animateRandomSequence, 500);
            return;
        }
        
        // Calculate path lengths
        const numPathLength = numPathElement.getTotalLength();
        const letterPathLength = letterPathElement.getTotalLength();
        
        // Constant speed: pixels per second (adjust this value to change overall speed)
        const speed = 225; // pixels per second
        
        // Calculate durations based on path length
        const numDuration = numPathLength / speed;
        const letterDuration = letterPathLength / speed;
        
        // Source selector for flash animation (e.g., #source-one, #source-two)
        const sourceSelector = `#interchange-animation #source-${randomNum}`;
        
        // Cloud selector - always restore to currentColor and 0.25 opacity
        const cloudSelector = `#interchange-animation #cloud`;
        
        // Create timeline for this sequence
        const tl = gsap.timeline({
            onComplete: () => {
                // Remove from active animations when complete
                activeAnimations.numbers.delete(randomNum);
                activeAnimations.letterNumbers.delete(letterNumKey);
                
                // After completion, start a new random sequence for this concurrent stream
                setTimeout(() => {
                    animateRandomSequence(sequenceId);
                }, 500);
            }
        });
        
        // Source flash animation (e.g., #source-one) - starts at same time as number animation
        tl.call(() => {
            const sourceElement = document.querySelector(sourceSelector);
            if (sourceElement) {
                // Get child path elements (source groups contain paths)
                const pathElements = sourceElement.querySelectorAll('path');
                const originalOpacity = 0.25;
                
                const sourceTl = gsap.timeline();
                // Flash the group opacity and child path fills
                sourceTl.set(sourceSelector, {
                    opacity: 1,
                })
                .set(pathElements.length > 0 ? `${sourceSelector} path` : sourceSelector, {
                    fill: appColor,
                    attr: { fill: appColor },
                }, "<") // Start at same time as opacity
                .to({}, { duration: 0.25 })
                .set(sourceSelector, {
                    opacity: originalOpacity,
                })
                .set(pathElements.length > 0 ? `${sourceSelector} path` : sourceSelector, {
                    clearProps: 'fill', // Clear GSAP-set fill property
                }, "<") // Start at same time as opacity restore
                .call(() => {
                    // Always restore to currentColor by directly setting the attribute on all paths
                    if (pathElements.length > 0) {
                        pathElements.forEach(path => {
                            path.setAttribute('fill', 'currentColor');
                        });
                    } else {
                        sourceElement.setAttribute('fill', 'currentColor');
                    }
                });
            }
        }, 0) // Start at time 0, same time as number animation
        
        // Number animation (e.g., #two)
        // Fade in quickly at the same time path starts
        tl.to(numElementSelector, {
            opacity: 1,
            duration: 0.15,
        })
        .to(numElementSelector, {
            duration: numDuration,
            ease: "none", // Linear easing for constant velocity
            motionPath: {
                path: numPathSelector,
                align: numPathSelector,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1,
            },
        }, "<") // Start path animation at the same time as fade in
        // Fade out quickly just before path ends
        .to(numElementSelector, {
            opacity: 0,
            duration: 0.15,
        }, "-=0.15") // Start fade out 0.15s before path completes, so it ends when path ends
        
        // Cloud flash animation - happens when number animation ends
        .call(() => {
            const cloudElement = document.querySelector(cloudSelector);
            if (cloudElement) {
                const originalOpacity = 0.25;
                
                const cloudTl = gsap.timeline();
                // Flash opacity and transition color to appColor
                cloudTl.set(cloudSelector, {
                    opacity: 1,
                    stroke: appColor,
                })
                .to({}, { duration: 0.15 })
                // Flash opacity back and restore to currentColor
                .set(cloudSelector, {
                    opacity: originalOpacity,
                    clearProps: 'stroke', // Clear GSAP-set stroke property
                })
                .call(() => {
                    // Always restore to currentColor by directly setting the attribute
                    cloudElement.setAttribute('stroke', 'currentColor');
                });
            }
        })
        
        // Letter-number animation (e.g., #b-two) - reverse direction
        .set(letterElementSelector, {
            opacity: 0,
            motionPath: {
                path: letterPathSelector,
                align: letterPathSelector,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 1,
            }
        })
        // Fade in quickly at the same time path starts
        .to(letterElementSelector, {
            opacity: 1,
            duration: 0.15,
        })
        .to(letterElementSelector, {
            duration: letterDuration,
            ease: "none", // Linear easing for constant velocity
            motionPath: {
                path: letterPathSelector,
                align: letterPathSelector,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 1,
                end: 0,
            },
        }, "<") // Start path animation at the same time as fade in
        // Fade out quickly just before path ends
        .to(letterElementSelector, {
            opacity: 0,
            duration: 0.15,
        }, "-=0.15") // Start fade out 0.15s before path completes, so it ends when path ends
        
        // Flash app element for this letter when letter path ends
        .call(() => {
            // Flash the app element for this letter (e.g., #a-app, #b-app, #c-app)
            const letterAppKey = `${randomLetter}-app`;
            const letterAppSelector = `#interchange-animation #${letterAppKey}`;
            
            const letterAppElement = document.querySelector(letterAppSelector);
            if (letterAppElement) {
                const originalOpacity = 0.25;
                
                const letterAppTl = gsap.timeline();
                
                letterAppTl.set(letterAppSelector, {
                    opacity: 1,
                    stroke: appColor,
                })
                .to({}, { duration: 0.25 })
                .set(letterAppSelector, {
                    opacity: originalOpacity,
                    clearProps: 'stroke', // Clear GSAP-set stroke property
                })
                .call(() => {
                    // Always restore to currentColor by directly setting the attribute
                    letterAppElement.setAttribute('stroke', 'currentColor');
                });
            }
        })
        
        // App flash animation (e.g., #b-app-3) - use color matching the picked number
        .call(() => {
            const appElement = document.querySelector(appSelector);
            if (appElement) {
                const originalOpacity = 0.25;
                
                const appTl = gsap.timeline();
                appTl.set(appSelector, {
                    opacity: 1,
                    stroke: appColor,
                })
                .to({}, { duration: 0.25 })
                .set(appSelector, {
                    opacity: originalOpacity,
                    clearProps: 'stroke', // Clear GSAP-set stroke property
                })
                .call(() => {
                    // Always restore to currentColor by directly setting the attribute
                    appElement.setAttribute('stroke', 'currentColor');
                });
            }
        });
    }
    
    // Start the first animation sequence
    animateRandomSequence();
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