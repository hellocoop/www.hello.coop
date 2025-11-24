'use client';

import { gsap } from "gsap";
import { useEffect } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import InterchangeAnimation from "@/components/interchange-anim";
import LifecycleAnimation from "@/components/lifecycle-anim";
import OffboardingAnimation from "@/components/offboarding-anim";
import BlogFeed from "@/components/blog-feed";
import { handleConfetti } from "@/lib/confetti";


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


    return (
        <main id="home-page">
            <section className="max-w-6xl mx-auto px-4 md:py-0">
                <h1 className="text-[9.75vw] xl:text-[120px] font-bold -ml-1 relative z-10 pt-4 sm:pt-0 md:-mb-6 -mt-0 md:-mt-6">
                    Hellō&nbsp;&nbsp;<span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">[</span> Free SSO <span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">]</span></h1>
                <div className="hero-img relative overflow-hidden pt-2 sm:pt-0 md:ml-32">
                    <button onClick={handleConfetti} className="cursor-pointer w-1/2 left-[20%] h-[25%] opacity-0 absolute z-20 bottom-[11.5%]" style={{ animation: "float 5s infinite" }}>Testing</button>
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
