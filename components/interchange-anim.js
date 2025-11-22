'use client';

import { useEffect } from "react";
import { gsap } from "gsap";

export default function InterchangeAnimation() {
    useEffect(() => {
        // TBD: React-ify this component instead of DOM manipulation
        interchangeAnimation();
    }, []);

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

    return (
        <div
            id="interchange-animation"
            className="card !flex !items-center !justify-center !p-0 md:!h-[650px] !border-none !mt-12"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                viewBox="0 0 1000 409"
                fill="none"
            >
                <g id="Group 1621">
                    <g id="Group 1609">
                        <g id="h">
                            <path
                                id="cloud"
                                opacity="0.25"
                                d="M406 207.03C406 217.432 410.764 227.408 419.245 234.763C427.726 242.118 439.228 246.25 451.221 246.25H564.275C573.096 246.258 581.641 243.582 588.422 238.688C595.202 233.794 599.788 226.992 601.381 219.467C602.973 211.942 601.472 204.171 597.137 197.508C592.803 190.844 585.91 185.711 577.66 183.002C579.525 178.402 579.87 173.441 578.655 168.681C577.441 163.92 574.716 159.549 570.788 156.061C566.86 152.572 561.885 150.106 556.426 148.94C550.968 147.775 545.242 147.956 539.895 149.464C536.437 137.96 527.952 128.075 516.237 121.902C504.522 115.729 490.496 113.753 477.13 116.392C463.764 119.031 452.108 126.079 444.629 136.043C437.15 146.006 434.436 158.103 437.062 169.771C428.024 172.359 420.156 177.352 414.579 184.042C409.003 190.731 406 198.775 406 207.03Z"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <g id="interchange" opacity="0.25">
                                <path
                                    id="Vector"
                                    d="M550.562 223.251V212.342H557.913V214.243H552.869V216.843H557.535V218.744H552.869V221.349H557.935V223.251H550.562Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_2"
                                    d="M546.386 215.867C546.312 215.608 546.207 215.379 546.072 215.18C545.937 214.977 545.772 214.807 545.577 214.668C545.385 214.526 545.165 214.418 544.916 214.343C544.671 214.269 544.399 214.232 544.101 214.232C543.544 214.232 543.054 214.37 542.631 214.647C542.212 214.924 541.885 215.327 541.651 215.856C541.417 216.382 541.299 217.025 541.299 217.784C541.299 218.544 541.415 219.191 541.646 219.723C541.876 220.256 542.203 220.663 542.626 220.943C543.048 221.22 543.547 221.359 544.123 221.359C544.645 221.359 545.09 221.266 545.46 221.082C545.832 220.893 546.116 220.629 546.312 220.288C546.511 219.947 546.61 219.544 546.61 219.079L547.079 219.148H544.266V217.412H548.831V218.786C548.831 219.745 548.629 220.569 548.224 221.257C547.819 221.943 547.262 222.472 546.551 222.845C545.841 223.214 545.028 223.399 544.112 223.399C543.089 223.399 542.191 223.173 541.417 222.722C540.642 222.268 540.039 221.623 539.605 220.789C539.176 219.951 538.961 218.956 538.961 217.806C538.961 216.922 539.089 216.133 539.344 215.441C539.604 214.745 539.966 214.155 540.431 213.672C540.896 213.189 541.438 212.822 542.056 212.57C542.674 212.317 543.343 212.191 544.064 212.191C544.682 212.191 545.257 212.282 545.79 212.463C546.322 212.641 546.795 212.893 547.207 213.219C547.622 213.546 547.961 213.935 548.224 214.386C548.487 214.833 548.656 215.327 548.73 215.867H546.386Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_3"
                                    d="M537.246 212.342V223.251H535.254L530.507 216.385H530.428V223.251H528.121V212.342H530.145L534.854 219.203H534.95V212.342H537.246Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_4"
                                    d="M518.782 223.251H516.311L520.077 212.342H523.049L526.809 223.251H524.338L521.605 214.835H521.52L518.782 223.251ZM518.628 218.963H524.466V220.763H518.628V218.963Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_5"
                                    d="M505.709 223.251V212.342H508.015V216.843H512.698V212.342H514.999V223.251H512.698V218.744H508.015V223.251H505.709Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_6"
                                    d="M504.055 216.16H501.722C501.68 215.858 501.593 215.59 501.461 215.355C501.33 215.118 501.161 214.915 500.955 214.748C500.749 214.581 500.511 214.453 500.241 214.365C499.975 214.276 499.686 214.232 499.373 214.232C498.809 214.232 498.317 214.372 497.898 214.652C497.479 214.929 497.154 215.334 496.923 215.867C496.692 216.396 496.577 217.039 496.577 217.795C496.577 218.573 496.692 219.226 496.923 219.755C497.157 220.284 497.484 220.684 497.903 220.954C498.322 221.224 498.807 221.359 499.357 221.359C499.666 221.359 499.952 221.318 500.215 221.236C500.481 221.154 500.717 221.036 500.923 220.879C501.129 220.719 501.3 220.526 501.435 220.299C501.573 220.071 501.669 219.812 501.722 219.521L504.055 219.532C503.995 220.032 503.844 220.515 503.603 220.98C503.365 221.442 503.043 221.856 502.638 222.222C502.237 222.584 501.758 222.871 501.2 223.085C500.646 223.294 500.02 223.399 499.32 223.399C498.347 223.399 497.477 223.179 496.71 222.738C495.946 222.298 495.343 221.661 494.899 220.826C494.458 219.991 494.238 218.981 494.238 217.795C494.238 216.605 494.462 215.593 494.909 214.759C495.357 213.924 495.964 213.289 496.731 212.852C497.498 212.412 498.361 212.191 499.32 212.191C499.952 212.191 500.538 212.28 501.078 212.458C501.621 212.635 502.102 212.895 502.521 213.235C502.94 213.573 503.281 213.987 503.544 214.477C503.81 214.967 503.981 215.528 504.055 216.16Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_7"
                                    d="M484.586 223.251V212.342H488.89C489.714 212.342 490.417 212.489 490.999 212.784C491.585 213.075 492.031 213.489 492.336 214.025C492.645 214.558 492.8 215.184 492.8 215.905C492.8 216.63 492.643 217.253 492.331 217.775C492.018 218.294 491.566 218.691 490.973 218.968C490.383 219.245 489.669 219.384 488.831 219.384H485.95V217.53H488.458C488.899 217.53 489.265 217.47 489.556 217.349C489.847 217.228 490.064 217.047 490.206 216.806C490.351 216.564 490.424 216.264 490.424 215.905C490.424 215.543 490.351 215.238 490.206 214.989C490.064 214.741 489.845 214.552 489.55 214.425C489.259 214.293 488.892 214.227 488.448 214.227H486.892V223.251H484.586ZM490.477 218.286L493.189 223.251H490.642L487.99 218.286H490.477Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_8"
                                    d="M475.402 223.251V212.342H482.753V214.243H477.709V216.843H482.375V218.744H477.709V221.349H482.775V223.251H475.402Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_9"
                                    d="M464.967 214.243V212.342H473.926V214.243H470.586V223.251H468.307V214.243H464.967Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_10"
                                    d="M463.476 212.342V223.251H461.484L456.738 216.385H456.658V223.251H454.352V212.342H456.376L461.085 219.203H461.18V212.342H463.476Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_11"
                                    d="M452.455 212.342V223.251H450.148V212.342H452.455Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_12"
                                    d="M544.614 205.707C542.242 205.707 540.191 205.203 538.461 204.196C536.74 203.178 535.412 201.763 534.475 199.951C533.539 198.128 533.07 196.016 533.07 193.614C533.07 191.191 533.539 189.073 534.475 187.261C535.412 185.439 536.74 184.024 538.461 183.016C540.191 181.998 542.242 181.489 544.614 181.489C546.986 181.489 549.032 181.998 550.753 183.016C552.483 184.024 553.817 185.439 554.754 187.261C555.69 189.073 556.158 191.191 556.158 193.614C556.158 196.016 555.69 198.128 554.754 199.951C553.817 201.763 552.483 203.178 550.753 204.196C549.032 205.203 546.986 205.707 544.614 205.707ZM544.645 200.668C545.724 200.668 546.625 200.363 547.348 199.752C548.07 199.131 548.615 198.286 548.982 197.217C549.358 196.148 549.547 194.932 549.547 193.568C549.547 192.204 549.358 190.987 548.982 189.918C548.615 188.849 548.07 188.004 547.348 187.384C546.625 186.763 545.724 186.452 544.645 186.452C543.556 186.452 542.639 186.763 541.896 187.384C541.163 188.004 540.609 188.849 540.232 189.918C539.865 190.987 539.682 192.204 539.682 193.568C539.682 194.932 539.865 196.148 540.232 197.217C540.609 198.286 541.163 199.131 541.896 199.752C542.639 200.363 543.556 200.668 544.645 200.668ZM552.051 173.977V177.504H537.178V173.977H552.051Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_13"
                                    d="M528.806 173.977V205.249H522.301V173.977H528.806Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_14"
                                    d="M517.091 173.977V205.249H510.586V173.977H517.091Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_15"
                                    d="M495.575 205.708C493.162 205.708 491.086 205.22 489.345 204.242C487.614 203.255 486.281 201.86 485.344 200.058C484.408 198.246 483.939 196.104 483.939 193.63C483.939 191.217 484.408 189.1 485.344 187.278C486.281 185.455 487.599 184.035 489.299 183.017C491.009 181.999 493.015 181.49 495.316 181.49C496.863 181.49 498.303 181.74 499.637 182.238C500.981 182.727 502.151 183.465 503.149 184.453C504.157 185.44 504.941 186.682 505.501 188.178C506.06 189.665 506.34 191.405 506.34 193.401V195.187H486.535V191.156H500.217C500.217 190.22 500.014 189.39 499.606 188.667C499.199 187.944 498.634 187.379 497.911 186.972C497.199 186.555 496.369 186.346 495.422 186.346C494.435 186.346 493.559 186.575 492.796 187.033C492.043 187.481 491.452 188.087 491.025 188.85C490.597 189.604 490.378 190.443 490.368 191.37V195.203C490.368 196.363 490.582 197.366 491.009 198.211C491.447 199.056 492.063 199.707 492.857 200.165C493.651 200.623 494.593 200.852 495.682 200.852C496.405 200.852 497.066 200.751 497.667 200.547C498.268 200.343 498.782 200.038 499.209 199.631C499.637 199.224 499.963 198.725 500.187 198.134L506.203 198.531C505.898 199.977 505.271 201.239 504.325 202.318C503.388 203.387 502.177 204.222 500.691 204.823C499.214 205.413 497.509 205.708 495.575 205.708Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_16"
                                    d="M452.926 205.249V173.977H459.538V186.88H472.96V173.977H479.556V205.249H472.96V192.331H459.538V205.249H452.926Z"
                                    fill="currentColor"
                                />
                            </g>
                        </g>
                        {/* <rect
                            id="Rectangle 3014"
                            opacity="0.25"
                            x="0.75"
                            y={2}
                            width="998.5"
                            height="404.5"
                            stroke="#FF0000"
                            strokeWidth="1.5"
                        /> */}
                        <path
                            id="source-four"
                            opacity="0.25"
                            d="M68.25 158.75C76.955 158.75 85.2738 159.168 92.9092 159.929C93.9271 160.03 94.9328 160.138 95.9258 160.252C98.4082 160.536 100.81 160.856 103.121 161.211C108.205 161.992 112.847 162.939 116.93 164.021C117.301 164.12 117.667 164.219 118.029 164.319C122.009 165.426 125.419 166.667 128.143 168.011C128.638 168.255 129.11 168.503 129.56 168.754C133.263 170.825 135.373 173.117 135.494 175.53C135.498 175.603 135.5 175.677 135.5 175.75C135.5 176.07 135.463 176.387 135.394 176.703C135.493 176.883 135.551 177.089 135.551 177.309V221.271L135.544 221.397C135.533 221.51 135.504 221.618 135.465 221.72C135.047 225.502 133.091 229.028 130.008 232.183C128.481 233.744 126.668 235.226 124.603 236.62C123.422 237.417 122.16 238.184 120.822 238.921C119.15 239.841 117.36 240.713 115.465 241.533C112.431 242.846 109.113 244.031 105.557 245.071C105.112 245.201 104.664 245.329 104.212 245.454C103.308 245.705 102.389 245.947 101.457 246.179C100.991 246.295 100.521 246.408 100.048 246.52C99.1018 246.742 98.1424 246.955 97.1699 247.158C96.6839 247.26 96.1945 247.358 95.7021 247.454C93.7317 247.84 91.7113 248.185 89.6465 248.487C89.1303 248.563 88.6114 248.636 88.0898 248.706C87.0463 248.846 85.9921 248.976 84.9277 249.095C81.7355 249.45 78.4528 249.705 75.0986 249.853C73.9807 249.902 72.8548 249.939 71.7217 249.964C70.5884 249.989 69.4479 250.001 68.3008 250.001V247.501C72.2589 247.501 76.1323 247.349 79.8916 247.059C81.5028 246.934 83.0931 246.784 84.6602 246.609C85.1826 246.551 85.7025 246.49 86.2197 246.427C94.493 245.41 102.083 243.708 108.64 241.479C109.049 241.339 109.455 241.198 109.856 241.055C111.463 240.481 113.003 239.875 114.473 239.239C116.677 238.285 118.713 237.268 120.564 236.196C122.416 235.125 124.084 233.999 125.553 232.829C126.532 232.05 127.422 231.25 128.22 230.435C131.305 227.278 132.946 223.933 133.046 220.523L133.051 220.193V180.308C125.167 187.482 99.1422 192.75 68.25 192.75V190.25C86.676 190.25 103.273 188.359 115.19 185.347C121.168 183.836 125.828 182.077 128.933 180.222C132.197 178.271 133 176.681 133 175.75C133 175.459 132.921 175.104 132.714 174.693C132.589 174.447 132.419 174.181 132.19 173.896C131.886 173.518 131.48 173.107 130.945 172.669C130.678 172.45 130.379 172.224 130.045 171.992C129.711 171.76 129.341 171.522 128.933 171.278C127.962 170.698 126.84 170.128 125.573 169.571C124.307 169.015 122.895 168.473 121.347 167.949C119.488 167.321 117.432 166.72 115.19 166.153C111.466 165.212 107.285 164.38 102.734 163.682C95.9075 162.633 88.2482 161.884 80.0498 161.514C78.9566 161.464 77.8538 161.422 76.7422 161.386C73.9634 161.296 71.129 161.25 68.25 161.25C65.371 161.25 62.5366 161.296 59.7578 161.386C58.6462 161.422 57.5434 161.464 56.4502 161.514C48.2518 161.884 40.5925 162.633 33.7656 163.682C29.2146 164.38 25.0336 165.212 21.3096 166.153C19.0681 166.72 17.0117 167.321 15.1533 167.949C13.6048 168.473 12.1934 169.015 10.9268 169.571C9.6599 170.128 8.53778 170.698 7.56738 171.278C7.3633 171.4 7.16865 171.521 6.9834 171.64C6.79822 171.759 6.62224 171.876 6.45508 171.992C6.12078 172.224 5.82181 172.45 5.55469 172.669C5.02028 173.107 4.614 173.518 4.30957 173.896C4.08123 174.181 3.91061 174.447 3.78613 174.693C3.57868 175.104 3.5 175.459 3.5 175.75C3.50011 176.681 4.3029 178.271 7.56738 180.222C10.6724 182.077 15.3322 183.836 21.3096 185.347C33.2267 188.359 49.824 190.25 68.25 190.25V192.75C37.4919 192.75 11.5568 187.53 3.55078 180.403V220.193L3.55566 220.523C3.65527 223.933 5.29628 227.278 8.38184 230.435C9.17939 231.25 10.0699 232.05 11.0488 232.829C12.5177 233.999 14.1851 235.125 16.0371 236.196C17.8888 237.268 19.9244 238.285 22.1289 239.239C23.5981 239.875 25.1386 240.481 26.7451 241.055C27.1466 241.198 27.5523 241.339 27.9619 241.479C34.5185 243.708 42.1085 245.41 50.3818 246.427C50.899 246.49 51.4189 246.551 51.9414 246.609C53.5084 246.784 55.0987 246.934 56.71 247.059C60.4693 247.349 64.3427 247.501 68.3008 247.501V250.001C67.1537 250.001 66.0132 249.989 64.8799 249.964C63.7467 249.939 62.6209 249.902 61.5029 249.853C58.1487 249.705 54.8661 249.45 51.6738 249.095C50.6095 248.976 49.5552 248.846 48.5117 248.706C47.9901 248.636 47.4712 248.563 46.9551 248.487C44.8903 248.185 42.8699 247.84 40.8994 247.454C40.407 247.358 39.9177 247.26 39.4316 247.158C38.4592 246.955 37.4998 246.742 36.5537 246.52C36.0806 246.408 35.6108 246.295 35.1445 246.179C34.2121 245.947 33.2936 245.705 32.3896 245.454C31.9377 245.329 31.4894 245.201 31.0449 245.071C27.4882 244.031 24.1705 242.846 21.1367 241.533C19.2415 240.713 17.4513 239.841 15.7793 238.921C14.4414 238.184 13.1791 237.417 11.999 236.62C9.93396 235.226 8.1203 233.744 6.59375 232.183C3.51029 229.028 1.5548 225.502 1.13672 221.72C1.08277 221.58 1.05085 221.429 1.05078 221.271V177.309C1.05078 177.146 1.08251 176.992 1.13867 176.85C1.04683 176.486 1.00002 176.119 1 175.75C1 175.677 1.00219 175.603 1.00586 175.53C1.12679 173.117 3.23653 170.825 6.94043 168.754C7.38954 168.503 7.86215 168.255 8.35742 168.011C11.0805 166.667 14.4906 165.426 18.4707 164.319C18.8325 164.219 19.1992 164.12 19.5703 164.021C23.653 162.939 28.2949 161.992 33.3789 161.211C35.6897 160.856 38.0918 160.536 40.5742 160.252C41.5672 160.138 42.5729 160.03 43.5908 159.929C51.2262 159.168 59.545 158.75 68.25 158.75Z"
                            fill="currentColor"
                        />
                        <g id="Frame" opacity="0.25" clipPath="url(#clip0_9648_2949)">
                            <path
                                id="Vector_17"
                                d="M60.5816 217.271C60.5816 221.743 57.0793 225.038 52.7811 225.038C48.4828 225.038 44.9805 221.743 44.9805 217.271C44.9805 212.768 48.4828 209.504 52.7811 209.504C57.0793 209.504 60.5816 212.768 60.5816 217.271ZM57.1669 217.271C57.1669 214.476 55.137 212.564 52.7811 212.564C50.4251 212.564 48.3952 214.476 48.3952 217.271C48.3952 220.037 50.4251 221.977 52.7811 221.977C55.137 221.977 57.1669 220.034 57.1669 217.271Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_18"
                                d="M77.4078 217.271C77.4078 221.743 73.9054 225.038 69.6072 225.038C65.309 225.038 61.8066 221.743 61.8066 217.271C61.8066 212.771 65.309 209.504 69.6072 209.504C73.9054 209.504 77.4078 212.768 77.4078 217.271ZM73.9931 217.271C73.9931 214.476 71.9632 212.564 69.6072 212.564C67.2513 212.564 65.2214 214.476 65.2214 217.271C65.2214 220.037 67.2513 221.977 69.6072 221.977C71.9632 221.977 73.9931 220.034 73.9931 217.271Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_19"
                                d="M93.5359 209.973V223.917C93.5359 229.653 90.1492 231.996 86.1455 231.996C82.3767 231.996 80.1084 229.478 79.253 227.419L82.2259 226.183C82.7553 227.447 84.0525 228.939 86.142 228.939C88.7048 228.939 90.293 227.359 90.293 224.386V223.269H90.1738C89.4095 224.211 87.937 225.034 86.0789 225.034C82.1909 225.034 78.6289 221.652 78.6289 217.299C78.6289 212.915 82.1909 209.504 86.0789 209.504C87.9335 209.504 89.406 210.327 90.1738 211.241H90.293V209.977H93.5359V209.973ZM90.5349 217.299C90.5349 214.564 88.7083 212.564 86.3839 212.564C84.028 212.564 82.0542 214.564 82.0542 217.299C82.0542 220.006 84.028 221.977 86.3839 221.977C88.7083 221.977 90.5349 220.006 90.5349 217.299Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_20"
                                d="M98.8833 201.799V224.56H95.5527V201.799H98.8833Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_21"
                                d="M111.861 219.829L114.512 221.594C113.656 222.858 111.595 225.036 108.033 225.036C103.615 225.036 100.316 221.625 100.316 217.269C100.316 212.65 103.643 209.502 107.651 209.502C111.686 209.502 113.66 212.71 114.305 214.443L114.659 215.325L104.264 219.626C105.06 221.184 106.297 221.979 108.033 221.979C109.772 221.979 110.978 221.124 111.861 219.829ZM103.703 217.034L110.652 214.152C110.27 213.182 109.12 212.506 107.766 212.506C106.031 212.506 103.615 214.037 103.703 217.034Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_22"
                                d="M32.373 215.25V211.955H43.4902C43.5988 212.529 43.6549 213.209 43.6549 213.944C43.6549 216.416 42.9783 219.473 40.7976 221.652C38.6766 223.858 35.9665 225.034 32.3765 225.034C25.7223 225.034 20.127 219.62 20.127 212.974C20.127 206.328 25.7223 200.914 32.3765 200.914C36.0577 200.914 38.6801 202.357 40.6504 204.237L38.3225 206.562C36.9096 205.239 34.9954 204.209 32.373 204.209C27.5138 204.209 23.7135 208.121 23.7135 212.974C23.7135 217.828 27.5138 221.739 32.373 221.739C35.5248 221.739 37.3198 220.475 38.4697 219.326C39.4023 218.395 40.0158 217.064 40.2577 215.247L32.373 215.25Z"
                                fill="currentColor"
                            />
                        </g>
                        <path
                            id="source-two"
                            opacity="0.25"
                            d="M87.25 53.6504C95.955 53.6504 104.274 54.0679 111.909 54.8291C112.927 54.9306 113.933 55.0389 114.926 55.1523C117.408 55.4361 119.81 55.7564 122.121 56.1113C127.205 56.8922 131.847 57.8394 135.93 58.9219C136.301 59.0203 136.667 59.1191 137.029 59.2197C141.009 60.3267 144.419 61.5672 147.143 62.9111C147.638 63.1555 148.11 63.4032 148.56 63.6543C152.263 65.7252 154.373 68.0174 154.494 70.4307C154.498 70.5038 154.5 70.577 154.5 70.6504C154.5 70.9704 154.463 71.2879 154.394 71.6035C154.493 71.783 154.551 71.9892 154.551 72.209V116.171L154.544 116.298C154.533 116.411 154.504 116.518 154.465 116.62C154.047 120.402 152.091 123.929 149.008 127.083C147.481 128.645 145.668 130.127 143.603 131.521C142.422 132.317 141.16 133.085 139.822 133.821C138.15 134.742 136.36 135.614 134.465 136.434C131.431 137.746 128.113 138.932 124.557 139.972C124.112 140.102 123.664 140.229 123.212 140.354C122.308 140.605 121.389 140.847 120.457 141.079C119.991 141.195 119.521 141.309 119.048 141.42C118.102 141.642 117.142 141.856 116.17 142.059C115.684 142.16 115.195 142.258 114.702 142.354C112.732 142.74 110.711 143.085 108.646 143.388C108.13 143.463 107.611 143.536 107.09 143.606C106.046 143.747 104.992 143.877 103.928 143.995C100.735 144.35 97.4528 144.606 94.0986 144.753C92.9807 144.802 91.8548 144.839 90.7217 144.864C89.5884 144.889 88.4479 144.901 87.3008 144.901V142.401C91.2589 142.401 95.1323 142.25 98.8916 141.959C100.503 141.834 102.093 141.684 103.66 141.51C104.183 141.452 104.703 141.391 105.22 141.327C113.493 140.31 121.083 138.608 127.64 136.379C128.049 136.24 128.455 136.098 128.856 135.955C130.463 135.382 132.003 134.775 133.473 134.14C135.677 133.186 137.713 132.168 139.564 131.097C141.416 130.025 143.084 128.899 144.553 127.729C145.532 126.95 146.422 126.151 147.22 125.335C150.305 122.179 151.946 118.834 152.046 115.424L152.051 115.094V75.208C144.167 82.3823 118.142 87.6504 87.25 87.6504V85.1504C105.676 85.1504 122.273 83.2596 134.19 80.2471C140.168 78.736 144.828 76.9778 147.933 75.1221C151.197 73.171 152 71.5817 152 70.6504C152 70.3594 151.921 70.0042 151.714 69.5938C151.589 69.3474 151.419 69.081 151.19 68.7969C150.886 68.4181 150.48 68.0072 149.945 67.5693C149.678 67.3504 149.379 67.1245 149.045 66.8926C148.711 66.6606 148.341 66.4226 147.933 66.1787C146.962 65.5988 145.84 65.028 144.573 64.4717C143.307 63.9153 141.895 63.3732 140.347 62.8496C138.488 62.2213 136.432 61.6203 134.19 61.0537C130.466 60.1123 126.285 59.2809 121.734 58.582C114.908 57.5338 107.248 56.7845 99.0498 56.4141C97.9566 56.3647 96.8538 56.3219 95.7422 56.2861C92.9634 56.1968 90.129 56.1504 87.25 56.1504C84.371 56.1504 81.5366 56.1968 78.7578 56.2861C77.6462 56.3219 76.5434 56.3647 75.4502 56.4141C67.2518 56.7845 59.5925 57.5338 52.7656 58.582C48.2146 59.2809 44.0336 60.1123 40.3096 61.0537C38.0681 61.6203 36.0117 62.2213 34.1533 62.8496C32.6048 63.3732 31.1934 63.9153 29.9268 64.4717C28.6599 65.028 27.5378 65.5988 26.5674 66.1787C26.3633 66.3007 26.1686 66.421 25.9834 66.54C25.7982 66.6591 25.6222 66.7766 25.4551 66.8926C25.1208 67.1245 24.8218 67.3504 24.5547 67.5693C24.0203 68.0072 23.614 68.4181 23.3096 68.7969C23.0812 69.081 22.9106 69.3474 22.7861 69.5938C22.5787 70.0042 22.5 70.3594 22.5 70.6504C22.5001 71.5817 23.3029 73.171 26.5674 75.1221C29.6724 76.9778 34.3322 78.736 40.3096 80.2471C52.2267 83.2596 68.824 85.1504 87.25 85.1504V87.6504C56.4919 87.6504 30.5568 82.4303 22.5508 75.3037V115.094L22.5557 115.424C22.6553 118.834 24.2963 122.179 27.3818 125.335C28.1794 126.151 29.0699 126.95 30.0488 127.729C31.5177 128.899 33.1851 130.025 35.0371 131.097C36.8888 132.168 38.9244 133.186 41.1289 134.14C42.5981 134.775 44.1386 135.382 45.7451 135.955C46.1466 136.098 46.5523 136.24 46.9619 136.379C53.5185 138.608 61.1085 140.31 69.3818 141.327C69.899 141.391 70.4189 141.452 70.9414 141.51C72.5084 141.684 74.0987 141.834 75.71 141.959C79.4693 142.25 83.3427 142.401 87.3008 142.401V144.901C86.1537 144.901 85.0132 144.889 83.8799 144.864C82.7467 144.839 81.6209 144.802 80.5029 144.753C77.1487 144.606 73.8661 144.35 70.6738 143.995C69.6095 143.877 68.5552 143.747 67.5117 143.606C66.9901 143.536 66.4712 143.463 65.9551 143.388C63.8903 143.085 61.8699 142.74 59.8994 142.354C59.407 142.258 58.9177 142.16 58.4316 142.059C57.4592 141.856 56.4998 141.642 55.5537 141.42C55.0806 141.309 54.6108 141.195 54.1445 141.079C53.2121 140.847 52.2936 140.605 51.3896 140.354C50.9377 140.229 50.4894 140.102 50.0449 139.972C46.4882 138.932 43.1705 137.746 40.1367 136.434C38.2415 135.614 36.4513 134.742 34.7793 133.821C33.4414 133.085 32.1791 132.317 30.999 131.521C28.934 130.127 27.1203 128.645 25.5938 127.083C22.5103 123.929 20.5548 120.402 20.1367 116.62C20.0828 116.481 20.0509 116.33 20.0508 116.171V72.209C20.0508 72.0469 20.0825 71.8921 20.1387 71.75C20.0468 71.3864 20 71.0198 20 70.6504C20 70.577 20.0022 70.5038 20.0059 70.4307C20.1268 68.0174 22.2365 65.7252 25.9404 63.6543C26.3895 63.4032 26.8622 63.1555 27.3574 62.9111C30.0805 61.5672 33.4906 60.3267 37.4707 59.2197C37.8325 59.1191 38.1992 59.0203 38.5703 58.9219C42.653 57.8394 47.2949 56.8922 52.3789 56.1113C54.6897 55.7564 57.0918 55.4361 59.5742 55.1523C60.5672 55.0389 61.5729 54.9306 62.5908 54.8291C70.2262 54.0679 78.545 53.6504 87.25 53.6504Z"
                            fill="currentColor"
                        />
                        <g id="Group 1559" opacity="0.25">
                            <g id="Frame_2" clipPath="url(#clip1_9648_2949)">
                                <path
                                    id="Vector_23"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M49.5 94.6504C41.4887 94.6504 35 101.139 35 109.15C35 115.567 39.1506 120.986 44.9144 122.907C45.6394 123.034 45.9113 122.599 45.9113 122.219C45.9113 121.874 45.8931 120.732 45.8931 119.518C42.25 120.189 41.3075 118.63 41.0175 117.814C40.8544 117.397 40.1475 116.11 39.5312 115.766C39.0237 115.494 38.2987 114.824 39.5131 114.805C40.655 114.787 41.4706 115.857 41.7425 116.292C43.0475 118.485 45.1319 117.869 45.9656 117.488C46.0925 116.545 46.4731 115.911 46.89 115.549C43.6637 115.186 40.2925 113.935 40.2925 108.389C40.2925 106.812 40.8544 105.507 41.7787 104.492C41.6337 104.13 41.1262 102.644 41.9237 100.65C41.9237 100.65 43.1381 100.269 45.9113 102.136C47.0712 101.81 48.3038 101.647 49.5363 101.647C50.7688 101.647 52.0013 101.81 53.1613 102.136C55.9344 100.251 57.1488 100.65 57.1488 100.65C57.9463 102.644 57.4388 104.13 57.2938 104.492C58.2181 105.507 58.78 106.794 58.78 108.389C58.78 113.954 55.3906 115.186 52.1644 115.549C52.69 116.002 53.1431 116.872 53.1431 118.231C53.1431 120.17 53.125 121.729 53.125 122.219C53.125 122.599 53.3969 123.052 54.1219 122.907C59.8494 120.986 64 115.549 64 109.15C64 101.139 57.5112 94.6504 49.5 94.6504Z"
                                    fill="currentColor"
                                />
                            </g>
                            <g id="Group 1557">
                                <path
                                    id="Vector_24"
                                    d="M76.9189 108.943C76.7807 108.943 76.6424 109.082 76.6424 109.22V112.054C76.6424 112.192 76.7807 112.33 76.9189 112.33H79.1998V115.855C79.1998 115.855 78.7159 116.062 77.2645 116.062C75.6057 116.062 73.3249 115.44 73.3249 110.326C73.3249 105.211 75.7439 104.589 78.0248 104.589C80.0292 104.589 80.8586 104.935 81.4115 105.073C81.5497 105.142 81.7571 104.935 81.7571 104.796L82.3791 102.032C82.3791 101.963 82.3791 101.893 82.2409 101.824C82.0335 101.686 80.7203 100.926 77.3336 100.926C73.394 100.926 69.5234 102.515 69.5234 110.533C69.5234 118.481 74.0851 119.656 77.8865 119.656C81.0659 119.656 83.0012 118.343 83.0012 118.343C83.0703 118.274 83.0703 118.205 83.0703 118.136V109.22C83.0703 109.082 82.9321 108.943 82.7938 108.943"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_25"
                                    d="M112.651 101.894C112.651 101.755 112.513 101.617 112.375 101.617H109.126C108.988 101.617 108.85 101.755 108.85 101.894V108.183H103.735V101.894C103.735 101.755 103.597 101.617 103.459 101.617H100.21C100.072 101.617 99.9336 101.755 99.9336 101.894V118.965C99.9336 119.104 100.072 119.242 100.21 119.242H103.459C103.597 119.242 103.735 119.104 103.735 118.965V111.639H108.85V118.965C108.85 119.104 108.988 119.242 109.126 119.242H112.375C112.513 119.242 112.651 119.104 112.651 118.965V101.894Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_26"
                                    d="M86.8028 106.318C87.9861 106.318 88.9454 105.359 88.9454 104.176C88.9454 102.992 87.9861 102.033 86.8028 102.033C85.6194 102.033 84.6602 102.992 84.6602 104.176C84.6602 105.359 85.6194 106.318 86.8028 106.318Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_27"
                                    d="M88.6686 107.489C88.6686 107.351 88.5304 107.213 88.3921 107.213H85.1437C85.0054 107.213 84.8672 107.351 84.8672 107.489V118.824C84.8672 119.17 85.0745 119.239 85.351 119.239H88.323C88.6686 119.239 88.7377 119.101 88.7377 118.824"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_28"
                                    d="M121.844 107.283C121.706 107.283 121.568 107.421 121.568 107.56V115.923C121.568 115.923 120.738 116.545 119.563 116.545C118.388 116.545 118.112 115.992 118.112 114.886V107.56C118.112 107.421 117.974 107.283 117.835 107.283H114.587C114.449 107.283 114.311 107.421 114.311 107.56V115.439C114.311 118.826 116.177 119.655 118.803 119.655C120.946 119.655 122.674 118.48 122.674 118.48C122.674 118.48 122.743 119.102 122.812 119.171C122.881 119.24 122.95 119.309 123.019 119.309H125.093C125.231 119.309 125.369 119.171 125.369 119.033V107.56C125.369 107.421 125.231 107.283 125.093 107.283"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_29"
                                    d="M132.765 116.615C131.383 116.615 130.761 115.993 130.761 115.993V110.533C130.761 110.533 131.521 110.049 132.42 109.98C133.595 109.842 134.7 110.257 134.7 113.021C134.7 115.993 134.355 116.615 132.696 116.615H132.765ZM130.899 107.699V101.894C130.899 101.755 130.761 101.617 130.623 101.617H127.374C127.236 101.617 127.098 101.755 127.098 101.894V118.965C127.098 119.104 127.236 119.242 127.374 119.242H129.655C129.724 119.242 129.862 119.173 129.862 119.104C129.931 119.035 130.001 118.343 130.001 118.343C130.001 118.343 131.314 119.657 133.871 119.657C136.843 119.657 138.571 118.136 138.571 112.883C138.571 107.63 135.875 106.939 134.009 106.939C132.143 106.939 130.899 107.769 130.899 107.769V107.699Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_30"
                                    d="M95.6495 107.214V103.965C95.6495 103.827 95.5804 103.758 95.4422 103.758H92.0555C91.9172 103.758 91.8481 103.827 91.8481 104.034V107.421C91.8481 107.421 90.1893 107.836 90.0511 107.836C89.9129 107.905 89.8438 107.974 89.8438 108.112V110.255C89.8438 110.393 89.982 110.531 90.1202 110.531H91.8481V115.577C91.8481 119.378 94.4746 119.724 96.2716 119.724C97.101 119.724 98.0686 119.447 98.2069 119.378C98.276 119.309 98.3451 119.24 98.3451 119.102V116.821C98.3451 116.683 98.2069 116.544 98.0686 116.544C97.9304 116.544 97.5848 116.614 97.1701 116.614C95.9951 116.614 95.5804 116.061 95.5804 115.3C95.5804 114.54 95.5804 110.531 95.5804 110.531H97.9995C98.1377 110.531 98.276 110.393 98.276 110.255V107.49C98.276 107.352 98.1377 107.214 97.9995 107.214"
                                    fill="currentColor"
                                />
                            </g>
                        </g>
                        <path
                            id="source-six"
                            opacity="0.25"
                            d="M85.25 263.65C93.955 263.65 102.274 264.068 109.909 264.829C110.927 264.931 111.933 265.039 112.926 265.152C115.408 265.436 117.81 265.756 120.121 266.111C125.205 266.892 129.847 267.839 133.93 268.922C134.301 269.02 134.667 269.119 135.029 269.22C139.009 270.327 142.419 271.567 145.143 272.911C145.638 273.156 146.11 273.403 146.56 273.654C150.263 275.725 152.373 278.017 152.494 280.431C152.498 280.504 152.5 280.577 152.5 280.65C152.5 280.97 152.462 281.287 152.394 281.603C152.493 281.782 152.551 281.989 152.551 282.209V326.171L152.544 326.298C152.533 326.411 152.504 326.518 152.465 326.62C152.047 330.402 150.091 333.929 147.008 337.083C145.481 338.645 143.668 340.127 141.603 341.521C140.422 342.317 139.16 343.085 137.822 343.821C136.15 344.742 134.36 345.614 132.465 346.434C129.431 347.746 126.113 348.932 122.557 349.972C122.112 350.102 121.664 350.229 121.212 350.354C120.308 350.605 119.389 350.847 118.457 351.079C117.991 351.195 117.521 351.309 117.048 351.42C116.102 351.642 115.142 351.856 114.17 352.059C113.684 352.16 113.195 352.258 112.702 352.354C110.732 352.74 108.711 353.085 106.646 353.388C106.13 353.463 105.611 353.536 105.09 353.606C104.046 353.747 102.992 353.877 101.928 353.995C96.6074 354.587 91.0359 354.901 85.3008 354.901V352.401C89.2589 352.401 93.1323 352.25 96.8916 351.959C98.5028 351.834 100.093 351.684 101.66 351.51C102.183 351.452 102.703 351.391 103.22 351.327C111.493 350.31 119.083 348.608 125.64 346.379C126.049 346.24 126.455 346.098 126.856 345.955C128.463 345.382 130.003 344.775 131.473 344.14C133.677 343.186 135.713 342.168 137.564 341.097C139.416 340.025 141.084 338.899 142.553 337.729C143.532 336.95 144.422 336.151 145.22 335.335C148.305 332.179 149.946 328.834 150.046 325.424L150.051 325.094V285.208C142.167 292.382 116.142 297.65 85.25 297.65V295.15C103.676 295.15 120.273 293.26 132.19 290.247C138.168 288.736 142.828 286.978 145.933 285.122C149.197 283.171 150 281.582 150 280.65C150 280.359 149.921 280.004 149.714 279.594C149.589 279.347 149.419 279.081 149.19 278.797C148.886 278.418 148.48 278.007 147.945 277.569C147.678 277.35 147.379 277.125 147.045 276.893C146.711 276.661 146.341 276.423 145.933 276.179C144.962 275.599 143.84 275.028 142.573 274.472C141.307 273.915 139.895 273.373 138.347 272.85C136.488 272.221 134.432 271.62 132.19 271.054C128.466 270.112 124.285 269.281 119.734 268.582C112.908 267.534 105.248 266.785 97.0498 266.414C95.9566 266.365 94.8538 266.322 93.7422 266.286C90.9634 266.197 88.129 266.15 85.25 266.15C82.371 266.15 79.5366 266.197 76.7578 266.286C75.6462 266.322 74.5434 266.365 73.4502 266.414C65.2518 266.785 57.5925 267.534 50.7656 268.582C46.2146 269.281 42.0336 270.112 38.3096 271.054C36.0681 271.62 34.0117 272.221 32.1533 272.85C30.6048 273.373 29.1934 273.915 27.9268 274.472C26.6599 275.028 25.5378 275.599 24.5674 276.179C24.3633 276.301 24.1686 276.421 23.9834 276.54C23.7982 276.659 23.6222 276.777 23.4551 276.893C23.1208 277.125 22.8218 277.35 22.5547 277.569C22.0203 278.007 21.614 278.418 21.3096 278.797C21.0812 279.081 20.9106 279.347 20.7861 279.594C20.5787 280.004 20.5 280.359 20.5 280.65C20.5002 281.582 21.3031 283.171 24.5674 285.122C27.6724 286.978 32.3323 288.736 38.3096 290.247C50.2267 293.26 66.824 295.15 85.25 295.15V297.65C54.4921 297.65 28.5569 292.43 20.5508 285.304V325.094L20.5557 325.424C20.6553 328.834 22.2963 332.179 25.3818 335.335C26.1794 336.151 27.0699 336.95 28.0488 337.729C29.5177 338.899 31.1852 340.025 33.0371 341.097C34.8888 342.168 36.9245 343.186 39.1289 344.14C40.5981 344.775 42.1386 345.382 43.7451 345.955C44.1466 346.098 44.5523 346.24 44.9619 346.379C51.5185 348.608 59.1085 350.31 67.3818 351.327C67.899 351.391 68.4189 351.452 68.9414 351.51C70.5084 351.684 72.0987 351.834 73.71 351.959C77.4693 352.25 81.3427 352.401 85.3008 352.401V354.901C79.5656 354.901 73.9942 354.587 68.6738 353.995C67.6095 353.877 66.5552 353.747 65.5117 353.606C64.9901 353.536 64.4712 353.463 63.9551 353.388C61.8903 353.085 59.8699 352.74 57.8994 352.354C57.407 352.258 56.9177 352.16 56.4316 352.059C55.4592 351.856 54.4998 351.642 53.5537 351.42C53.0806 351.309 52.6108 351.195 52.1445 351.079C51.2121 350.847 50.2936 350.605 49.3896 350.354C48.9377 350.229 48.4894 350.102 48.0449 349.972C44.4882 348.932 41.1705 347.746 38.1367 346.434C36.2415 345.614 34.4513 344.742 32.7793 343.821C31.4414 343.085 30.1791 342.317 28.999 341.521C26.934 340.127 25.1203 338.645 23.5938 337.083C20.5103 333.929 18.5548 330.402 18.1367 326.62C18.0828 326.481 18.0509 326.329 18.0508 326.171V282.209C18.0508 282.047 18.0826 281.892 18.1387 281.75C18.0468 281.386 18 281.02 18 280.65C18 280.577 18.0022 280.504 18.0059 280.431C18.1268 278.017 20.2365 275.725 23.9404 273.654C24.3895 273.403 24.8622 273.156 25.3574 272.911C28.0805 271.567 31.4906 270.327 35.4707 269.22C35.8325 269.119 36.1992 269.02 36.5703 268.922C40.653 267.839 45.2949 266.892 50.3789 266.111C52.6897 265.756 55.0918 265.436 57.5742 265.152C58.5672 265.039 59.5729 264.931 60.5908 264.829C68.2262 264.068 76.545 263.65 85.25 263.65Z"
                            fill="currentColor"
                        />
                        <g id="Group 1561" opacity="0.25">
                            <path
                                id="Vector_31"
                                d="M80.8051 307.541V319.558H78.6831V310.128H78.6548L74.8634 319.558H73.4487L69.5724 310.128H69.5441V319.558H67.5918V307.541H70.6476L74.156 316.442H74.2126L77.9191 307.541H80.8051ZM82.5594 308.459C82.5594 308.125 82.6725 307.847 82.9272 307.624C83.1818 307.401 83.4648 307.29 83.8043 307.29C84.1721 307.29 84.4834 307.401 84.7097 307.624C84.9361 307.847 85.0775 308.125 85.0775 308.459C85.0775 308.792 84.9644 309.071 84.7097 309.293C84.4551 309.516 84.1721 309.627 83.8043 309.627C83.4365 309.627 83.1535 309.516 82.9272 309.293C82.7008 309.043 82.5594 308.765 82.5594 308.459ZM84.8512 310.934V319.558H82.7857V310.934H84.8512ZM91.1042 318.083C91.4154 318.083 91.7549 318.028 92.1228 317.861C92.4906 317.722 92.8301 317.527 93.1414 317.304V319.196C92.8018 319.391 92.434 319.53 92.0096 319.613C91.5852 319.697 91.1325 319.752 90.6232 319.752C89.3217 319.752 88.2748 319.363 87.4825 318.556C86.662 317.75 86.2659 316.72 86.2659 315.496C86.2659 314.105 86.6903 312.965 87.5108 312.075C88.3314 311.185 89.4914 310.74 91.0193 310.74C91.4154 310.74 91.8115 310.795 92.1794 310.879C92.5755 310.962 92.8867 311.101 93.1131 311.212V313.16C92.8018 312.937 92.4623 312.742 92.1511 312.631C91.8115 312.52 91.472 312.436 91.1325 312.436C90.3119 312.436 89.6612 312.687 89.1519 313.215C88.6426 313.744 88.4162 314.439 88.4162 315.329C88.4162 316.192 88.6709 316.887 89.1519 317.36C89.6329 317.833 90.2837 318.083 91.1042 318.083ZM98.9982 310.795C99.168 310.795 99.3095 310.795 99.4509 310.823C99.5924 310.851 99.7056 310.879 99.7905 310.906V312.965C99.6773 312.881 99.5358 312.798 99.3095 312.742C99.0831 312.687 98.8568 312.631 98.5455 312.631C98.0362 312.631 97.6118 312.854 97.2723 313.271C96.9328 313.688 96.7347 314.328 96.7347 315.218V319.558H94.6692V310.934H96.7347V312.297H96.763C96.9611 311.824 97.244 311.463 97.6118 311.185C98.0079 310.934 98.4606 310.795 98.9982 310.795ZM99.9036 315.385C99.9036 313.966 100.328 312.826 101.12 311.991C101.941 311.157 103.073 310.74 104.516 310.74C105.874 310.74 106.949 311.129 107.713 311.936C108.477 312.742 108.873 313.827 108.873 315.19C108.873 316.581 108.448 317.694 107.656 318.528C106.836 319.363 105.732 319.78 104.318 319.78C102.959 319.78 101.884 319.391 101.092 318.612C100.3 317.805 99.9036 316.72 99.9036 315.385ZM102.054 315.302C102.054 316.192 102.252 316.887 102.676 317.36C103.101 317.833 103.695 318.083 104.459 318.083C105.195 318.083 105.789 317.861 106.185 317.36C106.581 316.887 106.779 316.192 106.779 315.246C106.779 314.328 106.581 313.633 106.185 313.132C105.789 312.659 105.195 312.409 104.487 312.409C103.723 312.409 103.157 312.659 102.733 313.16C102.252 313.688 102.054 314.384 102.054 315.302ZM111.957 313.215C111.957 313.493 112.042 313.744 112.24 313.911C112.438 314.078 112.834 314.272 113.485 314.523C114.305 314.857 114.9 315.218 115.211 315.608C115.55 316.025 115.72 316.498 115.72 317.082C115.72 317.889 115.409 318.528 114.758 319.029C114.136 319.53 113.258 319.752 112.183 319.752C111.815 319.752 111.419 319.697 110.967 319.613C110.514 319.53 110.146 319.419 109.835 319.28V317.277C110.203 317.527 110.627 317.75 111.052 317.889C111.476 318.028 111.872 318.111 112.24 318.111C112.693 318.111 113.06 318.056 113.258 317.916C113.485 317.777 113.598 317.583 113.598 317.277C113.598 316.998 113.485 316.776 113.258 316.553C113.032 316.359 112.579 316.136 111.957 315.886C111.193 315.58 110.655 315.218 110.344 314.829C110.033 314.439 109.863 313.939 109.863 313.327C109.863 312.548 110.174 311.908 110.797 311.407C111.419 310.906 112.24 310.656 113.23 310.656C113.541 310.656 113.881 310.684 114.249 310.767C114.617 310.851 114.956 310.934 115.211 311.018V312.993C114.928 312.826 114.617 312.659 114.249 312.52C113.881 312.381 113.513 312.325 113.174 312.325C112.777 312.325 112.466 312.409 112.268 312.548C112.07 312.742 111.957 312.937 111.957 313.215ZM116.597 315.385C116.597 313.966 117.022 312.826 117.814 311.991C118.634 311.157 119.766 310.74 121.209 310.74C122.567 310.74 123.642 311.129 124.406 311.936C125.17 312.742 125.566 313.827 125.566 315.19C125.566 316.581 125.142 317.694 124.35 318.528C123.529 319.363 122.426 319.78 121.011 319.78C119.653 319.78 118.578 319.391 117.785 318.612C117.022 317.805 116.597 316.72 116.597 315.385ZM118.747 315.302C118.747 316.192 118.946 316.887 119.37 317.36C119.794 317.833 120.389 318.083 121.152 318.083C121.888 318.083 122.482 317.861 122.878 317.36C123.275 316.887 123.473 316.192 123.473 315.246C123.473 314.328 123.275 313.633 122.878 313.132C122.482 312.659 121.888 312.409 121.181 312.409C120.417 312.409 119.851 312.659 119.427 313.16C118.974 313.688 118.747 314.384 118.747 315.302ZM132.442 312.603H129.358V319.558H127.264V312.603H125.793V310.934H127.264V309.738C127.264 308.848 127.575 308.097 128.169 307.513C128.764 306.929 129.528 306.65 130.461 306.65C130.716 306.65 130.942 306.678 131.14 306.678C131.338 306.678 131.508 306.734 131.65 306.789V308.542C131.593 308.514 131.452 308.459 131.282 308.403C131.112 308.347 130.914 308.319 130.688 308.319C130.263 308.319 129.924 308.459 129.697 308.709C129.471 308.959 129.358 309.376 129.358 309.877V310.906H132.442V308.959L134.507 308.347V310.906H136.601V312.576H134.507V316.609C134.507 317.138 134.62 317.499 134.79 317.722C134.988 317.944 135.3 318.056 135.724 318.056C135.837 318.056 135.979 318.028 136.148 317.972C136.318 317.916 136.46 317.861 136.573 317.777V319.446C136.431 319.53 136.233 319.586 135.922 319.641C135.611 319.697 135.328 319.725 135.017 319.725C134.139 319.725 133.489 319.502 133.064 319.057C132.64 318.612 132.414 317.916 132.414 316.998L132.442 312.603Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_32"
                                d="M49.6766 312.812H40V322.326H49.6766V312.812Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_33"
                                d="M60.3699 312.812H50.6934V322.326H60.3699V312.812Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_34"
                                d="M49.6766 323.326H40V332.84H49.6766V323.326Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_35"
                                d="M60.3699 323.326H50.6934V332.84H60.3699V323.326Z"
                                fill="currentColor"
                            />
                            <g id="Entra">
                                <path
                                    id="Vector_36"
                                    d="M106.29 337.65C105.651 337.65 105.073 337.532 104.557 337.295C104.04 337.055 103.631 336.707 103.329 336.251C103.032 335.796 102.883 335.238 102.883 334.577C102.883 334.008 102.992 333.54 103.211 333.172C103.43 332.805 103.725 332.514 104.097 332.299C104.469 332.085 104.885 331.923 105.345 331.813C105.804 331.704 106.273 331.621 106.75 331.564C107.354 331.494 107.844 331.437 108.22 331.393C108.597 331.345 108.87 331.268 109.041 331.163C109.212 331.058 109.297 330.888 109.297 330.651V330.605C109.297 330.032 109.135 329.588 108.811 329.272C108.492 328.957 108.015 328.8 107.38 328.8C106.719 328.8 106.198 328.946 105.818 329.24C105.441 329.528 105.181 329.85 105.036 330.205L103.191 329.785C103.41 329.172 103.73 328.677 104.15 328.301C104.574 327.92 105.062 327.644 105.614 327.474C106.165 327.298 106.745 327.211 107.354 327.211C107.756 327.211 108.183 327.259 108.634 327.355C109.089 327.447 109.514 327.618 109.908 327.867C110.306 328.117 110.632 328.474 110.886 328.938C111.14 329.397 111.267 329.995 111.267 330.73V337.427H109.35V336.048H109.271C109.144 336.302 108.954 336.551 108.7 336.796C108.446 337.041 108.12 337.245 107.721 337.407C107.323 337.569 106.846 337.65 106.29 337.65ZM106.717 336.074C107.26 336.074 107.724 335.967 108.109 335.752C108.498 335.538 108.794 335.258 108.995 334.912C109.201 334.562 109.304 334.188 109.304 333.789V332.489C109.234 332.559 109.098 332.625 108.897 332.686C108.7 332.743 108.474 332.794 108.22 332.837C107.967 332.877 107.719 332.914 107.479 332.949C107.238 332.98 107.036 333.006 106.875 333.028C106.494 333.076 106.146 333.157 105.831 333.271C105.52 333.385 105.27 333.549 105.082 333.763C104.898 333.973 104.806 334.253 104.806 334.603C104.806 335.089 104.986 335.457 105.345 335.706C105.704 335.952 106.161 336.074 106.717 336.074Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_37"
                                    d="M96.3516 337.427V327.342H98.2489V328.944H98.354C98.5378 328.402 98.8617 327.975 99.3256 327.664C99.794 327.349 100.324 327.191 100.914 327.191C101.037 327.191 101.181 327.196 101.348 327.205C101.518 327.213 101.652 327.224 101.748 327.237V329.115C101.669 329.093 101.529 329.069 101.328 329.043C101.127 329.012 100.925 328.997 100.724 328.997C100.26 328.997 99.8465 329.095 99.4832 329.292C99.1243 329.485 98.8398 329.754 98.6297 330.1C98.4196 330.441 98.3146 330.831 98.3146 331.268V337.427H96.3516Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_38"
                                    d="M94.1782 327.344V328.919H88.6699V327.344H94.1782ZM90.1471 324.928H92.1101V334.467C92.1101 334.848 92.167 335.135 92.2808 335.327C92.3946 335.515 92.5413 335.644 92.7207 335.715C92.9045 335.78 93.1037 335.813 93.3182 335.813C93.4757 335.813 93.6136 335.802 93.7318 335.78C93.8499 335.758 93.9419 335.741 94.0075 335.728L94.362 337.349C94.2482 337.393 94.0863 337.437 93.8762 337.481C93.6661 337.529 93.4035 337.555 93.0884 337.559C92.5719 337.568 92.0904 337.476 91.644 337.284C91.1976 337.091 90.8365 336.793 90.5607 336.391C90.285 335.988 90.1471 335.483 90.1471 334.874V324.928Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_39"
                                    d="M80.3869 331.439V337.427H78.4238V327.342H80.3081V328.984H80.4328C80.6648 328.45 81.0281 328.021 81.5227 327.697C82.0216 327.373 82.6497 327.211 83.4069 327.211C84.0941 327.211 84.6959 327.355 85.2124 327.644C85.7288 327.929 86.1293 328.353 86.4138 328.918C86.6983 329.483 86.8405 330.181 86.8405 331.012V337.427H84.8775V331.249C84.8775 330.518 84.6871 329.946 84.3063 329.535C83.9256 329.119 83.4025 328.911 82.7372 328.911C82.282 328.911 81.8772 329.01 81.5227 329.207C81.1725 329.404 80.8946 329.693 80.6889 330.073C80.4875 330.45 80.3869 330.905 80.3869 331.439Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_40"
                                    d="M67.4414 337.428V323.982H75.8713V325.729H69.4701V329.826H75.4314V331.565H69.4701V335.682H75.95V337.428H67.4414Z"
                                    fill="currentColor"
                                />
                            </g>
                        </g>
                        <path
                            id="source-three"
                            opacity="0.25"
                            d="M241.25 106.25C249.955 106.25 258.274 106.668 265.909 107.429C266.927 107.53 267.933 107.638 268.926 107.752C271.408 108.036 273.81 108.356 276.121 108.711C281.205 109.492 285.847 110.439 289.93 111.521C290.301 111.62 290.667 111.719 291.029 111.819C295.009 112.926 298.419 114.167 301.143 115.511C301.638 115.755 302.11 116.003 302.56 116.254C306.263 118.325 308.373 120.617 308.494 123.03C308.498 123.103 308.5 123.177 308.5 123.25C308.5 123.57 308.463 123.887 308.394 124.203C308.493 124.383 308.551 124.589 308.551 124.809V168.771L308.544 168.897C308.533 169.01 308.504 169.118 308.465 169.22C308.047 173.002 306.091 176.528 303.008 179.683C301.481 181.244 299.668 182.726 297.603 184.12C296.422 184.917 295.16 185.684 293.822 186.421C292.15 187.341 290.36 188.213 288.465 189.033C285.431 190.346 282.113 191.531 278.557 192.571C278.112 192.701 277.664 192.829 277.212 192.954C276.308 193.205 275.389 193.447 274.457 193.679C273.991 193.795 273.521 193.908 273.048 194.02C272.102 194.242 271.142 194.455 270.17 194.658C269.684 194.76 269.195 194.858 268.702 194.954C266.732 195.34 264.711 195.685 262.646 195.987C262.13 196.063 261.611 196.136 261.09 196.206C260.046 196.346 258.992 196.476 257.928 196.595C254.735 196.95 251.453 197.205 248.099 197.353C246.981 197.402 245.855 197.439 244.722 197.464C243.588 197.489 242.448 197.501 241.301 197.501V195.001C245.259 195.001 249.132 194.849 252.892 194.559C254.503 194.434 256.093 194.284 257.66 194.109C258.183 194.051 258.703 193.99 259.22 193.927C267.493 192.91 275.083 191.208 281.64 188.979C282.049 188.839 282.455 188.698 282.856 188.555C284.463 187.981 286.003 187.375 287.473 186.739C289.677 185.785 291.713 184.768 293.564 183.696C294.799 182.982 295.951 182.244 297.018 181.484C298.617 180.345 300.023 179.159 301.22 177.935C304.305 174.778 305.946 171.433 306.046 168.023L306.051 167.693V127.809C298.167 134.983 272.142 140.25 241.25 140.25V137.75C259.676 137.75 276.273 135.859 288.19 132.847C294.168 131.336 298.828 129.577 301.933 127.722C305.197 125.77 306 124.181 306 123.25C306 122.959 305.921 122.604 305.714 122.193C305.589 121.947 305.419 121.681 305.19 121.396C304.886 121.018 304.48 120.607 303.945 120.169C303.678 119.95 303.379 119.724 303.045 119.492C302.711 119.26 302.341 119.022 301.933 118.778C300.962 118.198 299.84 117.628 298.573 117.071C297.307 116.515 295.895 115.973 294.347 115.449C292.488 114.821 290.432 114.22 288.19 113.653C284.466 112.712 280.285 111.88 275.734 111.182C268.908 110.133 261.248 109.384 253.05 109.014C251.957 108.964 250.854 108.922 249.742 108.886C246.963 108.796 244.129 108.75 241.25 108.75C238.371 108.75 235.537 108.796 232.758 108.886C231.646 108.922 230.543 108.964 229.45 109.014C221.252 109.384 213.592 110.133 206.766 111.182C202.215 111.88 198.034 112.712 194.31 113.653C192.068 114.22 190.012 114.821 188.153 115.449C186.605 115.973 185.193 116.515 183.927 117.071C182.66 117.628 181.538 118.198 180.567 118.778C180.363 118.9 180.169 119.021 179.983 119.14C179.798 119.259 179.622 119.376 179.455 119.492C179.121 119.724 178.822 119.95 178.555 120.169C178.02 120.607 177.614 121.018 177.31 121.396C177.081 121.681 176.911 121.947 176.786 122.193C176.579 122.604 176.5 122.959 176.5 123.25C176.5 124.181 177.303 125.77 180.567 127.722C183.672 129.577 188.332 131.336 194.31 132.847C206.227 135.859 222.824 137.75 241.25 137.75V140.25C210.492 140.25 184.557 135.031 176.551 127.904V167.693L176.556 168.023C176.655 171.433 178.296 174.778 181.382 177.935C182.578 179.159 183.984 180.345 185.584 181.484C186.65 182.244 187.803 182.982 189.037 183.696C190.889 184.768 192.924 185.785 195.129 186.739C196.598 187.375 198.139 187.981 199.745 188.555C200.147 188.698 200.552 188.839 200.962 188.979C207.519 191.208 215.109 192.91 223.382 193.927C223.899 193.99 224.419 194.051 224.941 194.109C226.508 194.284 228.099 194.434 229.71 194.559C233.469 194.849 237.343 195.001 241.301 195.001V197.501C240.154 197.501 239.013 197.489 237.88 197.464C236.747 197.439 235.621 197.402 234.503 197.353C231.149 197.205 227.866 196.95 224.674 196.595C223.61 196.476 222.555 196.346 221.512 196.206C220.99 196.136 220.471 196.063 219.955 195.987C217.89 195.685 215.87 195.34 213.899 194.954C213.407 194.858 212.918 194.76 212.432 194.658C211.459 194.455 210.5 194.242 209.554 194.02C209.081 193.908 208.611 193.795 208.145 193.679C207.212 193.447 206.294 193.205 205.39 192.954C204.938 192.829 204.489 192.701 204.045 192.571C200.488 191.531 197.171 190.346 194.137 189.033C192.241 188.213 190.451 187.341 188.779 186.421C187.441 185.684 186.179 184.917 184.999 184.12C182.934 182.726 181.12 181.244 179.594 179.683C176.51 176.528 174.555 173.002 174.137 169.22C174.083 169.08 174.051 168.929 174.051 168.771V124.809C174.051 124.646 174.082 124.492 174.139 124.35C174.047 123.986 174 123.619 174 123.25C174 123.177 174.002 123.103 174.006 123.03C174.127 120.617 176.237 118.325 179.94 116.254C180.39 116.003 180.862 115.755 181.357 115.511C184.081 114.167 187.491 112.926 191.471 111.819C191.833 111.719 192.199 111.62 192.57 111.521C196.653 110.439 201.295 109.492 206.379 108.711C208.69 108.356 211.092 108.036 213.574 107.752C214.567 107.638 215.573 107.53 216.591 107.429C224.226 106.668 232.545 106.25 241.25 106.25Z"
                            fill="currentColor"
                        />
                        <g id="Frame_3" opacity="0.25" clipPath="url(#clip2_9648_2949)">
                            <path
                                id="Vector_41"
                                d="M233.746 154.85V168.65H231.302V157.821H231.269L226.903 168.65H225.274L220.81 157.821H220.778V168.65H218.529V154.85H222.048L226.089 165.073H226.154L230.422 154.85H233.746ZM235.766 155.905C235.766 155.521 235.896 155.202 236.189 154.946C236.482 154.691 236.808 154.563 237.199 154.563C237.623 154.563 237.981 154.691 238.242 154.946C238.503 155.202 238.666 155.521 238.666 155.905C238.666 156.288 238.535 156.607 238.242 156.863C237.949 157.118 237.623 157.246 237.199 157.246C236.776 157.246 236.45 157.118 236.189 156.863C235.929 156.575 235.766 156.256 235.766 155.905ZM238.405 158.748V168.65H236.026V158.748H238.405ZM245.606 166.957C245.964 166.957 246.355 166.893 246.779 166.702C247.202 166.542 247.593 166.318 247.952 166.063V168.235C247.561 168.459 247.137 168.618 246.648 168.714C246.16 168.81 245.638 168.874 245.052 168.874C243.553 168.874 242.347 168.427 241.435 167.5C240.49 166.574 240.034 165.392 240.034 163.986C240.034 162.389 240.523 161.08 241.468 160.057C242.413 159.035 243.748 158.524 245.508 158.524C245.964 158.524 246.42 158.588 246.844 158.684C247.3 158.78 247.658 158.939 247.919 159.067V161.303C247.561 161.048 247.17 160.824 246.811 160.696C246.42 160.568 246.029 160.473 245.638 160.473C244.693 160.473 243.944 160.76 243.357 161.367C242.771 161.974 242.51 162.773 242.51 163.795C242.51 164.785 242.804 165.584 243.357 166.127C243.911 166.67 244.661 166.957 245.606 166.957ZM254.696 158.588C254.892 158.588 255.055 158.588 255.218 158.62C255.381 158.652 255.511 158.684 255.609 158.716V161.08C255.478 160.984 255.315 160.888 255.055 160.824C254.794 160.76 254.533 160.696 254.175 160.696C253.589 160.696 253.1 160.952 252.709 161.431C252.318 161.91 252.09 162.645 252.09 163.667V168.65H249.711V158.748H252.09V160.313H252.122C252.35 159.77 252.676 159.355 253.1 159.035C253.556 158.748 254.077 158.588 254.696 158.588ZM255.739 163.859C255.739 162.23 256.228 160.92 257.14 159.961C258.085 159.003 259.388 158.524 261.05 158.524C262.614 158.524 263.852 158.971 264.732 159.898C265.612 160.824 266.068 162.07 266.068 163.635C266.068 165.232 265.579 166.51 264.667 167.468C263.722 168.427 262.451 168.906 260.822 168.906C259.258 168.906 258.02 168.459 257.107 167.564C256.195 166.638 255.739 165.392 255.739 163.859ZM258.215 163.763C258.215 164.785 258.443 165.584 258.932 166.127C259.421 166.67 260.105 166.957 260.985 166.957C261.832 166.957 262.516 166.702 262.972 166.127C263.429 165.584 263.657 164.785 263.657 163.699C263.657 162.645 263.429 161.846 262.972 161.271C262.516 160.728 261.832 160.441 261.017 160.441C260.138 160.441 259.486 160.728 258.997 161.303C258.443 161.91 258.215 162.709 258.215 163.763ZM269.619 161.367C269.619 161.686 269.717 161.974 269.945 162.166C270.173 162.357 270.629 162.581 271.379 162.868C272.324 163.252 273.008 163.667 273.366 164.114C273.757 164.593 273.953 165.136 273.953 165.807C273.953 166.734 273.594 167.468 272.845 168.043C272.128 168.618 271.118 168.874 269.88 168.874C269.456 168.874 269 168.81 268.479 168.714C267.958 168.618 267.534 168.491 267.176 168.331V166.031C267.599 166.318 268.088 166.574 268.577 166.734C269.065 166.893 269.522 166.989 269.945 166.989C270.467 166.989 270.89 166.925 271.118 166.766C271.379 166.606 271.509 166.382 271.509 166.031C271.509 165.711 271.379 165.456 271.118 165.2C270.857 164.977 270.336 164.721 269.619 164.434C268.74 164.082 268.121 163.667 267.762 163.22C267.404 162.773 267.208 162.198 267.208 161.495C267.208 160.6 267.567 159.866 268.283 159.291C269 158.716 269.945 158.428 271.086 158.428C271.444 158.428 271.835 158.46 272.259 158.556C272.682 158.652 273.073 158.748 273.366 158.843V161.111C273.041 160.92 272.682 160.728 272.259 160.568C271.835 160.409 271.411 160.345 271.02 160.345C270.564 160.345 270.206 160.441 269.978 160.6C269.75 160.824 269.619 161.048 269.619 161.367ZM274.963 163.859C274.963 162.23 275.452 160.92 276.364 159.961C277.309 159.003 278.612 158.524 280.274 158.524C281.838 158.524 283.076 158.971 283.956 159.898C284.836 160.824 285.292 162.07 285.292 163.635C285.292 165.232 284.803 166.51 283.891 167.468C282.946 168.427 281.675 168.906 280.046 168.906C278.482 168.906 277.244 168.459 276.331 167.564C275.452 166.638 274.963 165.392 274.963 163.859ZM277.439 163.763C277.439 164.785 277.667 165.584 278.156 166.127C278.645 166.67 279.329 166.957 280.209 166.957C281.056 166.957 281.74 166.702 282.196 166.127C282.653 165.584 282.881 164.785 282.881 163.699C282.881 162.645 282.653 161.846 282.196 161.271C281.74 160.728 281.056 160.441 280.241 160.441C279.362 160.441 278.71 160.728 278.221 161.303C277.7 161.91 277.439 162.709 277.439 163.763ZM293.209 160.664H289.658V168.65H287.247V160.664H285.552V158.748H287.247V157.374C287.247 156.352 287.605 155.489 288.289 154.818C288.974 154.148 289.853 153.828 290.929 153.828C291.222 153.828 291.482 153.86 291.711 153.86C291.939 153.86 292.134 153.924 292.297 153.988V156C292.232 155.968 292.069 155.905 291.873 155.841C291.678 155.777 291.45 155.745 291.189 155.745C290.701 155.745 290.31 155.905 290.049 156.192C289.788 156.48 289.658 156.959 289.658 157.534V158.716H293.209V156.48L295.588 155.777V158.716H297.999V160.632H295.588V165.264C295.588 165.871 295.718 166.286 295.914 166.542C296.142 166.798 296.5 166.925 296.989 166.925C297.119 166.925 297.282 166.893 297.478 166.83C297.673 166.766 297.836 166.702 297.966 166.606V168.523C297.804 168.618 297.576 168.682 297.217 168.746C296.859 168.81 296.533 168.842 296.174 168.842C295.164 168.842 294.415 168.586 293.926 168.075C293.437 167.564 293.177 166.766 293.177 165.711L293.209 160.664Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_42"
                                d="M199.143 150.25H188V161.175H199.143V150.25Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_43"
                                d="M211.46 150.25H200.316V161.175H211.46V150.25Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_44"
                                d="M199.143 162.324H188V173.249H199.143V162.324Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_45"
                                d="M211.46 162.324H200.316V173.249H211.46V162.324Z"
                                fill="currentColor"
                            />
                        </g>
                        <path
                            id="source-seven"
                            opacity="0.25"
                            d="M291.25 316.25C299.955 316.25 308.274 316.668 315.909 317.429C316.927 317.53 317.933 317.638 318.926 317.752C321.408 318.036 323.81 318.356 326.121 318.711C331.205 319.492 335.847 320.439 339.93 321.521C340.301 321.62 340.667 321.719 341.029 321.819C345.009 322.926 348.419 324.167 351.143 325.511C351.638 325.755 352.11 326.003 352.56 326.254C356.263 328.325 358.373 330.617 358.494 333.03C358.498 333.103 358.5 333.177 358.5 333.25C358.5 333.57 358.463 333.887 358.394 334.203C358.493 334.383 358.551 334.589 358.551 334.809V378.771L358.544 378.897C358.533 379.01 358.504 379.118 358.465 379.22C358.047 383.002 356.091 386.528 353.008 389.683C351.481 391.244 349.668 392.726 347.603 394.12C346.422 394.917 345.16 395.684 343.822 396.421C342.15 397.341 340.36 398.213 338.465 399.033C335.431 400.346 332.113 401.531 328.557 402.571C328.112 402.701 327.664 402.829 327.212 402.954C326.308 403.205 325.389 403.447 324.457 403.679C323.991 403.795 323.521 403.908 323.048 404.02C322.102 404.242 321.142 404.455 320.17 404.658C319.684 404.76 319.195 404.858 318.702 404.954C316.732 405.34 314.711 405.685 312.646 405.987C312.13 406.063 311.611 406.136 311.09 406.206C310.046 406.346 308.992 406.476 307.928 406.595C304.735 406.95 301.453 407.205 298.099 407.353C296.981 407.402 295.855 407.439 294.722 407.464C293.588 407.489 292.448 407.501 291.301 407.501V405.001C295.259 405.001 299.132 404.849 302.892 404.559C304.503 404.434 306.093 404.284 307.66 404.109C308.183 404.051 308.703 403.99 309.22 403.927C317.493 402.91 325.083 401.208 331.64 398.979C332.049 398.839 332.455 398.698 332.856 398.555C334.463 397.981 336.003 397.375 337.473 396.739C339.677 395.785 341.713 394.768 343.564 393.696C344.799 392.982 345.951 392.244 347.018 391.484C348.617 390.345 350.023 389.159 351.22 387.935C354.305 384.778 355.946 381.433 356.046 378.023L356.051 377.693V337.809C348.167 344.983 322.142 350.25 291.25 350.25V347.75C309.676 347.75 326.273 345.859 338.19 342.847C344.168 341.336 348.828 339.577 351.933 337.722C355.197 335.77 356 334.181 356 333.25C356 332.959 355.921 332.604 355.714 332.193C355.589 331.947 355.419 331.681 355.19 331.396C354.886 331.018 354.48 330.607 353.945 330.169C353.678 329.95 353.379 329.724 353.045 329.492C352.711 329.26 352.341 329.022 351.933 328.778C350.962 328.198 349.84 327.628 348.573 327.071C347.307 326.515 345.895 325.973 344.347 325.449C342.488 324.821 340.432 324.22 338.19 323.653C334.466 322.712 330.285 321.88 325.734 321.182C318.908 320.133 311.248 319.384 303.05 319.014C301.957 318.964 300.854 318.922 299.742 318.886C296.963 318.796 294.129 318.75 291.25 318.75C288.371 318.75 285.537 318.796 282.758 318.886C281.646 318.922 280.543 318.964 279.45 319.014C271.252 319.384 263.592 320.133 256.766 321.182C252.215 321.88 248.034 322.712 244.31 323.653C242.068 324.22 240.012 324.821 238.153 325.449C236.605 325.973 235.193 326.515 233.927 327.071C232.66 327.628 231.538 328.198 230.567 328.778C230.363 328.9 230.169 329.021 229.983 329.14C229.798 329.259 229.622 329.376 229.455 329.492C229.121 329.724 228.822 329.95 228.555 330.169C228.02 330.607 227.614 331.018 227.31 331.396C227.081 331.681 226.911 331.947 226.786 332.193C226.579 332.604 226.5 332.959 226.5 333.25C226.5 334.181 227.303 335.77 230.567 337.722C233.672 339.577 238.332 341.336 244.31 342.847C256.227 345.859 272.824 347.75 291.25 347.75V350.25C260.492 350.25 234.557 345.031 226.551 337.904V377.693L226.556 378.023C226.655 381.433 228.296 384.778 231.382 387.935C232.578 389.159 233.984 390.345 235.584 391.484C236.65 392.244 237.803 392.982 239.037 393.696C240.889 394.768 242.924 395.785 245.129 396.739C246.598 397.375 248.139 397.981 249.745 398.555C250.147 398.698 250.552 398.839 250.962 398.979C257.519 401.208 265.109 402.91 273.382 403.927C273.899 403.99 274.419 404.051 274.941 404.109C276.508 404.284 278.099 404.434 279.71 404.559C283.469 404.849 287.343 405.001 291.301 405.001V407.501C290.154 407.501 289.013 407.489 287.88 407.464C286.747 407.439 285.621 407.402 284.503 407.353C281.149 407.205 277.866 406.95 274.674 406.595C273.61 406.476 272.555 406.346 271.512 406.206C270.99 406.136 270.471 406.063 269.955 405.987C267.89 405.685 265.87 405.34 263.899 404.954C263.407 404.858 262.918 404.76 262.432 404.658C261.459 404.455 260.5 404.242 259.554 404.02C259.081 403.908 258.611 403.795 258.145 403.679C257.212 403.447 256.294 403.205 255.39 402.954C254.938 402.829 254.489 402.701 254.045 402.571C250.488 401.531 247.171 400.346 244.137 399.033C242.241 398.213 240.451 397.341 238.779 396.421C237.441 395.684 236.179 394.917 234.999 394.12C232.934 392.726 231.12 391.244 229.594 389.683C226.51 386.528 224.555 383.002 224.137 379.22C224.083 379.08 224.051 378.929 224.051 378.771V334.809C224.051 334.646 224.082 334.492 224.139 334.35C224.047 333.986 224 333.619 224 333.25C224 333.177 224.002 333.103 224.006 333.03C224.127 330.617 226.237 328.325 229.94 326.254C230.39 326.003 230.862 325.755 231.357 325.511C234.081 324.167 237.491 322.926 241.471 321.819C241.833 321.719 242.199 321.62 242.57 321.521C246.653 320.439 251.295 319.492 256.379 318.711C258.69 318.356 261.092 318.036 263.574 317.752C264.567 317.638 265.573 317.53 266.591 317.429C274.226 316.668 282.545 316.25 291.25 316.25Z"
                            fill="currentColor"
                        />
                        <g id="Frame_4" opacity="0.25" clipPath="url(#clip3_9648_2949)">
                            <path
                                id="Vector_46"
                                d="M330.094 378.976C327.441 378.976 325.571 376.992 325.571 374.384C325.571 371.776 327.441 369.792 330.094 369.792C332.747 369.792 334.565 371.776 334.565 374.384C334.565 376.992 332.721 378.976 330.094 378.976ZM329.668 381.709C331.808 381.709 333.626 380.909 334.774 379.234C334.991 380.859 336.218 381.451 337.766 381.451H339.002V378.876H338.471C337.592 378.876 337.375 378.467 337.375 377.509V367.326H334.539V369.417C333.573 367.951 331.755 367.067 329.668 367.067C325.945 367.067 322.526 370.059 322.526 374.384C322.526 378.709 325.953 381.701 329.668 381.701V381.709ZM315.062 378.176C315.062 380.492 316.559 381.451 318.351 381.451H321.804V378.876H319.29C318.246 378.876 318.029 378.492 318.029 377.509V369.901H321.804V367.326H318.029V362.584H315.062V378.176ZM301.553 381.451H304.519V375.392H305.511L310.565 381.451H314.314L307.868 373.767L312.818 367.326H309.478L305.433 372.767H304.519V362.584H301.553V381.451ZM291.923 367.067C287.774 367.067 284.355 370.059 284.355 374.384C284.355 378.709 287.783 381.701 291.923 381.701C296.064 381.701 299.491 378.709 299.491 374.384C299.491 370.059 296.064 367.067 291.923 367.067ZM291.923 378.976C289.27 378.976 287.4 376.992 287.4 374.384C287.4 371.776 289.27 369.792 291.923 369.792C294.577 369.792 296.447 371.776 296.447 374.384C296.447 376.992 294.577 378.976 291.923 378.976Z"
                                fill="currentColor"
                            />
                            <path
                                id="Vector_47"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M261.223 359.466L260.58 367.066C260.275 367.033 259.971 367.016 259.657 367.016C259.266 367.016 258.883 367.041 258.509 367.099L258.144 363.416C258.135 363.299 258.231 363.199 258.353 363.199H259.005L258.692 359.474C258.683 359.358 258.779 359.258 258.892 359.258H261.023C261.145 359.258 261.241 359.358 261.223 359.474V359.466ZM255.847 359.841C255.813 359.733 255.691 359.666 255.578 359.708L253.577 360.408C253.464 360.449 253.412 360.574 253.464 360.674L255.091 364.074L254.473 364.291C254.36 364.333 254.308 364.458 254.36 364.558L256.021 367.899C256.622 367.583 257.274 367.341 257.961 367.191L255.856 359.841H255.847ZM250.941 361.958L255.543 368.174C254.96 368.541 254.429 368.974 253.977 369.474L251.22 366.874C251.133 366.791 251.141 366.658 251.228 366.583L251.733 366.183L248.993 363.524C248.906 363.441 248.914 363.308 249.01 363.233L250.637 361.924C250.732 361.849 250.863 361.866 250.933 361.958H250.941ZM247.079 365.558C246.983 365.491 246.844 365.524 246.783 365.624L245.722 367.391C245.661 367.491 245.705 367.616 245.809 367.666L249.341 369.266L249.01 369.808C248.949 369.908 248.993 370.041 249.106 370.083L252.62 371.624C252.872 370.999 253.212 370.416 253.629 369.891L247.079 365.558ZM244.478 370.358C244.495 370.241 244.617 370.174 244.73 370.199L252.429 372.124C252.229 372.749 252.116 373.408 252.098 374.091L248.245 373.791C248.123 373.783 248.036 373.674 248.062 373.558L248.175 372.941L244.287 372.591C244.165 372.583 244.087 372.474 244.104 372.358L244.469 370.349L244.478 370.358ZM244.191 375.341C244.069 375.349 243.991 375.458 244.008 375.574L244.382 377.583C244.4 377.699 244.522 377.766 244.635 377.741L248.41 376.799L248.523 377.416C248.54 377.533 248.662 377.599 248.775 377.574L252.498 376.591C252.281 375.974 252.142 375.316 252.107 374.641L244.182 375.341H244.191ZM245.426 380.624C245.365 380.524 245.409 380.399 245.513 380.349L252.698 377.083C252.968 377.699 253.333 378.274 253.768 378.791L250.619 380.941C250.524 381.008 250.385 380.983 250.324 380.883L249.993 380.333L246.783 382.458C246.688 382.524 246.548 382.491 246.487 382.391L245.417 380.624H245.426ZM254.134 379.191L248.54 384.616C248.453 384.699 248.462 384.833 248.558 384.908L250.193 386.216C250.289 386.291 250.419 386.274 250.489 386.183L252.751 383.133L253.255 383.541C253.351 383.616 253.49 383.599 253.56 383.499L255.752 380.449C255.16 380.099 254.612 379.674 254.142 379.191H254.134ZM253.029 387.899C252.916 387.858 252.864 387.733 252.916 387.633L256.23 380.699C256.839 380.999 257.5 381.224 258.187 381.349L257.213 384.933C257.187 385.041 257.057 385.108 256.943 385.066L256.326 384.849L255.291 388.458C255.256 388.566 255.134 388.633 255.021 388.591L253.02 387.891L253.029 387.899ZM258.735 381.441L258.092 389.041C258.083 389.158 258.179 389.258 258.292 389.258H260.423C260.545 389.258 260.64 389.158 260.623 389.041L260.31 385.316H260.962C261.084 385.316 261.18 385.216 261.171 385.099L260.806 381.416C260.432 381.474 260.049 381.499 259.657 381.499C259.344 381.499 259.04 381.483 258.735 381.441ZM266.408 360.866C266.46 360.758 266.408 360.641 266.295 360.599L264.294 359.899C264.181 359.858 264.059 359.924 264.024 360.033L262.989 363.641L262.372 363.424C262.258 363.383 262.137 363.449 262.102 363.558L261.128 367.141C261.823 367.274 262.476 367.499 263.085 367.791L266.408 360.866ZM270.775 363.891L265.181 369.316C264.712 368.833 264.172 368.408 263.572 368.058L265.764 365.008C265.834 364.916 265.973 364.891 266.069 364.966L266.573 365.374L268.835 362.324C268.904 362.233 269.044 362.216 269.131 362.291L270.766 363.599C270.862 363.674 270.862 363.808 270.783 363.891H270.775ZM273.802 368.158C273.915 368.108 273.95 367.983 273.889 367.883L272.819 366.116C272.758 366.016 272.619 365.991 272.523 366.049L269.313 368.174L268.983 367.633C268.922 367.533 268.783 367.499 268.687 367.574L265.538 369.724C265.973 370.241 266.329 370.816 266.608 371.433L273.793 368.166L273.802 368.158ZM274.933 370.924L275.298 372.933C275.315 373.049 275.237 373.149 275.115 373.166L267.191 373.874C267.156 373.191 267.017 372.541 266.799 371.924L270.522 370.941C270.635 370.908 270.757 370.983 270.775 371.099L270.888 371.716L274.663 370.774C274.776 370.749 274.898 370.816 274.915 370.933L274.933 370.924ZM274.576 378.299C274.689 378.324 274.811 378.258 274.828 378.141L275.194 376.133C275.211 376.016 275.133 375.916 275.011 375.899L271.123 375.549L271.236 374.933C271.253 374.816 271.175 374.716 271.053 374.699L267.199 374.399C267.182 375.083 267.069 375.741 266.869 376.366L274.567 378.291L274.576 378.299ZM272.523 382.883C272.462 382.983 272.323 383.008 272.227 382.949L265.677 378.616C266.095 378.091 266.434 377.508 266.686 376.883L270.2 378.424C270.314 378.474 270.357 378.599 270.296 378.699L269.966 379.241L273.497 380.841C273.602 380.891 273.645 381.016 273.584 381.116L272.523 382.883ZM263.763 380.324L268.365 386.541C268.435 386.633 268.574 386.649 268.661 386.574L270.287 385.266C270.383 385.191 270.383 385.058 270.305 384.974L267.565 382.316L268.069 381.916C268.165 381.841 268.165 381.708 268.078 381.624L265.32 379.024C264.859 379.524 264.337 379.966 263.755 380.324H263.763ZM263.72 388.791C263.607 388.833 263.485 388.766 263.45 388.658L261.345 381.308C262.032 381.158 262.685 380.916 263.285 380.599L264.946 383.941C264.999 384.049 264.946 384.174 264.833 384.208L264.216 384.424L265.842 387.824C265.895 387.933 265.842 388.049 265.729 388.091L263.729 388.791H263.72Z"
                                fill="currentColor"
                            />
                        </g>
                        <path
                            id="source-five"
                            opacity="0.25"
                            d="M241.25 211.25C249.955 211.25 258.274 211.668 265.909 212.429C266.927 212.53 267.933 212.638 268.926 212.752C271.408 213.036 273.81 213.356 276.121 213.711C281.205 214.492 285.847 215.439 289.93 216.521C290.301 216.62 290.667 216.719 291.029 216.819C295.009 217.926 298.419 219.167 301.143 220.511C301.638 220.755 302.11 221.003 302.56 221.254C306.263 223.325 308.373 225.617 308.494 228.03C308.498 228.103 308.5 228.177 308.5 228.25C308.5 228.57 308.463 228.887 308.394 229.203C308.493 229.383 308.551 229.589 308.551 229.809V273.771L308.544 273.897C308.533 274.01 308.504 274.118 308.465 274.22C308.047 278.002 306.091 281.528 303.008 284.683C301.481 286.244 299.668 287.726 297.603 289.12C296.422 289.917 295.16 290.684 293.822 291.421C292.15 292.341 290.36 293.213 288.465 294.033C285.431 295.346 282.113 296.531 278.557 297.571C278.112 297.701 277.664 297.829 277.212 297.954C276.308 298.205 275.389 298.447 274.457 298.679C273.991 298.795 273.521 298.908 273.048 299.02C272.102 299.242 271.142 299.455 270.17 299.658C269.684 299.76 269.195 299.858 268.702 299.954C266.732 300.34 264.711 300.685 262.646 300.987C262.13 301.063 261.611 301.136 261.09 301.206C260.046 301.346 258.992 301.476 257.928 301.595C254.735 301.95 251.453 302.205 248.099 302.353C246.981 302.402 245.855 302.439 244.722 302.464C243.588 302.489 242.448 302.501 241.301 302.501V300.001C245.259 300.001 249.132 299.849 252.892 299.559C254.503 299.434 256.093 299.284 257.66 299.109C258.183 299.051 258.703 298.99 259.22 298.927C267.493 297.91 275.083 296.208 281.64 293.979C282.049 293.839 282.455 293.698 282.856 293.555C284.463 292.981 286.003 292.375 287.473 291.739C289.677 290.785 291.713 289.768 293.564 288.696C294.799 287.982 295.951 287.244 297.018 286.484C298.617 285.345 300.023 284.159 301.22 282.935C304.305 279.778 305.946 276.433 306.046 273.023L306.051 272.693V232.809C298.167 239.983 272.142 245.25 241.25 245.25V242.75C259.676 242.75 276.273 240.859 288.19 237.847C294.168 236.336 298.828 234.577 301.933 232.722C305.197 230.77 306 229.181 306 228.25C306 227.959 305.921 227.604 305.714 227.193C305.589 226.947 305.419 226.681 305.19 226.396C304.886 226.018 304.48 225.607 303.945 225.169C303.678 224.95 303.379 224.724 303.045 224.492C302.711 224.26 302.341 224.022 301.933 223.778C300.962 223.198 299.84 222.628 298.573 222.071C297.307 221.515 295.895 220.973 294.347 220.449C292.488 219.821 290.432 219.22 288.19 218.653C284.466 217.712 280.285 216.88 275.734 216.182C268.908 215.133 261.248 214.384 253.05 214.014C251.957 213.964 250.854 213.922 249.742 213.886C246.963 213.796 244.129 213.75 241.25 213.75C238.371 213.75 235.537 213.796 232.758 213.886C231.646 213.922 230.543 213.964 229.45 214.014C221.252 214.384 213.592 215.133 206.766 216.182C202.215 216.88 198.034 217.712 194.31 218.653C192.068 219.22 190.012 219.821 188.153 220.449C186.605 220.973 185.193 221.515 183.927 222.071C182.66 222.628 181.538 223.198 180.567 223.778C180.363 223.9 180.169 224.021 179.983 224.14C179.798 224.259 179.622 224.376 179.455 224.492C179.121 224.724 178.822 224.95 178.555 225.169C178.02 225.607 177.614 226.018 177.31 226.396C177.081 226.681 176.911 226.947 176.786 227.193C176.579 227.604 176.5 227.959 176.5 228.25C176.5 229.181 177.303 230.77 180.567 232.722C183.672 234.577 188.332 236.336 194.31 237.847C206.227 240.859 222.824 242.75 241.25 242.75V245.25C210.492 245.25 184.557 240.031 176.551 232.904V272.693L176.556 273.023C176.655 276.433 178.296 279.778 181.382 282.935C182.578 284.159 183.984 285.345 185.584 286.484C186.65 287.244 187.803 287.982 189.037 288.696C190.889 289.768 192.924 290.785 195.129 291.739C196.598 292.375 198.139 292.981 199.745 293.555C200.147 293.698 200.552 293.839 200.962 293.979C207.519 296.208 215.109 297.91 223.382 298.927C223.899 298.99 224.419 299.051 224.941 299.109C226.508 299.284 228.099 299.434 229.71 299.559C233.469 299.849 237.343 300.001 241.301 300.001V302.501C240.154 302.501 239.013 302.489 237.88 302.464C236.747 302.439 235.621 302.402 234.503 302.353C231.149 302.205 227.866 301.95 224.674 301.595C223.61 301.476 222.555 301.346 221.512 301.206C220.99 301.136 220.471 301.063 219.955 300.987C217.89 300.685 215.87 300.34 213.899 299.954C213.407 299.858 212.918 299.76 212.432 299.658C211.459 299.455 210.5 299.242 209.554 299.02C209.081 298.908 208.611 298.795 208.145 298.679C207.212 298.447 206.294 298.205 205.39 297.954C204.938 297.829 204.489 297.701 204.045 297.571C200.488 296.531 197.171 295.346 194.137 294.033C192.241 293.213 190.451 292.341 188.779 291.421C187.441 290.684 186.179 289.917 184.999 289.12C182.934 287.726 181.12 286.244 179.594 284.683C176.51 281.528 174.555 278.002 174.137 274.22C174.083 274.08 174.051 273.929 174.051 273.771V229.809C174.051 229.646 174.082 229.492 174.139 229.35C174.047 228.986 174 228.619 174 228.25C174 228.177 174.002 228.103 174.006 228.03C174.127 225.617 176.237 223.325 179.94 221.254C180.39 221.003 180.862 220.755 181.357 220.511C184.081 219.167 187.491 217.926 191.471 216.819C191.833 216.719 192.199 216.62 192.57 216.521C196.653 215.439 201.295 214.492 206.379 213.711C208.69 213.356 211.092 213.036 213.574 212.752C214.567 212.638 215.573 212.53 216.591 212.429C224.226 211.668 232.545 211.25 241.25 211.25Z"
                            fill="currentColor"
                        />
                        <g id="Group 1558" opacity="0.25">
                            <path
                                id="Vector_48"
                                d="M213.472 272.262H215.222L211.741 285.312H210.027L207.22 276.709H207.147L204.34 285.312H202.627L199 272.262H200.75L203.502 282.523H203.575L206.4 274.012H207.968L210.793 282.523H210.866L213.472 272.262Z"
                                fill="currentColor"
                            />
                            <g id="Group">
                                <path
                                    id="Vector_49"
                                    d="M215.063 280.847C215.063 279.474 215.494 278.338 216.357 277.439C217.232 276.539 218.331 276.09 219.656 276.09C220.98 276.09 222.074 276.539 222.937 277.439C223.811 278.338 224.249 279.474 224.249 280.847C224.249 282.232 223.811 283.368 222.937 284.256C222.074 285.155 220.98 285.605 219.656 285.604C218.331 285.604 217.232 285.154 216.357 284.254C215.494 283.355 215.062 282.219 215.063 280.846M216.739 280.846C216.739 281.806 217.019 282.584 217.578 283.179C218.137 283.774 218.829 284.072 219.656 284.072C220.482 284.072 221.175 283.774 221.734 283.179C222.293 282.584 222.572 281.806 222.572 280.846C222.572 279.898 222.293 279.127 221.734 278.531C221.163 277.924 220.471 277.62 219.656 277.62C218.841 277.62 218.148 277.924 217.577 278.532C217.018 279.127 216.738 279.899 216.739 280.847"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_50"
                                    d="M227.116 285.313H225.439V276.382H227.043V277.84H227.118C227.288 277.366 227.637 276.962 228.166 276.628C228.695 276.294 229.214 276.127 229.724 276.127C230.21 276.127 230.623 276.2 230.964 276.346L230.452 277.969C230.245 277.884 229.917 277.841 229.468 277.841C228.836 277.841 228.286 278.096 227.818 278.607C227.351 279.117 227.117 279.712 227.116 280.392V285.313Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_51"
                                    d="M239.592 285.312H237.569L234.78 281.102L233.413 282.451V285.312H231.736V272.262H233.413V280.3L237.277 276.381H239.428V276.454L235.947 279.917L239.592 285.239V285.312Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_52"
                                    d="M246.85 282.833C246.85 283.611 246.51 284.267 245.829 284.801C245.149 285.336 244.292 285.603 243.259 285.603C242.36 285.603 241.57 285.369 240.89 284.902C240.223 284.451 239.714 283.805 239.432 283.052L240.926 282.414C241.145 282.949 241.464 283.365 241.883 283.662C242.283 283.954 242.765 284.11 243.26 284.108C243.795 284.108 244.241 283.993 244.599 283.762C244.957 283.531 245.136 283.258 245.136 282.942C245.136 282.372 244.699 281.952 243.824 281.684L242.293 281.302C240.556 280.864 239.687 280.025 239.687 278.785C239.687 277.972 240.018 277.318 240.68 276.826C241.343 276.333 242.19 276.087 243.223 276.088C244.013 276.088 244.727 276.276 245.365 276.653C246.003 277.03 246.449 277.534 246.704 278.166L245.21 278.785C245.038 278.407 244.747 278.097 244.38 277.901C243.987 277.686 243.544 277.576 243.095 277.582C242.68 277.576 242.272 277.69 241.92 277.911C241.573 278.129 241.399 278.397 241.399 278.713C241.399 279.223 241.879 279.587 242.839 279.806L244.188 280.152C245.962 280.59 246.849 281.483 246.849 282.831"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_53"
                                    d="M252.674 285.604C252.018 285.604 251.419 285.465 250.879 285.185C250.338 284.906 249.922 284.535 249.63 284.073H249.556L249.63 285.313V289.25H247.953V276.381H249.557V277.621H249.631C249.923 277.159 250.339 276.789 250.88 276.509C251.421 276.229 252.019 276.09 252.675 276.09C253.854 276.09 254.85 276.552 255.665 277.475C256.503 278.411 256.922 279.535 256.922 280.847C256.922 282.172 256.503 283.296 255.665 284.219C254.85 285.143 253.854 285.604 252.675 285.604M252.402 284.073C253.204 284.073 253.878 283.769 254.425 283.162C254.971 282.567 255.244 281.795 255.244 280.847C255.244 279.912 254.971 279.14 254.425 278.532C253.88 277.924 253.205 277.621 252.402 277.621C251.588 277.621 250.907 277.925 250.361 278.532C249.826 279.14 249.558 279.912 249.559 280.847C249.559 281.795 249.826 282.573 250.361 283.18C250.906 283.775 251.587 284.073 252.402 284.073"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_54"
                                    d="M261.513 276.088C262.753 276.088 263.731 276.419 264.448 277.081C265.164 277.744 265.523 278.652 265.523 279.807V285.312H263.919V284.072H263.845C263.152 285.092 262.229 285.603 261.074 285.603C260.09 285.603 259.267 285.311 258.605 284.728C257.942 284.145 257.611 283.415 257.611 282.541C257.611 281.617 257.961 280.882 258.659 280.335C259.358 279.788 260.29 279.515 261.457 279.515C262.453 279.515 263.274 279.697 263.918 280.062V279.677C263.918 279.094 263.687 278.599 263.225 278.192C262.781 277.791 262.201 277.573 261.603 277.581C260.667 277.581 259.926 277.976 259.379 278.766L257.903 277.836C258.717 276.671 259.92 276.088 261.511 276.088M259.344 282.579C259.344 283.016 259.53 283.381 259.9 283.673C260.271 283.964 260.705 284.11 261.202 284.11C261.907 284.11 262.535 283.849 263.088 283.326C263.641 282.804 263.918 282.19 263.918 281.485C263.395 281.072 262.666 280.866 261.731 280.866C261.05 280.866 260.482 281.03 260.026 281.358C259.571 281.686 259.343 282.093 259.344 282.579Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_55"
                                    d="M271.206 285.604C269.882 285.604 268.782 285.155 267.907 284.256C267.044 283.332 266.613 282.196 266.613 280.847C266.613 279.474 267.045 278.338 267.907 277.439C268.782 276.539 269.882 276.09 271.206 276.09C272.118 276.09 272.914 276.318 273.594 276.773C274.275 277.229 274.785 277.858 275.125 278.66L273.596 279.298C273.122 278.18 272.289 277.621 271.099 277.621C270.333 277.621 269.671 277.931 269.112 278.551C268.565 279.171 268.292 279.936 268.292 280.847C268.292 281.759 268.565 282.524 269.112 283.144C269.671 283.764 270.333 284.074 271.099 284.074C272.326 284.074 273.189 283.515 273.687 282.397L275.181 283.035C274.853 283.837 274.34 284.466 273.641 284.921C272.942 285.377 272.131 285.605 271.208 285.605"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_56"
                                    d="M280.231 285.604C278.919 285.604 277.837 285.155 276.987 284.256C276.136 283.356 275.711 282.22 275.711 280.847C275.711 279.486 276.124 278.353 276.95 277.448C277.777 276.542 278.834 276.089 280.122 276.09C281.446 276.09 282.5 276.518 283.284 277.375C284.067 278.231 284.459 279.431 284.458 280.975L284.44 281.157H277.424C277.449 282.032 277.741 282.737 278.299 283.271C278.858 283.806 279.526 284.073 280.304 284.073C281.373 284.073 282.212 283.539 282.819 282.469L284.314 283.198C283.933 283.931 283.355 284.543 282.646 284.966C281.935 285.391 281.13 285.604 280.231 285.604ZM277.553 279.772H282.673C282.623 279.152 282.371 278.638 281.916 278.231C281.461 277.824 280.851 277.621 280.085 277.621C279.453 277.621 278.909 277.815 278.453 278.204C277.998 278.593 277.697 279.116 277.551 279.772"
                                    fill="currentColor"
                                />
                            </g>
                            <g id="Group_2">
                                <path
                                    id="Vector_57"
                                    d="M218.953 261.013V258.995H225.708C225.783 259.403 225.819 259.817 225.817 260.232C225.817 261.745 225.403 263.62 224.068 264.953C222.771 266.304 221.114 267.025 218.917 267.025C214.846 267.025 211.424 263.71 211.424 259.637C211.424 255.565 214.846 252.25 218.917 252.25C221.17 252.25 222.772 253.133 223.979 254.286L222.556 255.709C221.69 254.899 220.521 254.268 218.917 254.268C215.945 254.268 213.621 256.664 213.621 259.637C213.621 262.611 215.945 265.009 218.917 265.009C220.845 265.009 221.944 264.234 222.646 263.531C223.219 262.959 223.596 262.138 223.742 261.015L218.953 261.013Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_58"
                                    d="M236.109 262.267C236.109 265.007 233.965 267.023 231.336 267.023C228.707 267.023 226.562 265.007 226.562 262.267C226.562 259.51 228.706 257.51 231.336 257.51C233.967 257.51 236.11 259.51 236.11 262.267M234.02 262.267C234.02 260.556 232.778 259.384 231.336 259.384C229.895 259.384 228.652 260.555 228.652 262.267C228.652 263.96 229.895 265.149 231.336 265.149C232.778 265.149 234.02 263.959 234.02 262.267Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_59"
                                    d="M246.523 262.267C246.523 265.007 244.381 267.023 241.75 267.023C239.119 267.023 236.977 265.007 236.977 262.267C236.977 259.51 239.12 257.51 241.75 257.51C244.38 257.51 246.523 259.51 246.523 262.267ZM244.434 262.267C244.434 260.556 243.191 259.384 241.75 259.384C240.309 259.384 239.066 260.555 239.066 262.267C239.066 263.96 240.309 265.149 241.75 265.149C243.192 265.149 244.434 263.959 244.434 262.267Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_60"
                                    d="M256.504 257.798V266.339C256.504 269.852 254.433 271.294 251.983 271.294C249.677 271.294 248.29 269.744 247.768 268.483L249.588 267.726C249.912 268.501 250.704 269.42 251.984 269.42C253.551 269.42 254.524 268.447 254.524 266.627V265.943H254.452C253.984 266.519 253.083 267.023 251.948 267.023C249.57 267.023 247.391 264.951 247.391 262.285C247.391 259.6 249.57 257.51 251.948 257.51C253.083 257.51 253.984 258.014 254.452 258.573H254.524V257.798H256.504ZM254.667 262.285C254.667 260.609 253.551 259.383 252.127 259.383C250.686 259.383 249.479 260.609 249.479 262.285C249.479 263.942 250.686 265.149 252.127 265.149C253.55 265.149 254.667 263.942 254.667 262.285Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_61"
                                    d="M260.043 252.801H257.953V266.736H260.043V252.801Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_62"
                                    d="M268.112 263.834L269.733 264.915C269.213 265.69 267.95 267.023 265.77 267.023C263.068 267.023 261.051 264.933 261.051 262.267C261.051 259.44 263.087 257.51 265.536 257.51C268.004 257.51 269.211 259.474 269.607 260.537L269.824 261.077L263.463 263.708C263.949 264.663 264.706 265.149 265.769 265.149C266.832 265.149 267.57 264.629 268.112 263.834ZM263.122 262.123L267.374 260.358C267.139 259.762 266.437 259.349 265.608 259.349C264.546 259.349 263.068 260.286 263.122 262.124"
                                    fill="currentColor"
                                />
                            </g>
                        </g>
                        <path
                            id="source-one"
                            opacity="0.25"
                            d="M291.25 1.25C299.955 1.25 308.274 1.66753 315.909 2.42871C316.927 2.53018 317.933 2.63847 318.926 2.75195C321.408 3.0357 323.81 3.356 326.121 3.71094C331.205 4.49182 335.847 5.43901 339.93 6.52148C340.301 6.61988 340.667 6.71872 341.029 6.81934C345.009 7.92629 348.419 9.16682 351.143 10.5107C351.638 10.7551 352.11 11.0028 352.56 11.2539C356.263 13.3248 358.373 15.617 358.494 18.0303C358.498 18.1034 358.5 18.1767 358.5 18.25C358.5 18.57 358.463 18.8875 358.394 19.2031C358.493 19.3826 358.551 19.5887 358.551 19.8086V63.7705L358.544 63.8975C358.533 64.0103 358.504 64.1178 358.465 64.2197C358.047 68.0016 356.091 71.5284 353.008 74.6826C351.481 76.2442 349.668 77.7265 347.603 79.1201C346.422 79.9167 345.16 80.6843 343.822 81.4209C342.15 82.3413 340.36 83.2132 338.465 84.0332C335.431 85.3459 332.113 86.5313 328.557 87.5713C328.112 87.7013 327.664 87.8287 327.212 87.9541C326.308 88.2049 325.389 88.4467 324.457 88.6787C323.991 88.7947 323.521 88.9083 323.048 89.0195C322.102 89.242 321.142 89.4554 320.17 89.6582C319.684 89.7595 319.195 89.8578 318.702 89.9541C316.732 90.3396 314.711 90.685 312.646 90.9873C312.13 91.0629 311.611 91.1359 311.09 91.2061C310.046 91.3465 308.992 91.4763 307.928 91.5947C304.735 91.95 301.453 92.2052 298.099 92.3525C296.981 92.4016 295.855 92.439 294.722 92.4639C293.588 92.4887 292.448 92.501 291.301 92.501V90.001C295.259 90.001 299.132 89.8493 302.892 89.5586C304.503 89.434 306.093 89.2839 307.66 89.1094C308.183 89.0512 308.703 88.9903 309.22 88.9268C317.493 87.9098 325.083 86.2075 331.64 83.9785C332.049 83.8392 332.455 83.698 332.856 83.5547C334.463 82.9811 336.003 82.375 337.473 81.7393C339.677 80.7854 341.713 79.7679 343.564 78.6963C344.799 77.9821 345.951 77.2435 347.018 76.4844C348.617 75.3452 350.023 74.1586 351.22 72.9346C354.305 69.7782 355.946 66.4334 356.046 63.0234L356.051 62.6934V22.8086C348.167 29.9827 322.142 35.25 291.25 35.25V32.75C309.676 32.75 326.273 30.8592 338.19 27.8467C344.168 26.3356 348.828 24.5774 351.933 22.7217C355.197 20.7705 356 19.1812 356 18.25C356 17.959 355.921 17.6038 355.714 17.1934C355.589 16.947 355.419 16.6806 355.19 16.3965C354.886 16.0177 354.48 15.6068 353.945 15.1689C353.678 14.95 353.379 14.7241 353.045 14.4922C352.711 14.2602 352.341 14.0222 351.933 13.7783C350.962 13.1984 349.84 12.6276 348.573 12.0713C347.307 11.5149 345.895 10.9728 344.347 10.4492C342.488 9.82096 340.432 9.21995 338.19 8.65332C334.466 7.71194 330.285 6.88048 325.734 6.18164C318.908 5.13339 311.248 4.38414 303.05 4.01367C301.957 3.96427 300.854 3.9215 299.742 3.88574C296.963 3.79637 294.129 3.75 291.25 3.75C288.371 3.75 285.537 3.79637 282.758 3.88574C281.646 3.9215 280.543 3.96427 279.45 4.01367C271.252 4.38414 263.592 5.13339 256.766 6.18164C252.215 6.88048 248.034 7.71194 244.31 8.65332C242.068 9.21995 240.012 9.82096 238.153 10.4492C236.605 10.9728 235.193 11.5149 233.927 12.0713C232.66 12.6276 231.538 13.1984 230.567 13.7783C230.363 13.9003 230.169 14.0206 229.983 14.1396C229.798 14.2587 229.622 14.3762 229.455 14.4922C229.121 14.7241 228.822 14.95 228.555 15.1689C228.02 15.6068 227.614 16.0177 227.31 16.3965C227.081 16.6806 226.911 16.947 226.786 17.1934C226.579 17.6038 226.5 17.959 226.5 18.25C226.5 19.1812 227.303 20.7705 230.567 22.7217C233.672 24.5774 238.332 26.3356 244.31 27.8467C256.227 30.8592 272.824 32.75 291.25 32.75V35.25C260.492 35.25 234.557 30.0307 226.551 22.9043V62.6934L226.556 63.0234C226.655 66.4334 228.296 69.7782 231.382 72.9346C232.578 74.1586 233.984 75.3452 235.584 76.4844C236.65 77.2435 237.803 77.9821 239.037 78.6963C240.889 79.7679 242.924 80.7854 245.129 81.7393C246.598 82.375 248.139 82.9811 249.745 83.5547C250.147 83.698 250.552 83.8392 250.962 83.9785C257.519 86.2075 265.109 87.9098 273.382 88.9268C273.899 88.9903 274.419 89.0512 274.941 89.1094C276.508 89.2839 278.099 89.434 279.71 89.5586C283.469 89.8493 287.343 90.001 291.301 90.001V92.501C290.154 92.501 289.013 92.4887 287.88 92.4639C286.747 92.439 285.621 92.4016 284.503 92.3525C281.149 92.2052 277.866 91.95 274.674 91.5947C273.61 91.4763 272.555 91.3465 271.512 91.2061C270.99 91.1359 270.471 91.0629 269.955 90.9873C267.89 90.685 265.87 90.3396 263.899 89.9541C263.407 89.8578 262.918 89.7595 262.432 89.6582C261.459 89.4554 260.5 89.242 259.554 89.0195C259.081 88.9083 258.611 88.7947 258.145 88.6787C257.212 88.4467 256.294 88.2049 255.39 87.9541C254.938 87.8287 254.489 87.7013 254.045 87.5713C250.488 86.5313 247.171 85.3459 244.137 84.0332C242.241 83.2132 240.451 82.3413 238.779 81.4209C237.441 80.6843 236.179 79.9167 234.999 79.1201C232.934 77.7265 231.12 76.2442 229.594 74.6826C226.51 71.5284 224.555 68.0016 224.137 64.2197C224.083 64.0801 224.051 63.9292 224.051 63.7705V19.8086C224.051 19.6464 224.082 19.4918 224.139 19.3496C224.047 18.986 224 18.6194 224 18.25C224 18.1767 224.002 18.1034 224.006 18.0303C224.127 15.617 226.237 13.3248 229.94 11.2539C230.39 11.0028 230.862 10.7551 231.357 10.5107C234.081 9.16682 237.491 7.92629 241.471 6.81934C241.833 6.71872 242.199 6.61988 242.57 6.52148C246.653 5.43901 251.295 4.49182 256.379 3.71094C258.69 3.356 261.092 3.0357 263.574 2.75195C264.567 2.63847 265.573 2.53018 266.591 2.42871C274.226 1.66753 282.545 1.25 291.25 1.25Z"
                            fill="currentColor"
                        />
                        <g id="Group 1560" opacity="0.25">
                            <path
                                id="Vector_63"
                                d="M266.309 52.1599C266.119 52.3039 262.765 54.1505 262.765 58.2565C262.765 63.0058 267.033 64.6859 267.161 64.7275C267.141 64.83 266.483 67.0286 264.91 69.2688C263.509 71.2402 262.044 73.2084 259.817 73.2084C257.59 73.2084 257.016 71.9443 254.445 71.9443C251.939 71.9443 251.048 73.25 249.011 73.25C246.973 73.25 245.552 71.4258 243.917 69.1856C242.024 66.5549 240.494 62.4681 240.494 58.5893C240.494 52.3679 244.635 49.0684 248.709 49.0684C250.875 49.0684 252.679 50.4573 254.039 50.4573C255.333 50.4573 257.35 48.9852 259.814 48.9852C260.747 48.9852 264.101 49.0684 266.309 52.1599ZM258.644 46.3513C259.663 45.1704 260.384 43.5318 260.384 41.8933C260.384 41.666 260.364 41.4356 260.321 41.25C258.664 41.3108 256.692 42.3285 255.503 43.6758C254.569 44.7127 253.698 46.3513 253.698 48.0123C253.698 48.2619 253.741 48.5115 253.76 48.5915C253.865 48.6107 254.035 48.6331 254.206 48.6331C255.693 48.6331 257.563 47.6602 258.644 46.3513Z"
                                fill="currentColor"
                            />
                            <g id="Apple">
                                <path
                                    id="Vector_64"
                                    d="M334.922 66.8498C333.632 66.8498 332.521 66.5742 331.589 66.0231C330.663 65.4663 329.947 64.685 329.441 63.6793C328.941 62.668 328.691 61.4833 328.691 60.1254C328.691 58.7844 328.941 57.6026 329.441 56.5799C329.947 55.5572 330.652 54.7589 331.555 54.185C332.464 53.6112 333.527 53.3242 334.743 53.3242C335.481 53.3242 336.197 53.4464 336.89 53.6907C337.583 53.935 338.206 54.3185 338.757 54.8413C339.308 55.364 339.743 56.043 340.061 56.8782C340.379 57.7077 340.538 58.7163 340.538 59.9038V60.8072H330.132V58.8981H338.041C338.041 58.2276 337.904 57.6339 337.632 57.1168C337.359 56.5941 336.975 56.1822 336.481 55.881C335.993 55.5799 335.419 55.4293 334.76 55.4293C334.044 55.4293 333.419 55.6055 332.885 55.9577C332.356 56.3043 331.947 56.7589 331.657 57.3214C331.373 57.8782 331.231 58.4833 331.231 59.1367V60.6282C331.231 61.5032 331.385 62.2475 331.691 62.8612C332.004 63.4748 332.439 63.9435 332.995 64.2674C333.552 64.5856 334.203 64.7447 334.947 64.7447C335.43 64.7447 335.87 64.6765 336.268 64.5401C336.666 64.3981 337.01 64.1879 337.299 63.9094C337.589 63.631 337.811 63.2873 337.964 62.8782L340.376 63.3129C340.183 64.0231 339.836 64.6452 339.336 65.1793C338.842 65.7077 338.22 66.1197 337.47 66.4151C336.726 66.7049 335.876 66.8498 334.922 66.8498Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_65"
                                    d="M325.853 49.1309V66.5854H323.305V49.1309H325.853Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_66"
                                    d="M308.492 71.4947V53.4947H310.981V55.6168H311.194C311.342 55.3441 311.555 55.0288 311.833 54.6708C312.112 54.3129 312.498 54.0004 312.992 53.7333C313.487 53.4606 314.14 53.3242 314.952 53.3242C316.009 53.3242 316.952 53.5913 317.782 54.1254C318.612 54.6594 319.262 55.4293 319.734 56.435C320.211 57.4407 320.45 58.6509 320.45 60.0657C320.45 61.4805 320.214 62.6935 319.742 63.7049C319.271 64.7106 318.623 65.4862 317.799 66.0316C316.975 66.5714 316.035 66.8413 314.978 66.8413C314.183 66.8413 313.532 66.7077 313.026 66.4407C312.526 66.1737 312.134 65.8612 311.85 65.5032C311.566 65.1452 311.347 64.8271 311.194 64.5487H311.04V71.4947H308.492ZM310.989 60.0401C310.989 60.9606 311.123 61.7674 311.39 62.4606C311.657 63.1538 312.043 63.6964 312.549 64.0884C313.055 64.4748 313.674 64.668 314.407 64.668C315.168 64.668 315.805 64.4663 316.316 64.0629C316.827 63.6538 317.214 63.0998 317.475 62.4009C317.742 61.7021 317.876 60.9151 317.876 60.0401C317.876 59.1765 317.745 58.4009 317.484 57.7134C317.228 57.0259 316.842 56.4833 316.325 56.0856C315.813 55.6879 315.174 55.489 314.407 55.489C313.668 55.489 313.043 55.6793 312.532 56.06C312.026 56.4407 311.643 56.9719 311.381 57.6538C311.12 58.3356 310.989 59.131 310.989 60.0401Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_67"
                                    d="M293.68 71.4947V53.4947H296.168V55.6168H296.381C296.529 55.3441 296.742 55.0288 297.021 54.6708C297.299 54.3129 297.685 54.0004 298.18 53.7333C298.674 53.4606 299.327 53.3242 300.14 53.3242C301.197 53.3242 302.14 53.5913 302.969 54.1254C303.799 54.6594 304.45 55.4293 304.921 56.435C305.398 57.4407 305.637 58.6509 305.637 60.0657C305.637 61.4805 305.401 62.6935 304.93 63.7049C304.458 64.7106 303.81 65.4862 302.987 66.0316C302.163 66.5714 301.222 66.8413 300.165 66.8413C299.37 66.8413 298.719 66.7077 298.214 66.4407C297.714 66.1737 297.322 65.8612 297.038 65.5032C296.754 65.1452 296.535 64.8271 296.381 64.5487H296.228V71.4947H293.68ZM296.177 60.0401C296.177 60.9606 296.31 61.7674 296.577 62.4606C296.844 63.1538 297.231 63.6964 297.737 64.0884C298.242 64.4748 298.862 64.668 299.594 64.668C300.356 64.668 300.992 64.4663 301.504 64.0629C302.015 63.6538 302.401 63.0998 302.663 62.4009C302.93 61.7021 303.063 60.9151 303.063 60.0401C303.063 59.1765 302.933 58.4009 302.671 57.7134C302.415 57.0259 302.029 56.4833 301.512 56.0856C301.001 55.6879 300.362 55.489 299.594 55.489C298.856 55.489 298.231 55.6793 297.719 56.06C297.214 56.4407 296.83 56.9719 296.569 57.6538C296.308 58.3356 296.177 59.131 296.177 60.0401Z"
                                    fill="currentColor"
                                />
                                <path
                                    id="Vector_68"
                                    d="M278.553 66.5854H275.758L282.039 49.1309H285.082L291.363 66.5854H288.567L283.633 52.3013H283.496L278.553 66.5854ZM279.022 59.7502H288.09V61.9661H279.022V59.7502Z"
                                    fill="currentColor"
                                />
                            </g>
                        </g>
                        <g id="seven-path" opacity="0.25">
                            <path
                                id="Shape"
                                d="M362.301 361.875C374.161 361.875 383.775 352.261 383.775 340.401V247.225C383.775 235.365 393.39 225.75 405.25 225.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="one-path" opacity="0.25">
                            <path
                                id="Shape_2"
                                d="M362.301 46.875H376.775C390.03 46.875 400.775 57.6202 400.775 70.875V111.75C400.775 125.004 411.521 135.75 424.775 135.75H439.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="six-path" opacity="0.25">
                            <path
                                id="Shape_3"
                                d="M156.301 309.276H344C357.255 309.276 368 298.531 368 285.276V234.75C368 221.495 378.745 210.75 392 210.75H401.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="four-path" opacity="0.25">
                            <path
                                id="Shape_4"
                                d="M139.301 204.375H326.187C332.711 204.375 338 199.087 338 192.563C338 186.039 343.289 180.75 349.813 180.75H411.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="three-path" opacity="0.25">
                            <path
                                id="Shape_5"
                                d="M312.301 151.875H357.063C360.894 151.875 364 154.981 364 158.812C364 162.644 367.106 165.75 370.937 165.75H431.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="five-path" opacity="0.25">
                            <path
                                id="Shape_6"
                                d="M312.301 256.875H326C339.255 256.875 350 246.13 350 232.875V219.75C350 206.495 360.745 195.75 374 195.75H402.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="two-path" opacity="0.25">
                            <path
                                id="Shape_7"
                                d="M158.301 99.2759H183.896C183.903 99.2759 183.909 99.2701 183.909 99.2629C183.909 99.2558 183.914 99.25 183.922 99.25H353C366.255 99.25 377 109.995 377 123.25V126.75C377 140.005 387.745 150.75 401 150.75H432.25"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="Group 1580">
                            <path
                                id="d-app"
                                opacity="0.25"
                                d="M977.369 102.201V138.929C977.369 141.176 976.508 143.332 974.976 144.922C973.443 146.511 971.365 147.404 969.198 147.404H920.171C918.004 147.404 915.926 146.511 914.393 144.922C912.861 143.332 912 141.176 912 138.929V102.201M977.369 102.201V93.7256C977.369 91.4777 976.508 89.3219 974.976 87.7324C973.443 86.143 971.365 85.25 969.198 85.25H920.171C918.004 85.25 915.926 86.143 914.393 87.7324C912.861 89.3219 912 91.4777 912 93.7256V102.201M977.369 102.201H912"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="d-app-4"
                                opacity="0.25"
                                d="M948.415 110.367C948.415 111.06 948.135 111.725 947.636 112.215C947.138 112.705 946.462 112.98 945.756 112.98C945.051 112.98 944.375 112.705 943.876 112.215C943.378 111.725 943.098 111.06 943.098 110.367C943.098 109.674 943.378 109.009 943.876 108.519C944.375 108.029 945.051 107.754 945.756 107.754C946.462 107.754 947.138 108.029 947.636 108.519C948.135 109.009 948.415 109.674 948.415 110.367ZM940.439 120.204C940.462 118.833 941.032 117.526 942.027 116.564C943.022 115.603 944.361 115.064 945.756 115.064C947.152 115.064 948.491 115.603 949.486 116.564C950.48 117.526 951.051 118.833 951.073 120.204C949.405 120.956 947.591 121.344 945.756 121.342C943.859 121.342 942.058 120.935 940.439 120.204Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="d-app-3"
                                opacity="0.25"
                                d="M948.415 131.633C948.415 132.326 948.135 132.99 947.636 133.48C947.138 133.97 946.462 134.246 945.756 134.246C945.051 134.246 944.375 133.97 943.876 133.48C943.378 132.99 943.098 132.326 943.098 131.633C943.098 130.94 943.378 130.275 943.876 129.785C944.375 129.295 945.051 129.02 945.756 129.02C946.462 129.02 947.138 129.295 947.636 129.785C948.135 130.275 948.415 130.94 948.415 131.633ZM940.439 141.47C940.462 140.099 941.032 138.792 942.027 137.83C943.022 136.868 944.361 136.329 945.756 136.329C947.152 136.329 948.491 136.868 949.486 137.83C950.48 138.792 951.051 140.099 951.073 141.47C949.405 142.222 947.591 142.61 945.756 142.607C943.859 142.607 942.058 142.2 940.439 141.47Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="d-app-2"
                                opacity="0.25"
                                d="M966.138 121.592C966.138 122.285 965.858 122.949 965.359 123.439C964.861 123.929 964.184 124.205 963.479 124.205C962.774 124.205 962.098 123.929 961.599 123.439C961.1 122.949 960.82 122.285 960.82 121.592C960.82 120.899 961.1 120.234 961.599 119.744C962.098 119.254 962.774 118.979 963.479 118.979C964.184 118.979 964.861 119.254 965.359 119.744C965.858 120.234 966.138 120.899 966.138 121.592ZM958.162 131.429C958.185 130.058 958.755 128.751 959.75 127.789C960.744 126.827 962.084 126.288 963.479 126.288C964.874 126.288 966.214 126.827 967.208 127.789C968.203 128.751 968.773 130.058 968.796 131.429C967.128 132.181 965.314 132.569 963.479 132.566C961.582 132.566 959.781 132.159 958.162 131.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="d-app-1"
                                opacity="0.25"
                                d="M930.695 121.592C930.695 122.285 930.414 122.949 929.916 123.439C929.417 123.929 928.741 124.205 928.036 124.205C927.331 124.205 926.654 123.929 926.156 123.439C925.657 122.949 925.377 122.285 925.377 121.592C925.377 120.899 925.657 120.234 926.156 119.744C926.654 119.254 927.331 118.979 928.036 118.979C928.741 118.979 929.417 119.254 929.916 119.744C930.414 120.234 930.695 120.899 930.695 121.592ZM922.719 131.429C922.742 130.058 923.312 128.751 924.306 127.789C925.301 126.827 926.64 126.288 928.036 126.288C929.431 126.288 930.77 126.827 931.765 127.789C932.76 128.751 933.33 130.058 933.353 131.429C931.685 132.181 929.871 132.569 928.036 132.566C926.138 132.566 924.337 132.159 922.719 131.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1606">
                            <path
                                id="i-app"
                                opacity="0.25"
                                d="M997.369 300.137V336.864C997.369 339.112 996.508 341.268 994.976 342.857C993.443 344.447 991.365 345.34 989.198 345.34H940.171C938.004 345.34 935.926 344.447 934.393 342.857C932.861 341.268 932 339.112 932 336.864V300.137M997.369 300.137V291.661C997.369 289.413 996.508 287.257 994.976 285.668C993.443 284.079 991.365 283.186 989.198 283.186H940.171C938.004 283.186 935.926 284.079 934.393 285.668C932.861 287.257 932 289.413 932 291.661V300.137M997.369 300.137H932"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="i-app-4"
                                opacity="0.25"
                                d="M968.415 308.304C968.415 308.997 968.135 309.662 967.636 310.152C967.138 310.642 966.462 310.917 965.756 310.917C965.051 310.917 964.375 310.642 963.876 310.152C963.378 309.662 963.098 308.997 963.098 308.304C963.098 307.611 963.378 306.947 963.876 306.457C964.375 305.967 965.051 305.691 965.756 305.691C966.462 305.691 967.138 305.967 967.636 306.457C968.135 306.947 968.415 307.611 968.415 308.304ZM960.439 318.142C960.462 316.771 961.032 315.464 962.027 314.502C963.022 313.54 964.361 313.001 965.756 313.001C967.152 313.001 968.491 313.54 969.486 314.502C970.48 315.464 971.051 316.771 971.073 318.142C969.405 318.894 967.591 319.282 965.756 319.279C963.859 319.279 962.058 318.872 960.439 318.142Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="i-app-3"
                                opacity="0.25"
                                d="M968.415 329.568C968.415 330.261 968.135 330.926 967.636 331.416C967.138 331.906 966.462 332.181 965.756 332.181C965.051 332.181 964.375 331.906 963.876 331.416C963.378 330.926 963.098 330.261 963.098 329.568C963.098 328.875 963.378 328.21 963.876 327.72C964.375 327.23 965.051 326.955 965.756 326.955C966.462 326.955 967.138 327.23 967.636 327.72C968.135 328.21 968.415 328.875 968.415 329.568ZM960.439 339.406C960.462 338.035 961.032 336.727 962.027 335.766C963.022 334.804 964.361 334.265 965.756 334.265C967.152 334.265 968.491 334.804 969.486 335.766C970.48 336.727 971.051 338.035 971.073 339.406C969.405 340.157 967.591 340.545 965.756 340.543C963.859 340.543 962.058 340.136 960.439 339.406Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="i-app-2"
                                opacity="0.25"
                                d="M986.138 319.529C986.138 320.222 985.858 320.887 985.359 321.377C984.861 321.867 984.184 322.142 983.479 322.142C982.774 322.142 982.098 321.867 981.599 321.377C981.1 320.887 980.82 320.222 980.82 319.529C980.82 318.836 981.1 318.171 981.599 317.681C982.098 317.191 982.774 316.916 983.479 316.916C984.184 316.916 984.861 317.191 985.359 317.681C985.858 318.171 986.138 318.836 986.138 319.529ZM978.162 329.367C978.185 327.996 978.755 326.688 979.75 325.726C980.744 324.765 982.084 324.226 983.479 324.226C984.874 324.226 986.214 324.765 987.208 325.726C988.203 326.688 988.773 327.996 988.796 329.367C987.128 330.118 985.314 330.506 983.479 330.504C981.582 330.504 979.781 330.097 978.162 329.367Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="i-app-1"
                                opacity="0.25"
                                d="M950.693 319.529C950.693 320.222 950.412 320.887 949.914 321.377C949.415 321.867 948.739 322.142 948.034 322.142C947.329 322.142 946.652 321.867 946.154 321.377C945.655 320.887 945.375 320.222 945.375 319.529C945.375 318.836 945.655 318.171 946.154 317.681C946.652 317.191 947.329 316.916 948.034 316.916C948.739 316.916 949.415 317.191 949.914 317.681C950.412 318.171 950.693 318.836 950.693 319.529ZM942.717 329.367C942.74 327.996 943.31 326.688 944.304 325.726C945.299 324.765 946.638 324.226 948.034 324.226C949.429 324.226 950.768 324.765 951.763 325.726C952.758 326.688 953.328 327.996 953.351 329.367C951.683 330.118 949.869 330.506 948.034 330.504C946.136 330.504 944.335 330.097 942.717 329.367Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1573">
                            <path
                                id="a-app"
                                opacity="0.25"
                                d="M715.369 18.2011V54.9286C715.369 57.1765 714.508 59.3323 712.976 60.9217C711.443 62.5112 709.365 63.4042 707.198 63.4042H658.171C656.004 63.4042 653.926 62.5112 652.393 60.9217C650.861 59.3323 650 57.1765 650 54.9286V18.2011M715.369 18.2011V9.72557C715.369 7.47771 714.508 5.32192 712.976 3.73244C711.443 2.14296 709.365 1.25 707.198 1.25H658.171C656.004 1.25 653.926 2.14296 652.393 3.73244C650.861 5.32192 650 7.47771 650 9.72557V18.2011M715.369 18.2011H650"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="a-app-4"
                                opacity="0.25"
                                d="M686.413 26.3669C686.413 27.06 686.133 27.7246 685.635 28.2146C685.136 28.7047 684.46 28.98 683.754 28.98C683.049 28.98 682.373 28.7047 681.874 28.2146C681.376 27.7246 681.096 27.06 681.096 26.3669C681.096 25.6739 681.376 25.0093 681.874 24.5192C682.373 24.0292 683.049 23.7539 683.754 23.7539C684.46 23.7539 685.136 24.0292 685.635 24.5192C686.133 25.0093 686.413 25.6739 686.413 26.3669ZM678.438 36.2045C678.46 34.8334 679.03 33.5261 680.025 32.5644C681.02 31.6027 682.359 31.0638 683.754 31.0638C685.15 31.0638 686.489 31.6027 687.484 32.5644C688.478 33.5261 689.049 34.8334 689.071 36.2045C687.403 36.9562 685.59 37.3441 683.754 37.3417C681.857 37.3417 680.056 36.9347 678.438 36.2045Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="a-app-3"
                                opacity="0.25"
                                d="M686.413 47.6326C686.413 48.3256 686.133 48.9902 685.635 49.4803C685.136 49.9703 684.46 50.2456 683.754 50.2456C683.049 50.2456 682.373 49.9703 681.874 49.4803C681.376 48.9902 681.096 48.3256 681.096 47.6326C681.096 46.9395 681.376 46.2749 681.874 45.7849C682.373 45.2948 683.049 45.0195 683.754 45.0195C684.46 45.0195 685.136 45.2948 685.635 45.7849C686.133 46.2749 686.413 46.9395 686.413 47.6326ZM678.438 57.4701C678.46 56.099 679.03 54.7917 680.025 53.83C681.02 52.8683 682.359 52.3294 683.754 52.3294C685.15 52.3294 686.489 52.8683 687.484 53.83C688.478 54.7917 689.049 56.099 689.071 57.4701C687.403 58.2218 685.59 58.6097 683.754 58.6073C681.857 58.6073 680.056 58.2004 678.438 57.4701Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="a-app-2"
                                opacity="0.25"
                                d="M704.138 37.5915C704.138 38.2846 703.858 38.9492 703.359 39.4392C702.861 39.9293 702.184 40.2046 701.479 40.2046C700.774 40.2046 700.098 39.9293 699.599 39.4392C699.1 38.9492 698.82 38.2846 698.82 37.5915C698.82 36.8985 699.1 36.2339 699.599 35.7439C700.098 35.2538 700.774 34.9785 701.479 34.9785C702.184 34.9785 702.861 35.2538 703.359 35.7439C703.858 36.2339 704.138 36.8985 704.138 37.5915ZM696.162 47.4291C696.185 46.058 696.755 44.7507 697.75 43.789C698.744 42.8273 700.084 42.2884 701.479 42.2884C702.874 42.2884 704.214 42.8273 705.208 43.789C706.203 44.7507 706.773 46.058 706.796 47.4291C705.128 48.1808 703.314 48.5687 701.479 48.5663C699.582 48.5663 697.781 48.1593 696.162 47.4291Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="a-app-1"
                                opacity="0.25"
                                d="M668.691 37.5915C668.691 38.2846 668.411 38.9492 667.912 39.4392C667.413 39.9293 666.737 40.2046 666.032 40.2046C665.327 40.2046 664.65 39.9293 664.152 39.4392C663.653 38.9492 663.373 38.2846 663.373 37.5915C663.373 36.8985 663.653 36.2339 664.152 35.7439C664.65 35.2538 665.327 34.9785 666.032 34.9785C666.737 34.9785 667.413 35.2538 667.912 35.7439C668.411 36.2339 668.691 36.8985 668.691 37.5915ZM660.715 47.4291C660.738 46.058 661.308 44.7507 662.302 43.789C663.297 42.8273 664.637 42.2884 666.032 42.2884C667.427 42.2884 668.766 42.8273 669.761 43.789C670.756 44.7507 671.326 46.058 671.349 47.4291C669.681 48.1808 667.867 48.5687 666.032 48.5663C664.134 48.5663 662.334 48.1593 660.715 47.4291Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="a-path" opacity="0.25">
                            <path
                                id="Shape_8"
                                d="M646.25 32.3262H616.5C603.245 32.3262 592.5 43.0713 592.5 56.3262V111.749C592.5 125.004 581.755 135.749 568.5 135.749H538.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="Group 1574">
                            <path
                                id="h-app"
                                opacity="0.25"
                                d="M777.369 277.201V313.929C777.369 316.176 776.508 318.332 774.976 319.922C773.443 321.511 771.365 322.404 769.198 322.404H720.171C718.004 322.404 715.926 321.511 714.393 319.922C712.861 318.332 712 316.176 712 313.929V277.201M777.369 277.201V268.726C777.369 266.478 776.508 264.322 774.976 262.732C773.443 261.143 771.365 260.25 769.198 260.25H720.171C718.004 260.25 715.926 261.143 714.393 262.732C712.861 264.322 712 266.478 712 268.726V277.201M777.369 277.201H712"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="h-app-4"
                                opacity="0.25"
                                d="M748.415 285.367C748.415 286.06 748.135 286.725 747.636 287.215C747.138 287.705 746.462 287.98 745.756 287.98C745.051 287.98 744.375 287.705 743.876 287.215C743.378 286.725 743.098 286.06 743.098 285.367C743.098 284.674 743.378 284.009 743.876 283.519C744.375 283.029 745.051 282.754 745.756 282.754C746.462 282.754 747.138 283.029 747.636 283.519C748.135 284.009 748.415 284.674 748.415 285.367ZM740.439 295.204C740.462 293.833 741.032 292.526 742.027 291.564C743.022 290.603 744.361 290.064 745.756 290.064C747.152 290.064 748.491 290.603 749.486 291.564C750.48 292.526 751.051 293.833 751.073 295.204C749.405 295.956 747.591 296.344 745.756 296.342C743.859 296.342 742.058 295.935 740.439 295.204Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="h-app-3"
                                opacity="0.25"
                                d="M748.415 306.635C748.415 307.328 748.135 307.992 747.636 308.482C747.138 308.972 746.462 309.248 745.756 309.248C745.051 309.248 744.375 308.972 743.876 308.482C743.378 307.992 743.098 307.328 743.098 306.635C743.098 305.941 743.378 305.277 743.876 304.787C744.375 304.297 745.051 304.021 745.756 304.021C746.462 304.021 747.138 304.297 747.636 304.787C748.135 305.277 748.415 305.941 748.415 306.635ZM740.439 316.472C740.462 315.101 741.032 313.794 742.027 312.832C743.022 311.87 744.361 311.331 745.756 311.331C747.152 311.331 748.491 311.87 749.486 312.832C750.48 313.794 751.051 315.101 751.073 316.472C749.405 317.224 747.591 317.612 745.756 317.609C743.859 317.609 742.058 317.202 740.439 316.472Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="h-app-2"
                                opacity="0.25"
                                d="M766.138 296.592C766.138 297.285 765.858 297.949 765.359 298.439C764.861 298.929 764.184 299.205 763.479 299.205C762.774 299.205 762.098 298.929 761.599 298.439C761.1 297.949 760.82 297.285 760.82 296.592C760.82 295.899 761.1 295.234 761.599 294.744C762.098 294.254 762.774 293.979 763.479 293.979C764.184 293.979 764.861 294.254 765.359 294.744C765.858 295.234 766.138 295.899 766.138 296.592ZM758.162 306.429C758.185 305.058 758.755 303.751 759.75 302.789C760.744 301.827 762.084 301.288 763.479 301.288C764.874 301.288 766.214 301.827 767.208 302.789C768.203 303.751 768.773 305.058 768.796 306.429C767.128 307.181 765.314 307.569 763.479 307.566C761.582 307.566 759.781 307.159 758.162 306.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="h-app-1"
                                opacity="0.25"
                                d="M730.693 296.592C730.693 297.285 730.412 297.949 729.914 298.439C729.415 298.929 728.739 299.205 728.034 299.205C727.329 299.205 726.652 298.929 726.154 298.439C725.655 297.949 725.375 297.285 725.375 296.592C725.375 295.899 725.655 295.234 726.154 294.744C726.652 294.254 727.329 293.979 728.034 293.979C728.739 293.979 729.415 294.254 729.914 294.744C730.412 295.234 730.693 295.899 730.693 296.592ZM722.717 306.429C722.74 305.058 723.31 303.751 724.304 302.789C725.299 301.827 726.638 301.288 728.034 301.288C729.429 301.288 730.768 301.827 731.763 302.789C732.758 303.751 733.328 305.058 733.351 306.429C731.683 307.181 729.869 307.569 728.034 307.566C726.136 307.566 724.335 307.159 722.717 306.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1575">
                            <path
                                id="f-app"
                                opacity="0.25"
                                d="M800.369 199.201V235.929C800.369 238.176 799.508 240.332 797.976 241.922C796.443 243.511 794.365 244.404 792.198 244.404H743.171C741.004 244.404 738.926 243.511 737.393 241.922C735.861 240.332 735 238.176 735 235.929V199.201M800.369 199.201V190.726C800.369 188.478 799.508 186.322 797.976 184.732C796.443 183.143 794.365 182.25 792.198 182.25H743.171C741.004 182.25 738.926 183.143 737.393 184.732C735.861 186.322 735 188.478 735 190.726V199.201M800.369 199.201H735"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="f-app-4"
                                opacity="0.25"
                                d="M771.411 207.367C771.411 208.06 771.131 208.725 770.633 209.215C770.134 209.705 769.458 209.98 768.753 209.98C768.047 209.98 767.371 209.705 766.872 209.215C766.374 208.725 766.094 208.06 766.094 207.367C766.094 206.674 766.374 206.009 766.872 205.519C767.371 205.029 768.047 204.754 768.753 204.754C769.458 204.754 770.134 205.029 770.633 205.519C771.131 206.009 771.411 206.674 771.411 207.367ZM763.436 217.204C763.458 215.833 764.029 214.526 765.023 213.564C766.018 212.603 767.357 212.064 768.753 212.064C770.148 212.064 771.487 212.603 772.482 213.564C773.476 214.526 774.047 215.833 774.069 217.204C772.401 217.956 770.588 218.344 768.753 218.342C766.855 218.342 765.054 217.935 763.436 217.204Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="f-app-3"
                                opacity="0.25"
                                d="M771.411 228.633C771.411 229.326 771.131 229.99 770.633 230.48C770.134 230.97 769.458 231.246 768.753 231.246C768.047 231.246 767.371 230.97 766.872 230.48C766.374 229.99 766.094 229.326 766.094 228.633C766.094 227.94 766.374 227.275 766.872 226.785C767.371 226.295 768.047 226.02 768.753 226.02C769.458 226.02 770.134 226.295 770.633 226.785C771.131 227.275 771.411 227.94 771.411 228.633ZM763.436 238.47C763.458 237.099 764.029 235.792 765.023 234.83C766.018 233.868 767.357 233.329 768.753 233.329C770.148 233.329 771.487 233.868 772.482 234.83C773.476 235.792 774.047 237.099 774.069 238.47C772.401 239.222 770.588 239.61 768.753 239.607C766.855 239.607 765.054 239.2 763.436 238.47Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="f-app-2"
                                opacity="0.25"
                                d="M789.138 218.592C789.138 219.285 788.858 219.949 788.359 220.439C787.861 220.929 787.184 221.205 786.479 221.205C785.774 221.205 785.098 220.929 784.599 220.439C784.1 219.949 783.82 219.285 783.82 218.592C783.82 217.899 784.1 217.234 784.599 216.744C785.098 216.254 785.774 215.979 786.479 215.979C787.184 215.979 787.861 216.254 788.359 216.744C788.858 217.234 789.138 217.899 789.138 218.592ZM781.162 228.429C781.185 227.058 781.755 225.751 782.75 224.789C783.744 223.827 785.084 223.288 786.479 223.288C787.874 223.288 789.214 223.827 790.208 224.789C791.203 225.751 791.773 227.058 791.796 228.429C790.128 229.181 788.314 229.569 786.479 229.566C784.582 229.566 782.781 229.159 781.162 228.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="f-app-1"
                                opacity="0.25"
                                d="M753.693 218.592C753.693 219.285 753.412 219.949 752.914 220.439C752.415 220.929 751.739 221.205 751.034 221.205C750.329 221.205 749.652 220.929 749.154 220.439C748.655 219.949 748.375 219.285 748.375 218.592C748.375 217.899 748.655 217.234 749.154 216.744C749.652 216.254 750.329 215.979 751.034 215.979C751.739 215.979 752.415 216.254 752.914 216.744C753.412 217.234 753.693 217.899 753.693 218.592ZM745.717 228.429C745.74 227.058 746.31 225.751 747.304 224.789C748.299 223.827 749.638 223.288 751.034 223.288C752.429 223.288 753.768 223.827 754.763 224.789C755.758 225.751 756.328 227.058 756.351 228.429C754.683 229.181 752.869 229.569 751.034 229.566C749.136 229.566 747.335 229.159 745.717 228.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1578">
                            <path
                                id="k-app"
                                opacity="0.25"
                                d="M715.369 362.201V398.929C715.369 401.176 714.508 403.332 712.976 404.922C711.443 406.511 709.365 407.404 707.198 407.404H658.171C656.004 407.404 653.926 406.511 652.393 404.922C650.861 403.332 650 401.176 650 398.929V362.201M715.369 362.201V353.726C715.369 351.478 714.508 349.322 712.976 347.732C711.443 346.143 709.365 345.25 707.198 345.25H658.171C656.004 345.25 653.926 346.143 652.393 347.732C650.861 349.322 650 351.478 650 353.726V362.201M715.369 362.201H650"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="k-app-4"
                                opacity="0.25"
                                d="M686.411 370.367C686.411 371.06 686.131 371.725 685.633 372.215C685.134 372.705 684.458 372.98 683.753 372.98C683.047 372.98 682.371 372.705 681.872 372.215C681.374 371.725 681.094 371.06 681.094 370.367C681.094 369.674 681.374 369.009 681.872 368.519C682.371 368.029 683.047 367.754 683.753 367.754C684.458 367.754 685.134 368.029 685.633 368.519C686.131 369.009 686.411 369.674 686.411 370.367ZM678.436 380.204C678.458 378.833 679.029 377.526 680.023 376.564C681.018 375.603 682.357 375.064 683.753 375.064C685.148 375.064 686.487 375.603 687.482 376.564C688.476 377.526 689.047 378.833 689.069 380.204C687.401 380.956 685.588 381.344 683.753 381.342C681.855 381.342 680.054 380.935 678.436 380.204Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="k-app-3"
                                opacity="0.25"
                                d="M686.411 391.633C686.411 392.326 686.131 392.99 685.633 393.48C685.134 393.97 684.458 394.246 683.753 394.246C683.047 394.246 682.371 393.97 681.872 393.48C681.374 392.99 681.094 392.326 681.094 391.633C681.094 390.94 681.374 390.275 681.872 389.785C682.371 389.295 683.047 389.02 683.753 389.02C684.458 389.02 685.134 389.295 685.633 389.785C686.131 390.275 686.411 390.94 686.411 391.633ZM678.436 401.47C678.458 400.099 679.029 398.792 680.023 397.83C681.018 396.868 682.357 396.329 683.753 396.329C685.148 396.329 686.487 396.868 687.482 397.83C688.476 398.792 689.047 400.099 689.069 401.47C687.401 402.222 685.588 402.61 683.753 402.607C681.855 402.607 680.054 402.2 678.436 401.47Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="k-app-2"
                                opacity="0.25"
                                d="M704.136 381.592C704.136 382.285 703.856 382.949 703.357 383.439C702.859 383.929 702.182 384.205 701.477 384.205C700.772 384.205 700.096 383.929 699.597 383.439C699.098 382.949 698.818 382.285 698.818 381.592C698.818 380.899 699.098 380.234 699.597 379.744C700.096 379.254 700.772 378.979 701.477 378.979C702.182 378.979 702.859 379.254 703.357 379.744C703.856 380.234 704.136 380.899 704.136 381.592ZM696.16 391.429C696.183 390.058 696.753 388.751 697.748 387.789C698.742 386.827 700.082 386.288 701.477 386.288C702.872 386.288 704.212 386.827 705.206 387.789C706.201 388.751 706.771 390.058 706.794 391.429C705.126 392.181 703.312 392.569 701.477 392.566C699.58 392.566 697.779 392.159 696.16 391.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="k-app-1"
                                opacity="0.25"
                                d="M668.689 381.592C668.689 382.285 668.409 382.949 667.91 383.439C667.411 383.929 666.735 384.205 666.03 384.205C665.325 384.205 664.648 383.929 664.15 383.439C663.651 382.949 663.371 382.285 663.371 381.592C663.371 380.899 663.651 380.234 664.15 379.744C664.648 379.254 665.325 378.979 666.03 378.979C666.735 378.979 667.411 379.254 667.91 379.744C668.409 380.234 668.689 380.899 668.689 381.592ZM660.713 391.429C660.736 390.058 661.306 388.751 662.301 387.789C663.295 386.827 664.635 386.288 666.03 386.288C667.425 386.288 668.765 386.827 669.759 387.789C670.754 388.751 671.324 390.058 671.347 391.429C669.679 392.181 667.865 392.569 666.03 392.566C664.133 392.566 662.332 392.159 660.713 391.429Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1576">
                            <path
                                id="c-app"
                                opacity="0.25"
                                d="M749.369 105.201V141.929C749.369 144.176 748.508 146.332 746.976 147.922C745.443 149.511 743.365 150.404 741.198 150.404H692.171C690.004 150.404 687.926 149.511 686.393 147.922C684.861 146.332 684 144.176 684 141.929V105.201M749.369 105.201V96.7256C749.369 94.4777 748.508 92.3219 746.976 90.7324C745.443 89.143 743.365 88.25 741.198 88.25H692.171C690.004 88.25 687.926 89.143 686.393 90.7324C684.861 92.3219 684 94.4777 684 96.7256V105.201M749.369 105.201H684"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="c-app-4"
                                opacity="0.25"
                                d="M720.415 113.371C720.415 114.064 720.135 114.728 719.636 115.219C719.138 115.709 718.462 115.984 717.756 115.984C717.051 115.984 716.375 115.709 715.876 115.219C715.378 114.728 715.098 114.064 715.098 113.371C715.098 112.678 715.378 112.013 715.876 111.523C716.375 111.033 717.051 110.758 717.756 110.758C718.462 110.758 719.138 111.033 719.636 111.523C720.135 112.013 720.415 112.678 720.415 113.371ZM712.439 123.208C712.462 121.837 713.032 120.53 714.027 119.568C715.022 118.607 716.361 118.068 717.756 118.068C719.152 118.068 720.491 118.607 721.486 119.568C722.48 120.53 723.051 121.837 723.073 123.208C721.405 123.96 719.591 124.348 717.756 124.346C715.859 124.346 714.058 123.939 712.439 123.208Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="c-app-3"
                                opacity="0.25"
                                d="M720.415 134.635C720.415 135.328 720.135 135.992 719.636 136.482C719.138 136.972 718.462 137.248 717.756 137.248C717.051 137.248 716.375 136.972 715.876 136.482C715.378 135.992 715.098 135.328 715.098 134.635C715.098 133.941 715.378 133.277 715.876 132.787C716.375 132.297 717.051 132.021 717.756 132.021C718.462 132.021 719.138 132.297 719.636 132.787C720.135 133.277 720.415 133.941 720.415 134.635ZM712.439 144.472C712.462 143.101 713.032 141.794 714.027 140.832C715.022 139.87 716.361 139.331 717.756 139.331C719.152 139.331 720.491 139.87 721.486 140.832C722.48 141.794 723.051 143.101 723.073 144.472C721.405 145.224 719.591 145.612 717.756 145.609C715.859 145.609 714.058 145.202 712.439 144.472Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="c-app-2"
                                opacity="0.25"
                                d="M738.138 124.594C738.138 125.287 737.858 125.951 737.359 126.441C736.861 126.931 736.184 127.207 735.479 127.207C734.774 127.207 734.098 126.931 733.599 126.441C733.1 125.951 732.82 125.287 732.82 124.594C732.82 123.9 733.1 123.236 733.599 122.746C734.098 122.256 734.774 121.98 735.479 121.98C736.184 121.98 736.861 122.256 737.359 122.746C737.858 123.236 738.138 123.9 738.138 124.594ZM730.162 134.431C730.185 133.06 730.755 131.753 731.75 130.791C732.744 129.829 734.084 129.29 735.479 129.29C736.874 129.29 738.214 129.829 739.208 130.791C740.203 131.753 740.773 133.06 740.796 134.431C739.128 135.183 737.314 135.571 735.479 135.568C733.582 135.568 731.781 135.161 730.162 134.431Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="c-app-1"
                                opacity="0.25"
                                d="M702.693 124.594C702.693 125.287 702.412 125.951 701.914 126.441C701.415 126.931 700.739 127.207 700.034 127.207C699.329 127.207 698.652 126.931 698.154 126.441C697.655 125.951 697.375 125.287 697.375 124.594C697.375 123.9 697.655 123.236 698.154 122.746C698.652 122.256 699.329 121.98 700.034 121.98C700.739 121.98 701.415 122.256 701.914 122.746C702.412 123.236 702.693 123.9 702.693 124.594ZM694.717 134.431C694.74 133.06 695.31 131.753 696.304 130.791C697.299 129.829 698.638 129.29 700.034 129.29C701.429 129.29 702.768 129.829 703.763 130.791C704.758 131.753 705.328 133.06 705.351 134.431C703.683 135.183 701.869 135.571 700.034 135.568C698.136 135.568 696.335 135.161 694.717 134.431Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1577">
                            <path
                                id="b-app"
                                opacity="0.25"
                                d="M833.369 61.2011V97.9286C833.369 100.176 832.508 102.332 830.976 103.922C829.443 105.511 827.365 106.404 825.198 106.404H776.171C774.004 106.404 771.926 105.511 770.393 103.922C768.861 102.332 768 100.176 768 97.9286V61.2011M833.369 61.2011V52.7256C833.369 50.4777 832.508 48.3219 830.976 46.7324C829.443 45.143 827.365 44.25 825.198 44.25H776.171C774.004 44.25 771.926 45.143 770.393 46.7324C768.861 48.3219 768 50.4777 768 52.7256V61.2011M833.369 61.2011H768"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="b-app-4"
                                opacity="0.25"
                                d="M804.413 69.3689C804.413 70.0619 804.133 70.7265 803.635 71.2166C803.136 71.7066 802.46 71.9819 801.754 71.9819C801.049 71.9819 800.373 71.7066 799.874 71.2166C799.376 70.7265 799.096 70.0619 799.096 69.3689C799.096 68.6759 799.376 68.0112 799.874 67.5212C800.373 67.0312 801.049 66.7559 801.754 66.7559C802.46 66.7559 803.136 67.0312 803.635 67.5212C804.133 68.0112 804.413 68.6759 804.413 69.3689ZM796.438 79.2064C796.46 77.8354 797.03 76.528 798.025 75.5663C799.02 74.6047 800.359 74.0657 801.754 74.0657C803.15 74.0657 804.489 74.6047 805.484 75.5663C806.478 76.528 807.049 77.8354 807.071 79.2064C805.403 79.9581 803.59 80.3461 801.754 80.3436C799.857 80.3436 798.056 79.9367 796.438 79.2064Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="b-app-3"
                                opacity="0.25"
                                d="M804.413 90.6326C804.413 91.3256 804.133 91.9902 803.635 92.4803C803.136 92.9703 802.46 93.2456 801.754 93.2456C801.049 93.2456 800.373 92.9703 799.874 92.4803C799.376 91.9902 799.096 91.3256 799.096 90.6326C799.096 89.9395 799.376 89.2749 799.874 88.7849C800.373 88.2948 801.049 88.0195 801.754 88.0195C802.46 88.0195 803.136 88.2948 803.635 88.7849C804.133 89.2749 804.413 89.9395 804.413 90.6326ZM796.438 100.47C796.46 99.099 797.03 97.7917 798.025 96.83C799.02 95.8683 800.359 95.3294 801.754 95.3294C803.15 95.3294 804.489 95.8683 805.484 96.83C806.478 97.7917 807.049 99.099 807.071 100.47C805.403 101.222 803.59 101.61 801.754 101.607C799.857 101.607 798.056 101.2 796.438 100.47Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="b-app-2"
                                opacity="0.25"
                                d="M822.138 80.5935C822.138 81.2865 821.858 81.9512 821.359 82.4412C820.861 82.9312 820.184 83.2065 819.479 83.2065C818.774 83.2065 818.098 82.9312 817.599 82.4412C817.1 81.9512 816.82 81.2865 816.82 80.5935C816.82 79.9005 817.1 79.2358 817.599 78.7458C818.098 78.2558 818.774 77.9805 819.479 77.9805C820.184 77.9805 820.861 78.2558 821.359 78.7458C821.858 79.2358 822.138 79.9005 822.138 80.5935ZM814.162 90.431C814.185 89.06 814.755 87.7526 815.75 86.7909C816.744 85.8293 818.084 85.2903 819.479 85.2903C820.874 85.2903 822.214 85.8293 823.208 86.7909C824.203 87.7526 824.773 89.06 824.796 90.431C823.128 91.1827 821.314 91.5707 819.479 91.5682C817.582 91.5682 815.781 91.1613 814.162 90.431Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="b-app-1"
                                opacity="0.25"
                                d="M786.693 80.5935C786.693 81.2865 786.412 81.9512 785.914 82.4412C785.415 82.9312 784.739 83.2065 784.034 83.2065C783.329 83.2065 782.652 82.9312 782.154 82.4412C781.655 81.9512 781.375 81.2865 781.375 80.5935C781.375 79.9005 781.655 79.2358 782.154 78.7458C782.652 78.2558 783.329 77.9805 784.034 77.9805C784.739 77.9805 785.415 78.2558 785.914 78.7458C786.412 79.2358 786.693 79.9005 786.693 80.5935ZM778.717 90.431C778.74 89.06 779.31 87.7526 780.304 86.7909C781.299 85.8293 782.638 85.2903 784.034 85.2903C785.429 85.2903 786.768 85.8293 787.763 86.7909C788.758 87.7526 789.328 89.06 789.351 90.431C787.683 91.1827 785.869 91.5707 784.034 91.5682C782.136 91.5682 780.335 91.1613 778.717 90.431Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="b-path" opacity="0.25">
                            <path
                                id="Shape_9"
                                d="M764.25 75.3262H666C652.745 75.3262 642 86.0713 642 99.3262V120.749C642 134.004 631.255 144.749 618 144.749H554.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="c-path" opacity="0.25">
                            <path
                                id="Shape_10"
                                d="M680.25 119.326H672.211C662.706 119.326 655 127.032 655 136.538C655 146.043 647.294 153.749 637.789 153.749H573.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="Group 1581">
                            <path
                                id="j-app"
                                opacity="0.25"
                                d="M875.369 354.201V390.929C875.369 393.176 874.495 395.332 872.939 396.922C871.383 398.511 869.273 399.404 867.073 399.404H817.296C815.096 399.404 812.986 398.511 811.43 396.922C809.874 395.332 809 393.176 809 390.929V354.201M875.369 354.201V345.726C875.369 343.478 874.495 341.322 872.939 339.732C871.383 338.143 869.273 337.25 867.073 337.25H817.296C815.096 337.25 812.986 338.143 811.43 339.732C809.874 341.322 809 343.478 809 345.726V354.201M875.369 354.201H809"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="j-app-4"
                                opacity="0.25"
                                d="M845.971 362.365C845.971 363.058 845.686 363.723 845.18 364.213C844.674 364.703 843.987 364.978 843.271 364.978C842.555 364.978 841.869 364.703 841.363 364.213C840.856 363.723 840.572 363.058 840.572 362.365C840.572 361.672 840.856 361.007 841.363 360.517C841.869 360.027 842.555 359.752 843.271 359.752C843.987 359.752 844.674 360.027 845.18 360.517C845.686 361.007 845.971 361.672 845.971 362.365ZM837.873 372.203C837.896 370.831 838.475 369.524 839.485 368.562C840.495 367.601 841.855 367.062 843.271 367.062C844.688 367.062 846.048 367.601 847.058 368.562C848.068 369.524 848.647 370.831 848.67 372.203C846.976 372.954 845.134 373.342 843.271 373.34C841.345 373.34 839.517 372.933 837.873 372.203Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="j-app-3"
                                opacity="0.25"
                                d="M845.971 383.633C845.971 384.326 845.686 384.99 845.18 385.48C844.674 385.97 843.987 386.246 843.271 386.246C842.555 386.246 841.869 385.97 841.363 385.48C840.856 384.99 840.572 384.326 840.572 383.633C840.572 382.94 840.856 382.275 841.363 381.785C841.869 381.295 842.555 381.02 843.271 381.02C843.987 381.02 844.674 381.295 845.18 381.785C845.686 382.275 845.971 382.94 845.971 383.633ZM837.873 393.47C837.896 392.099 838.475 390.792 839.485 389.83C840.495 388.868 841.855 388.329 843.271 388.329C844.688 388.329 846.048 388.868 847.058 389.83C848.068 390.792 848.647 392.099 848.67 393.47C846.976 394.222 845.134 394.61 843.271 394.607C841.345 394.607 839.517 394.2 837.873 393.47Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="j-app-2"
                                opacity="0.25"
                                d="M863.967 373.59C863.967 374.283 863.683 374.947 863.176 375.437C862.67 375.927 861.983 376.203 861.267 376.203C860.551 376.203 859.865 375.927 859.359 375.437C858.852 374.947 858.568 374.283 858.568 373.59C858.568 372.897 858.852 372.232 859.359 371.742C859.865 371.252 860.551 370.977 861.267 370.977C861.983 370.977 862.67 371.252 863.176 371.742C863.683 372.232 863.967 372.897 863.967 373.59ZM855.869 383.427C855.892 382.056 856.471 380.749 857.481 379.787C858.491 378.825 859.851 378.286 861.267 378.286C862.684 378.286 864.044 378.825 865.054 379.787C866.064 380.749 866.643 382.056 866.666 383.427C864.972 384.179 863.131 384.567 861.267 384.564C859.341 384.564 857.513 384.157 855.869 383.427Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="j-app-1"
                                opacity="0.25"
                                d="M827.979 373.59C827.979 374.283 827.694 374.947 827.188 375.437C826.682 375.927 825.995 376.203 825.279 376.203C824.563 376.203 823.877 375.927 823.37 375.437C822.864 374.947 822.58 374.283 822.58 373.59C822.58 372.897 822.864 372.232 823.37 371.742C823.877 371.252 824.563 370.977 825.279 370.977C825.995 370.977 826.682 371.252 827.188 371.742C827.694 372.232 827.979 372.897 827.979 373.59ZM819.881 383.427C819.904 382.056 820.483 380.749 821.493 379.787C822.503 378.825 823.863 378.286 825.279 378.286C826.696 378.286 828.056 378.825 829.066 379.787C830.075 380.749 830.654 382.056 830.677 383.427C828.984 384.179 827.142 384.567 825.279 384.564C823.353 384.564 821.524 384.157 819.881 383.427Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="Group 1579">
                            <path
                                id="e-app"
                                opacity="0.25"
                                d="M894.369 157.201V193.929C894.369 196.176 893.508 198.332 891.976 199.922C890.443 201.511 888.365 202.404 886.198 202.404H837.171C835.004 202.404 832.926 201.511 831.393 199.922C829.861 198.332 829 196.176 829 193.929V157.201M894.369 157.201V148.726C894.369 146.478 893.508 144.322 891.976 142.732C890.443 141.143 888.365 140.25 886.198 140.25H837.171C835.004 140.25 832.926 141.143 831.393 142.732C829.861 144.322 829 146.478 829 148.726V157.201M894.369 157.201H829"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="e-app-4"
                                opacity="0.25"
                                d="M865.413 165.371C865.413 166.064 865.133 166.728 864.635 167.219C864.136 167.709 863.46 167.984 862.754 167.984C862.049 167.984 861.373 167.709 860.874 167.219C860.376 166.728 860.096 166.064 860.096 165.371C860.096 164.678 860.376 164.013 860.874 163.523C861.373 163.033 862.049 162.758 862.754 162.758C863.46 162.758 864.136 163.033 864.635 163.523C865.133 164.013 865.413 164.678 865.413 165.371ZM857.438 175.208C857.46 173.837 858.03 172.53 859.025 171.568C860.02 170.607 861.359 170.068 862.754 170.068C864.15 170.068 865.489 170.607 866.484 171.568C867.478 172.53 868.049 173.837 868.071 175.208C866.403 175.96 864.59 176.348 862.754 176.346C860.857 176.346 859.056 175.939 857.438 175.208Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="e-app-3"
                                opacity="0.25"
                                d="M865.413 186.635C865.413 187.328 865.133 187.992 864.635 188.482C864.136 188.972 863.46 189.248 862.754 189.248C862.049 189.248 861.373 188.972 860.874 188.482C860.376 187.992 860.096 187.328 860.096 186.635C860.096 185.941 860.376 185.277 860.874 184.787C861.373 184.297 862.049 184.021 862.754 184.021C863.46 184.021 864.136 184.297 864.635 184.787C865.133 185.277 865.413 185.941 865.413 186.635ZM857.438 196.472C857.46 195.101 858.03 193.794 859.025 192.832C860.02 191.87 861.359 191.331 862.754 191.331C864.15 191.331 865.489 191.87 866.484 192.832C867.478 193.794 868.049 195.101 868.071 196.472C866.403 197.224 864.59 197.612 862.754 197.609C860.857 197.609 859.056 197.202 857.438 196.472Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="e-app-2"
                                opacity="0.25"
                                d="M883.136 176.595C883.136 177.288 882.856 177.953 882.357 178.443C881.859 178.933 881.182 179.208 880.477 179.208C879.772 179.208 879.096 178.933 878.597 178.443C878.098 177.953 877.818 177.288 877.818 176.595C877.818 175.902 878.098 175.238 878.597 174.748C879.096 174.258 879.772 173.982 880.477 173.982C881.182 173.982 881.859 174.258 882.357 174.748C882.856 175.238 883.136 175.902 883.136 176.595ZM875.16 186.433C875.183 185.062 875.753 183.755 876.748 182.793C877.742 181.831 879.082 181.292 880.477 181.292C881.872 181.292 883.212 181.831 884.206 182.793C885.201 183.755 885.771 185.062 885.794 186.433C884.126 187.185 882.312 187.573 880.477 187.57C878.58 187.57 876.779 187.163 875.16 186.433Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="e-app-1"
                                opacity="0.25"
                                d="M847.691 176.595C847.691 177.288 847.411 177.953 846.912 178.443C846.413 178.933 845.737 179.208 845.032 179.208C844.327 179.208 843.65 178.933 843.152 178.443C842.653 177.953 842.373 177.288 842.373 176.595C842.373 175.902 842.653 175.238 843.152 174.748C843.65 174.258 844.327 173.982 845.032 173.982C845.737 173.982 846.413 174.258 846.912 174.748C847.411 175.238 847.691 175.902 847.691 176.595ZM839.715 186.433C839.738 185.062 840.308 183.755 841.302 182.793C842.297 181.831 843.637 181.292 845.032 181.292C846.427 181.292 847.766 181.831 848.761 182.793C849.756 183.755 850.326 185.062 850.349 186.433C848.681 187.185 846.867 187.573 845.032 187.57C843.134 187.57 841.334 187.163 839.715 186.433Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="d-path" opacity="0.25">
                            <path
                                id="Shape_11"
                                d="M908.25 116.327H841.039C841.017 116.327 841 116.31 841 116.289C841 116.267 840.983 116.25 840.961 116.25H793.25C780.409 116.25 770 126.659 770 139.5C770 152.341 759.591 162.75 746.75 162.75H581.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="e-path" opacity="0.25">
                            <path
                                id="Shape_12"
                                d="M825.25 171.75H584.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="f-path" opacity="0.25">
                            <path
                                id="Shape_13"
                                d="M731.25 213.327H701.289C692.293 213.327 685 206.034 685 197.039C685 188.043 677.707 180.75 668.711 180.75H583.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="Group 1582">
                            <path
                                id="g-app"
                                opacity="0.25"
                                d="M919.369 240.201V276.929C919.369 279.176 918.508 281.332 916.976 282.922C915.443 284.511 913.365 285.404 911.198 285.404H862.171C860.004 285.404 857.926 284.511 856.393 282.922C854.861 281.332 854 279.176 854 276.929V240.201M919.369 240.201V231.726C919.369 229.478 918.508 227.322 916.976 225.732C915.443 224.143 913.365 223.25 911.198 223.25H862.171C860.004 223.25 857.926 224.143 856.393 225.732C854.861 227.322 854 229.478 854 231.726V240.201M919.369 240.201H854"
                                stroke="currentColor"
                                strokeWidth="1.98364"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="g-app-4"
                                opacity="0.25"
                                d="M890.413 248.371C890.413 249.064 890.133 249.728 889.635 250.219C889.136 250.709 888.46 250.984 887.754 250.984C887.049 250.984 886.373 250.709 885.874 250.219C885.376 249.728 885.096 249.064 885.096 248.371C885.096 247.678 885.376 247.013 885.874 246.523C886.373 246.033 887.049 245.758 887.754 245.758C888.46 245.758 889.136 246.033 889.635 246.523C890.133 247.013 890.413 247.678 890.413 248.371ZM882.438 258.208C882.46 256.837 883.03 255.53 884.025 254.568C885.02 253.607 886.359 253.068 887.754 253.068C889.15 253.068 890.489 253.607 891.484 254.568C892.478 255.53 893.049 256.837 893.071 258.208C891.403 258.96 889.59 259.348 887.754 259.346C885.857 259.346 884.056 258.939 882.438 258.208Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="g-app-3"
                                opacity="0.25"
                                d="M890.413 269.635C890.413 270.328 890.133 270.992 889.635 271.482C889.136 271.972 888.46 272.248 887.754 272.248C887.049 272.248 886.373 271.972 885.874 271.482C885.376 270.992 885.096 270.328 885.096 269.635C885.096 268.941 885.376 268.277 885.874 267.787C886.373 267.297 887.049 267.021 887.754 267.021C888.46 267.021 889.136 267.297 889.635 267.787C890.133 268.277 890.413 268.941 890.413 269.635ZM882.438 279.472C882.46 278.101 883.03 276.794 884.025 275.832C885.02 274.87 886.359 274.331 887.754 274.331C889.15 274.331 890.489 274.87 891.484 275.832C892.478 276.794 893.049 278.101 893.071 279.472C891.403 280.224 889.59 280.612 887.754 280.609C885.857 280.609 884.056 280.202 882.438 279.472Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="g-app-2"
                                opacity="0.25"
                                d="M908.138 259.595C908.138 260.288 907.858 260.953 907.359 261.443C906.861 261.933 906.184 262.208 905.479 262.208C904.774 262.208 904.098 261.933 903.599 261.443C903.1 260.953 902.82 260.288 902.82 259.595C902.82 258.902 903.1 258.238 903.599 257.748C904.098 257.258 904.774 256.982 905.479 256.982C906.184 256.982 906.861 257.258 907.359 257.748C907.858 258.238 908.138 258.902 908.138 259.595ZM900.162 269.433C900.185 268.062 900.755 266.755 901.75 265.793C902.744 264.831 904.084 264.292 905.479 264.292C906.874 264.292 908.214 264.831 909.208 265.793C910.203 266.755 910.773 268.062 910.796 269.433C909.128 270.185 907.314 270.573 905.479 270.57C903.582 270.57 901.781 270.163 900.162 269.433Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="g-app-1"
                                opacity="0.25"
                                d="M872.691 259.595C872.691 260.288 872.411 260.953 871.912 261.443C871.413 261.933 870.737 262.208 870.032 262.208C869.327 262.208 868.65 261.933 868.152 261.443C867.653 260.953 867.373 260.288 867.373 259.595C867.373 258.902 867.653 258.238 868.152 257.748C868.65 257.258 869.327 256.982 870.032 256.982C870.737 256.982 871.413 257.258 871.912 257.748C872.411 258.238 872.691 258.902 872.691 259.595ZM864.715 269.433C864.738 268.062 865.308 266.755 866.302 265.793C867.297 264.831 868.637 264.292 870.032 264.292C871.427 264.292 872.766 264.831 873.761 265.793C874.756 266.755 875.326 268.062 875.349 269.433C873.681 270.185 871.867 270.573 870.032 270.57C868.134 270.57 866.334 270.163 864.715 269.433Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g id="g-path" opacity="0.25">
                            <path
                                id="Shape_14"
                                d="M850.25 254.327H780.039C780.017 254.327 780 254.31 780 254.289C780 254.267 779.983 254.25 779.961 254.25H703C689.745 254.25 679 243.505 679 230.25V213.75C679 200.495 668.255 189.75 655 189.75H595.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="h-path" opacity="0.25">
                            <path
                                id="Shape_15"
                                d="M708.25 291.327H687C673.745 291.327 663 280.582 663 267.327V222.75C663 209.495 652.255 198.75 639 198.75H603.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="i-path" opacity="0.25">
                            <path
                                id="Shape_16"
                                d="M928.25 314.263H814.994C810.579 314.263 807 317.842 807 322.256C807 326.671 803.421 330.25 799.006 330.25H670C656.745 330.25 646 319.505 646 306.25V231.75C646 218.495 635.255 207.75 622 207.75H606.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="j-path" opacity="0.25">
                            <path
                                id="Shape_17"
                                d="M805.25 368.327H776.039C767.733 368.327 761 361.594 761 353.289C761 344.983 754.267 338.25 745.961 338.25H658C644.745 338.25 634 327.505 634 314.25V240.75C634 227.495 623.255 216.75 610 216.75H607.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                        <g id="k-path" opacity="0.25">
                            <path
                                id="Shape_18"
                                d="M646.25 376.327H645C631.745 376.327 621 365.582 621 352.327V242C621 233.025 613.725 225.75 604.75 225.75"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="bevel"
                            />
                        </g>
                    </g>
                    <g id="Group 1619">
                        <path
                            id="j-one"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint0_linear_9648_2949)"
                        />
                        <path
                            id="j-two"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint1_linear_9648_2949)"
                        />
                        <path
                            id="j-three"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint2_linear_9648_2949)"
                        />
                        <path
                            id="j-four"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint3_linear_9648_2949)"
                        />
                        <path
                            id="j-five"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint4_linear_9648_2949)"
                        />
                        <path
                            id="j-six"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint5_linear_9648_2949)"
                        />
                        <path
                            id="j-seven"
                            d="M604 217.25C604 216.492 604.572 215.856 605.326 215.775L625.023 213.674C627.147 213.448 629 215.113 629 217.25C629 219.387 627.147 221.052 625.023 220.826L605.326 218.725C604.572 218.644 604 218.008 604 217.25Z"
                            fill="url(#paint6_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1620">
                        <path
                            id="k-one"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint7_linear_9648_2949)"
                        />
                        <path
                            id="k-two"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint8_linear_9648_2949)"
                        />
                        <path
                            id="k-three"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint9_linear_9648_2949)"
                        />
                        <path
                            id="k-four"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint10_linear_9648_2949)"
                        />
                        <path
                            id="k-five"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint11_linear_9648_2949)"
                        />
                        <path
                            id="k-six"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint12_linear_9648_2949)"
                        />
                        <path
                            id="k-seven"
                            d="M602 226.25C602 225.492 602.572 224.856 603.326 224.775L623.023 222.674C625.147 222.448 627 224.113 627 226.25C627 228.387 625.147 230.052 623.023 229.826L603.326 227.725C602.572 227.644 602 227.008 602 226.25Z"
                            fill="url(#paint13_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1618">
                        <path
                            id="i-one"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint14_linear_9648_2949)"
                        />
                        <path
                            id="i-two"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint15_linear_9648_2949)"
                        />
                        <path
                            id="i-three"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint16_linear_9648_2949)"
                        />
                        <path
                            id="i-four"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint17_linear_9648_2949)"
                        />
                        <path
                            id="i-five"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint18_linear_9648_2949)"
                        />
                        <path
                            id="i-six"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint19_linear_9648_2949)"
                        />
                        <path
                            id="i-seven"
                            d="M604 208.25C604 207.492 604.572 206.856 605.326 206.775L625.023 204.674C627.147 204.448 629 206.113 629 208.25C629 210.387 627.147 212.052 625.023 211.826L605.326 209.725C604.572 209.644 604 209.008 604 208.25Z"
                            fill="url(#paint20_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1617">
                        <path
                            id="h-one"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint21_linear_9648_2949)"
                        />
                        <path
                            id="h-two"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint22_linear_9648_2949)"
                        />
                        <path
                            id="h-three"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint23_linear_9648_2949)"
                        />
                        <path
                            id="h-four"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint24_linear_9648_2949)"
                        />
                        <path
                            id="h-five"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint25_linear_9648_2949)"
                        />
                        <path
                            id="h-six"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint26_linear_9648_2949)"
                        />
                        <path
                            id="h-seven"
                            d="M601 198.25C601 197.492 601.572 196.856 602.326 196.775L622.023 194.674C624.147 194.448 626 196.113 626 198.25C626 200.387 624.147 202.052 622.023 201.826L602.326 199.725C601.572 199.644 601 199.008 601 198.25Z"
                            fill="url(#paint27_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1616">
                        <path
                            id="g-one"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint28_linear_9648_2949)"
                        />
                        <path
                            id="g-two"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint29_linear_9648_2949)"
                        />
                        <path
                            id="g-three"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint30_linear_9648_2949)"
                        />
                        <path
                            id="g-four"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint31_linear_9648_2949)"
                        />
                        <path
                            id="g-five"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint32_linear_9648_2949)"
                        />
                        <path
                            id="g-six"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint33_linear_9648_2949)"
                        />
                        <path
                            id="g-seven"
                            d="M593 190.25C593 189.492 593.572 188.856 594.326 188.775L614.023 186.674C616.147 186.448 618 188.113 618 190.25C618 192.387 616.147 194.052 614.023 193.826L594.326 191.725C593.572 191.644 593 191.008 593 190.25Z"
                            fill="url(#paint34_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1615">
                        <path
                            id="f-one"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint35_linear_9648_2949)"
                        />
                        <path
                            id="f-two"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint36_linear_9648_2949)"
                        />
                        <path
                            id="f-three"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint37_linear_9648_2949)"
                        />
                        <path
                            id="f-four"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint38_linear_9648_2949)"
                        />
                        <path
                            id="f-five"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint39_linear_9648_2949)"
                        />
                        <path
                            id="f-six"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint40_linear_9648_2949)"
                        />
                        <path
                            id="f-seven"
                            d="M582 180.25C582 179.492 582.572 178.856 583.326 178.775L603.023 176.674C605.147 176.448 607 178.113 607 180.25C607 182.387 605.147 184.052 603.023 183.826L583.326 181.725C582.572 181.644 582 181.008 582 180.25Z"
                            fill="url(#paint41_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1614">
                        <path
                            id="e-one"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint42_linear_9648_2949)"
                        />
                        <path
                            id="e-two"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint43_linear_9648_2949)"
                        />
                        <path
                            id="e-three"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint44_linear_9648_2949)"
                        />
                        <path
                            id="e-four"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint45_linear_9648_2949)"
                        />
                        <path
                            id="e-five"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint46_linear_9648_2949)"
                        />
                        <path
                            id="e-six"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint47_linear_9648_2949)"
                        />
                        <path
                            id="e-seven"
                            d="M582 172.25C582 171.492 582.572 170.856 583.326 170.775L603.023 168.674C605.147 168.448 607 170.113 607 172.25C607 174.387 605.147 176.052 603.023 175.826L583.326 173.725C582.572 173.644 582 173.008 582 172.25Z"
                            fill="url(#paint48_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1613">
                        <path
                            id="d-one"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint49_linear_9648_2949)"
                        />
                        <path
                            id="d-two"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint50_linear_9648_2949)"
                        />
                        <path
                            id="d-three"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint51_linear_9648_2949)"
                        />
                        <path
                            id="d-four"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint52_linear_9648_2949)"
                        />
                        <path
                            id="d-five"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint53_linear_9648_2949)"
                        />
                        <path
                            id="d-six"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint54_linear_9648_2949)"
                        />
                        <path
                            id="d-seven"
                            d="M580 162.25C580 161.492 580.572 160.856 581.326 160.775L601.023 158.674C603.147 158.448 605 160.113 605 162.25C605 164.387 603.147 166.052 601.023 165.826L581.326 163.725C580.572 163.644 580 163.008 580 162.25Z"
                            fill="url(#paint55_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1612">
                        <path
                            id="c-one"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint56_linear_9648_2949)"
                        />
                        <path
                            id="c-two"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint57_linear_9648_2949)"
                        />
                        <path
                            id="c-three"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint58_linear_9648_2949)"
                        />
                        <path
                            id="c-four"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint59_linear_9648_2949)"
                        />
                        <path
                            id="c-five"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint60_linear_9648_2949)"
                        />
                        <path
                            id="c-six"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint61_linear_9648_2949)"
                        />
                        <path
                            id="c-seven"
                            d="M572 153.25C572 152.492 572.572 151.856 573.326 151.775L593.023 149.674C595.147 149.448 597 151.113 597 153.25C597 155.387 595.147 157.052 593.023 156.826L573.326 154.725C572.572 154.644 572 154.008 572 153.25Z"
                            fill="url(#paint62_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1611">
                        <path
                            id="b-one"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint63_linear_9648_2949)"
                        />
                        <path
                            id="b-two"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint64_linear_9648_2949)"
                        />
                        <path
                            id="b-three"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint65_linear_9648_2949)"
                        />
                        <path
                            id="b-four"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint66_linear_9648_2949)"
                        />
                        <path
                            id="b-five"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint67_linear_9648_2949)"
                        />
                        <path
                            id="b-six"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint68_linear_9648_2949)"
                        />
                        <path
                            id="b-seven"
                            d="M554 144.25C554 143.492 554.572 142.856 555.326 142.775L575.023 140.674C577.147 140.448 579 142.113 579 144.25C579 146.387 577.147 148.052 575.023 147.826L555.326 145.725C554.572 145.644 554 145.008 554 144.25Z"
                            fill="url(#paint69_linear_9648_2949)"
                        />
                    </g>
                    <g id="Group 1610">
                        <path
                            id="a-one"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint70_linear_9648_2949)"
                        />
                        <path
                            id="a-two"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint71_linear_9648_2949)"
                        />
                        <path
                            id="a-three"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint72_linear_9648_2949)"
                        />
                        <path
                            id="a-four"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint73_linear_9648_2949)"
                        />
                        <path
                            id="a-five"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint74_linear_9648_2949)"
                        />
                        <path
                            id="a-six"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint75_linear_9648_2949)"
                        />
                        <path
                            id="a-seven"
                            d="M537 136.25C537 135.492 537.572 134.856 538.326 134.775L558.023 132.674C560.147 132.448 562 134.113 562 136.25C562 138.387 560.147 140.052 558.023 139.826L538.326 137.725C537.572 137.644 537 137.008 537 136.25Z"
                            fill="url(#paint76_linear_9648_2949)"
                        />
                    </g>
                    <path
                        id="five"
                        d="M310 257.25C310 256.492 310.572 255.856 311.326 255.775L331.023 253.674C333.147 253.448 335 255.113 335 257.25C335 259.387 333.147 261.052 331.023 260.826L311.326 258.725C310.572 258.644 310 258.008 310 257.25Z"
                        fill="url(#paint77_linear_9648_2949)"
                    />
                    <path
                        id="six"
                        d="M154 309.25C154 308.492 154.572 307.856 155.326 307.775L175.023 305.674C177.147 305.448 179 307.113 179 309.25C179 311.387 177.147 313.052 175.023 312.826L155.326 310.725C154.572 310.644 154 310.008 154 309.25Z"
                        fill="url(#paint78_linear_9648_2949)"
                    />
                    <path
                        id="seven"
                        d="M360 362.25C360 361.492 360.572 360.856 361.326 360.775L381.023 358.674C383.147 358.448 385 360.113 385 362.25C385 364.387 383.147 366.052 381.023 365.826L361.326 363.725C360.572 363.644 360 363.008 360 362.25Z"
                        fill="url(#paint79_linear_9648_2949)"
                    />
                    <path
                        id="four"
                        d="M138 204.25C138 203.492 138.572 202.856 139.326 202.775L159.023 200.674C161.147 200.448 163 202.113 163 204.25C163 206.387 161.147 208.052 159.023 207.826L139.326 205.725C138.572 205.644 138 205.008 138 204.25Z"
                        fill="url(#paint80_linear_9648_2949)"
                    />
                    <path
                        id="three"
                        d="M309 152.25C309 151.492 309.572 150.856 310.326 150.775L330.023 148.674C332.147 148.448 334 150.113 334 152.25C334 154.387 332.147 156.052 330.023 155.826L310.326 153.725C309.572 153.644 309 153.008 309 152.25Z"
                        fill="url(#paint81_linear_9648_2949)"
                    />
                    <path
                        id="two"
                        d="M157 99.25C157 98.4918 157.572 97.8557 158.326 97.7752L178.023 95.6743C180.147 95.4476 182 97.113 182 99.25C182 101.387 180.147 103.052 178.023 102.826L158.326 100.725C157.572 100.644 157 100.008 157 99.25Z"
                        fill="url(#paint82_linear_9648_2949)"
                    />
                    <path
                        id="one"
                        d="M361 47.25C361 46.4918 361.572 45.8557 362.326 45.7752L382.023 43.6743C384.147 43.4476 386 45.113 386 47.25C386 49.387 384.147 51.0524 382.023 50.8257L362.326 48.7248C361.572 48.6443 361 48.0082 361 47.25Z"
                        fill="url(#paint83_linear_9648_2949)"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="paint0_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint4_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint5_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint6_linear_9648_2949"
                        x1={604}
                        y1="217.25"
                        x2={629}
                        y2="217.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint7_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint8_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint9_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint10_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint11_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint12_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint13_linear_9648_2949"
                        x1={602}
                        y1="226.25"
                        x2={627}
                        y2="226.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint14_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint15_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint16_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint17_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint18_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint19_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint20_linear_9648_2949"
                        x1={604}
                        y1="208.25"
                        x2={629}
                        y2="208.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint21_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint22_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint23_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint24_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint25_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint26_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint27_linear_9648_2949"
                        x1={601}
                        y1="198.25"
                        x2={626}
                        y2="198.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint28_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint29_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint30_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint31_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint32_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint33_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint34_linear_9648_2949"
                        x1={593}
                        y1="190.25"
                        x2={618}
                        y2="190.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint35_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint36_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint37_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint38_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint39_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint40_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint41_linear_9648_2949"
                        x1={582}
                        y1="180.25"
                        x2={607}
                        y2="180.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint42_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint43_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint44_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint45_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint46_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint47_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint48_linear_9648_2949"
                        x1={582}
                        y1="172.25"
                        x2={607}
                        y2="172.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint49_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint50_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint51_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint52_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint53_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint54_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint55_linear_9648_2949"
                        x1={580}
                        y1="162.25"
                        x2={605}
                        y2="162.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint56_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint57_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint58_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint59_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint60_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint61_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint62_linear_9648_2949"
                        x1={572}
                        y1="153.25"
                        x2={597}
                        y2="153.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint63_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint64_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint65_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint66_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint67_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint68_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint69_linear_9648_2949"
                        x1={554}
                        y1="144.25"
                        x2={579}
                        y2="144.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint70_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient
                        id="paint71_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint72_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint73_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint74_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint75_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint76_linear_9648_2949"
                        x1={537}
                        y1="136.25"
                        x2={562}
                        y2="136.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint77_linear_9648_2949"
                        x1={310}
                        y1="257.25"
                        x2={335}
                        y2="257.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F54900" stopOpacity={0} />
                        <stop offset={1} stopColor="#F54900" />
                    </linearGradient>
                    <linearGradient
                        id="paint78_linear_9648_2949"
                        x1={154}
                        y1="309.25"
                        x2={179}
                        y2="309.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F0B000" stopOpacity={0} />
                        <stop offset={1} stopColor="#F0B000" />
                    </linearGradient>
                    <linearGradient
                        id="paint79_linear_9648_2949"
                        x1={360}
                        y1="362.25"
                        x2={385}
                        y2="362.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#894EFC" stopOpacity={0} />
                        <stop offset={1} stopColor="#894EFC" />
                    </linearGradient>
                    <linearGradient
                        id="paint80_linear_9648_2949"
                        x1={138}
                        y1="204.25"
                        x2={163}
                        y2="204.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#D946EF" stopOpacity={0} />
                        <stop offset={1} stopColor="#D946EF" />
                    </linearGradient>
                    <linearGradient
                        id="paint81_linear_9648_2949"
                        x1={309}
                        y1="152.25"
                        x2={334}
                        y2="152.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#10B981" stopOpacity={0} />
                        <stop offset={1} stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient
                        id="paint82_linear_9648_2949"
                        x1={157}
                        y1="99.25"
                        x2={182}
                        y2="99.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F59E0B" stopOpacity={0} />
                        <stop offset={1} stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient
                        id="paint83_linear_9648_2949"
                        x1={361}
                        y1="47.25"
                        x2={386}
                        y2="47.25"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0EA5E9" stopOpacity={0} />
                        <stop offset={1} stopColor="#0EA5E9" />
                    </linearGradient>
                    <clipPath id="clip0_9648_2949">
                        <rect
                            width="95.36"
                            height="32.2162"
                            fill="white"
                            transform="translate(20 200.75)"
                        />
                    </clipPath>
                    <clipPath id="clip1_9648_2949">
                        <rect
                            width={29}
                            height={29}
                            fill="white"
                            transform="translate(35 94.6504)"
                        />
                    </clipPath>
                    <clipPath id="clip2_9648_2949">
                        <rect
                            width={110}
                            height={23}
                            fill="white"
                            transform="translate(188 150.25)"
                        />
                    </clipPath>
                    <clipPath id="clip3_9648_2949">
                        <rect
                            width={95}
                            height={30}
                            fill="white"
                            transform="translate(244 359.25)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}