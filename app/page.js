'use client';

import { gsap } from "gsap";
import { useEffect } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import InterchangeAnimation from "@/components/interchange-anim";
import LifecycleAnimation from "@/components/lifecycle-anim";
import OffboardingAnimation from "@/components/offboarding-anim";
import BlogFeed from "@/components/blog-feed";
import confetti from "canvas-confetti";

function setupVideoAutoplay(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const overlay = wrapper.querySelector('.play-overlay');
    const iframe = wrapper.querySelector('iframe');

    if (!overlay || !iframe) return;

    overlay.addEventListener('click', () => {
        // Add autoplay=1 to its URL
        const url = new URL(iframe.src);
        url.searchParams.set("autoplay", "1");
        iframe.src = url.toString();

        // Remove overlay so user can interact with player
        overlay.remove();
    });
}

export default function Home() {
    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);
    }, []);

    useEffect(() => {
        setupVideoAutoplay('video-mobile');
        setupVideoAutoplay('video-desktop');
    }, []);

    const handleClick = () => {
        const duration = 5 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, scalar: 2 }
        const ocron = confetti.shapeFromPath({
            path: "M0 43.6027C0 39.4691 0.633385 35.7355 1.90013 32.402C3.16687 29.0018 4.96697 26.1349 7.30044 23.8014C9.63392 21.4013 12.4341 19.5679 15.701 18.3011C18.9678 16.9677 22.6347 16.301 26.7016 16.301C30.7685 16.301 34.4354 16.9677 37.7023 18.3011C41.0358 19.5679 43.8693 21.4013 46.2028 23.8014C48.5363 26.1349 50.3364 29.0018 51.6032 32.402C52.8699 35.7355 53.5033 39.4691 53.5033 43.6027C53.5033 47.7362 52.8699 51.4698 51.6032 54.8033C50.3364 58.1369 48.5363 61.0037 46.2028 63.4039C43.8693 65.7373 41.0358 67.5708 37.7023 68.9042C34.4354 70.1709 30.7685 70.8043 26.7016 70.8043C22.6347 70.8043 18.9678 70.1709 15.701 68.9042C12.4341 67.5708 9.63392 65.7373 7.30044 63.4039C4.96697 61.0037 3.16687 58.1369 1.90013 54.8033C0.633385 51.4698 0 47.7362 0 43.6027ZM14.2009 43.6027C14.2009 45.6694 14.4009 47.7029 14.8009 49.703C15.2009 51.6365 15.8676 53.4032 16.801 55.0033C17.8011 56.5368 19.1012 57.7702 20.7013 58.7036C22.3014 59.637 24.3015 60.1037 26.7016 60.1037C29.1018 60.1037 31.1019 59.637 32.702 58.7036C34.3688 57.7702 35.6689 56.5368 36.6022 55.0033C37.6023 53.4032 38.3023 51.6365 38.7024 49.703C39.1024 47.7029 39.3024 45.6694 39.3024 43.6027C39.3024 41.5359 39.1024 39.5024 38.7024 37.5023C38.3023 35.5022 37.6023 33.7354 36.6022 32.202C35.6689 30.6685 34.3688 29.4351 32.702 28.5017C31.1019 27.5017 29.1018 27.0016 26.7016 27.0016C24.3015 27.0016 22.3014 27.5017 20.7013 28.5017C19.1012 29.4351 17.8011 30.6685 16.801 32.202C15.8676 33.7354 15.2009 35.5022 14.8009 37.5023C14.4009 39.5024 14.2009 41.5359 14.2009 43.6027ZM9.20057 0H44.5027V7.50045H9.20057V0Z"
        }) 
        const randomInRange = (min, max) =>
            Math.random() * (max - min) + min
        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now()
            if (timeLeft <= 0) {
                return clearInterval(interval)
            }
            const particleCount = 50 * (timeLeft / duration)
            confetti({
                ...defaults,
                particleCount,
                shapes: [ocron],
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
            confetti({
                ...defaults,
                particleCount,
                shapes: [ocron],
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        }, 250)
    }

    return (
        <main id="home-page">
            <section className="max-w-6xl mx-auto px-4 md:py-0">
                <h1 className="text-[9.75vw] xl:text-[120px] font-bold -ml-1 relative z-10 pt-4 sm:pt-0 md:-mb-6 -mt-0 md:-mt-6">
                    Hellō&nbsp;&nbsp;<span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">[</span> Free SSO <span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">]</span></h1>
                <div className="hero-img relative overflow-hidden pt-2 sm:pt-0 md:ml-32">
                    <button onClick={handleClick} className="cursor-pointer w-1/2 left-[20%] h-[25%] opacity-0 absolute z-20 bottom-[11.5%]" style={{ animation: "float 5s infinite" }}>Testing</button>
                    <picture>
                        <source srcSet="/hero-dark.png" media="(prefers-color-scheme: dark)" />
                        <img src="/hero-light.png" alt="phone with continue with hello button"
                            className="z-10 h-auto max-h-[600px] w-auto -mb-4 md:-mb-12" style={{ animation: "float 5s infinite" }} />
                    </picture>
                </div>
                <h2 className="text-2xl sm:text-[3.95vw] xl:text-[49px] font-semibold relative z-10 -mb-6 sm:-mb-0">
                    Goodbye SSO tax.<br className="sm:hidden" /> Hyperscale security for all.
                </h2>
            </section>

            <section className="callout">
                <div className="max-w-6xl mx-auto py-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold italic">The Hellō Identity Interchange</h1>
                    <h2 className="text-xl md:text-3xl font-semibold italic text-charcoal/50 dark:text-gray/50 mt-4">
                        Abstracting all identity providers into a single OpenID Connect<br className="hidden sm:block" />
                        integration removes complexity and costs for everyone, enabling<br /><span
                            className="text-charcoal dark:text-gray">Hellō to provide&nbsp;&nbsp;<span className="not-italic"><span className="text-charcoal/50 dark:text-gray/50 text-[26.5px] md:text-[39px]">[</span> Free
                                SSO <span className="text-charcoal/50 dark:text-gray/50 text-[26.5px] md:text-[39px]">]</span></span></span>
                    </h2>
                    <InterchangeAnimation />
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-16 md:mt-20 space-y-16 md:space-y-20">
                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">Free Social Login for B2C Apps</h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-4">
                        One integration. Your users choose from 17 login providers with account recovery.<br />
                        You get a verified email and profile picture with no account linking.</h2>
                    <div className="card">
                        <div className="card-description">
                            <p> You choose which providers are promoted.<br />
                                Users choose their preferred login provider.</p>
                            <div className="space-y-2 flex flex-col items-start">
                                <a href="https://www.hello.dev/docs/getting-started/" target="_blank"
                                    className="card-link-primary no-global-hover">
                                    Get started
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                                <a href="https://www.greenfielddemo.com/" target="_blank"
                                    className="card-link-secondary no-global-hover">
                                    Try out the B2C demo
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <picture
                            className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                            <source srcSet="/b2c-dark.png" media="(prefers-color-scheme: dark)" />
                            <img src="/b2c-light.png" alt="phone showing continue with apple, google, and email buttons"
                                className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[110%] md:absolute md:right-10 md:-bottom-12 lg:-bottom-16"
                                style={{ animation: "float 3s infinite" }} />
                        </picture>
                    </div>
                </div>

                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Free Enterprise SSO for B2B Apps
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-4">One integration gives you zero config enterprise SSO for
                        most organizations. <br />No more SAML configuration. No more certificate management.</h2>
                    <div className="card">
                        <div className="card-description">
                            <div>
                                <ol>
                                    <li>Add Hellō to your existing application.</li>
                                    <li>Prompt user for their work email.</li>
                                    <li>Process existing accounts as usual.</li>
                                    <li>Send all new users to Hellō.</li>
                                </ol>
                                <p className="mt-6">
                                    You get SSO with no configuration.
                                </p>
                            </div>
                            <div className="space-y-2 flex flex-col items-start">
                                <a href="https://www.hello.dev/docs/getting-started/" target="_blank"
                                    className="card-link-primary no-global-hover">
                                    Get started
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                                <a href="https://www.b2bsaasdemo.com/" target="_blank"
                                    className="card-link-secondary no-global-hover">
                                    Try out the B2B demo
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <picture
                            className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                            <source srcSet="/b2b-dark.png" media="(prefers-color-scheme: dark)" />
                            <img src="/b2b-light.png" alt="phone showing continue with apple, google, and email buttons"
                                className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[110%] md:absolute md:right-10 md:-bottom-12 lg:-bottom-16"
                                style={{ animation: "float 3s infinite" }} />
                        </picture>
                    </div>
                </div>

                <div id="hello-lifecycle" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Hellō Lifecycle
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-4">Add offboarding to your B2B app</h2>
                    <div className="card lg:!h-[400px]">
                        <div className="card-description">
                            <ol className="mt-6">
                                <li>Your customers link their corporate directory.</li>
                                <li>Hellō sends your app a notification when a user leaves.</li>
                            </ol>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">Coming Q1 2026</span>
                                <div className="gap-2 flex flex-col md:flex-row items-start">
                                    <a href="https://wallet.hello.coop/waitlist?waitlist_label=Hell%C5%8D+Lifecycle&return_uri=https%3A%2F%2Fwww.hello.coop%2F%23hello-lifecycle"
                                        id="hello-lifecycle-join-waitlist-btn"
                                        className="card-link-primary no-global-hover cursor-pointer">
                                        Join the waitlist
                                        <svg width="10" height="10" fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7"></path>
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-10 md:my-0 md:w-3/5 md:ml-10 h-auto">
                            <LifecycleAnimation />
                        </div>
                    </div>
                </div>

                <div id="github-offboarding" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        GitHub Offboarding
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-4">Simplify & automate compliance</h2>
                    <div className="card lg:!h-[400px]">
                        <div className="card-description">
                            <ol>
                                <li>Your team members link their GitHub accounts with their corporate identity.</li>
                                <li>Access is automatically revoked when they leave.</li>
                            </ol>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">Coming Q1 2026</span>
                                <div className="gap-2 flex flex-col md:flex-row items-start">
                                    <a href="https://wallet.hello.coop/waitlist?waitlist_label=GitHub+Offboarding&return_uri=https%3A%2F%2Fwww.hello.coop%2F%23github-offboarding"
                                        id="github-offboarding-join-waitlist-btn"
                                        className="card-link-primary no-global-hover cursor-pointer">
                                        Join the waitlist
                                        <svg width="10" height="10" fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7"></path>
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-10 md:my-0 md:w-3/5 md:ml-10 h-auto">
                            <OffboardingAnimation />
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">Zero Config Agentic Coding</h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-4">Stop breaking developer flow with identity
                        configuration</h2>
                    <div className="card">
                        <div className="card-description">
                            <div className="md:pr-28">
                                <p>The Hellō Admin MCP Server enables app management from the IDE.</p>
                                <p className="mt-6">The Hellō Admin APIs are available as OAuth 2.0 APIs, enabling integration
                                    with a coding platform.</p>
                            </div>
                            <div className="space-y-2 flex flex-col items-start">
                                <a href="https://www.hello.dev/docs/admin-mcp/" target="_blank"
                                    className="card-link-primary no-global-hover !text-[13px]">
                                    Try out the Admin MCP Server
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                                <a href="https://www.hello.dev/docs/apis/admin/" target="_blank"
                                    className="card-link-secondary no-global-hover !text-[13px]">
                                    Explore Admin API documentation
                                    <svg width="10" height="10" fil="currentColor" className="ml-2">
                                        <g>
                                            <path className="line" d="M 0 5 H 7"></path>
                                            <path className="tip" d="M 5 10 L 10 5 L 5 0"></path>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* THIS IS A HACK TO GET ROBOT POSITIONED CORRECTLY ON MOBILE
                                FIGURING OUT THE POSITION WAS A NIGHTMARE
                                HENCE DUPLICATED CODE */}
                        <div className="relative w-full overflow-hidden md:hidden">
                            <picture className="card-phone-shadow-bottom">
                                <source srcSet="/vibe-bg-dark.png" media="(prefers-color-scheme: dark)" />
                                <img src="/vibe-bg-light.png" alt="background phone" className="w-full h-auto block" />
                            </picture>
                            <picture className="absolute inset-0 flex items-center justify-center card-phone-shadow-bottom">
                                <source srcSet="/vibe-robot-dark.png" media="(prefers-color-scheme: dark)" />
                                <img src="/vibe-robot-light.png" alt="overlayed phone elements" className="w-full h-auto z-10"
                                    style={{ animation: "fadeSlideLoop 3s ease-in-out infinite" }} />
                            </picture>
                        </div>
                        <div className="hidden md:block">
                            <picture
                                className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                                <source srcSet="/vibe-robot-dark.png" media="(prefers-color-scheme: dark)" />
                                <img src="/vibe-robot-light.png"
                                    alt="phone showing continue with apple, google, and email buttons"
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[110%] md:absolute md:right-10 md:-bottom-12 lg:-bottom-16 z-10"
                                    style={{ animation: "fadeSlideLoop 3s infinite" }} />
                            </picture>
                            <picture
                                className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                                <source srcSet="/vibe-bg-dark.png" media="(prefers-color-scheme: dark)" />
                                <img src="/vibe-bg-light.png"
                                    alt="phone showing continue with apple, google, and email buttons"
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[110%] md:absolute md:right-10 md:-bottom-12 lg:-bottom-16" />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            <section className="callout">
                <div className="max-w-6xl mx-auto py-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold italic">Building a #BetterInternet</h1>
                    <div className="mt-8 md:mt-16 gap-10">
                        <div
                            className="flex-1 flex items-center text-base md:text-lg lg:text-2xl font-normal text-charcoal/50 dark:text-gray/50">
                            <div className="space-y-3 md:space-y-5">
                                <p><span className="text-charcoal/75 dark:text-gray/75"><a
                                    href="https://www.linkedin.com/in/dickhardt/" className="no-global-hover">Dick
                                    Hardt</a></span>,
                                    Founder & CEO of Hellō, has been a leading voice in internet identity since the early
                                    2000s.
                                </p>
                                <p>
                                    His groundbreaking <span className="text-charcoal/75 dark:text-gray/75"><a
                                        href="https://youtu.be/JzuCE7lDYrM" className="no-global-hover">"Identity
                                        2.0"</a></span> talk introduced a user-centric vision that shaped modern
                                    identity and the <span className="text-charcoal/75 dark:text-gray/75"><a
                                        href="/approach/" className="no-global-hover">Hellō Approach</a></span>.
                                </p>
                                <div id="video-mobile"
                                    className="flex md:hidden float-right w-full md:w-2/5 h-[260px] inset-shadow-sm items-end justify-center rounded-md relative overflow-hidden">
                                    <div
                                        className="play-overlay absolute inset-0 z-10 cursor-pointer plausible-event-name=Identity-Talk-Video">
                                    </div>
                                    <iframe className="w-full h-full"
                                        src="https://www.youtube-nocookie.com/embed/JzuCE7lDYrM?si=lldKZB7eD1X-h_CL"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                <p>
                                    Dick led the design of OAuth 2.0 and JWTs and continues to lead the development of <span
                                        className="text-charcoal/75 dark:text-gray/75"><a href="/approach/standards"
                                            className="no-global-hover">open
                                            identity standards</a></span>.
                                </p>
                            </div>
                            <div id="video-desktop"
                                className="hidden md:flex ml-5 w-full md:w-2/5 h-[260px] flex-shrink-0 inset-shadow-sm items-end justify-center rounded-md relative overflow-hidden">
                                <div
                                    className="play-overlay absolute inset-0 z-10 cursor-pointer plausible-event-name=Identity-Talk-Video">
                                </div>
                                <iframe className="w-full h-full"
                                    src="https://www.youtube-nocookie.com/embed/JzuCE7lDYrM?si=lldKZB7eD1X-h_CL"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto pt-4 pb-12 md:py-16 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">Latest Blog Posts</h1>
                    <BlogFeed />
                    <div className="text-center mt-10 md:mt-16">
                        <a href="https://blog.hello.coop/" target="_blank"
                            className="inline-block text-base md:text-lg xl:text-2xl opacity-50 hover:opacity-100 transition-all ext-link-icon">Read
                            more
                            at
                            blog.hello.coop</a>
                    </div>
                </div>
            </section>
        </main >
    );
}
