'use client'

import { useEffect } from 'react'
import InterchangeAnimation from '@/components/animations/interchange-anim'
import BlogFeed from '@/components/blog-feed'
import { handleConfetti } from '@/lib/confetti'
import HelloB2BSSO from '@/components/products/hello-b2b-sso'
import HelloB2CSSO from '@/components/products/hello-b2c-sso'
import HelloLifecycle from '@/components/products/hello-lifecycle'
import GitHubOffboarding from '@/components/products/github-offboarding'
import CodingPlatforms from '@/components/products/coding-platforms'

function setupVideoAutoplay(wrapperId) {
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper) return

    const overlay = wrapper.querySelector('.play-overlay')
    const iframe = wrapper.querySelector('iframe')

    if (!overlay || !iframe) return

    overlay.addEventListener('click', () => {
        // Add autoplay=1 to its URL
        const url = new URL(iframe.src)
        url.searchParams.set('autoplay', '1')
        iframe.src = url.toString()

        // Remove overlay so user can interact with player
        overlay.remove()
    })
}

export default function Home() {
    useEffect(() => {
        setupVideoAutoplay('video-mobile')
        setupVideoAutoplay('video-desktop')
    }, [])

    return (
        <main id="home-page">
            <section className="max-w-6xl mx-auto px-4 md:py-0">
                <h1 className="text-[9.75vw] xl:text-[120px] font-bold -ml-1 relative z-10 pt-4 sm:pt-0 md:-mb-6 -mt-0 md:-mt-6">
                    Hellō&nbsp;&nbsp;
                    <span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">
                        [
                    </span>{' '}
                    Free SSO{' '}
                    <span className="text-charcoal/50 dark:text-gray/50 text-[13vw] xl:text-[159px]">
                        ]
                    </span>
                </h1>
                <div className="hero-img overflow-hidden relative max-w-[400px] mx-auto md:max-w-[900px]">
                    <picture>
                        <source srcSet="/hero-dark.png" media="(prefers-color-scheme: dark)" />
                        <img
                            src="/hero-light.png"
                            alt="phone mockup"
                            className="w-full h-auto -mb-8 pt-2 md:pt-0"
                            style={{ animation: 'float 5s infinite' }}
                        />
                    </picture>

                    {/* Button overlay container */}
                    <div
                        className="absolute cursor-pointer group top-[72%] left-[28.25%] w-[38%] md:top-[65%] md:left-[28.25%] md:w-[40%]"
                        style={{
                            transformOrigin: 'center',
                            animation: 'float 5s infinite',
                        }}
                    >
                        {/* Optional scale wrapper */}
                        <div
                            className="w-full"
                            style={{
                                transform: 'skew(334.5deg, 11.25deg)',
                            }}
                        >
                            <button
                                onClick={e => {
                                    handleConfetti()
                                    e.currentTarget.blur()
                                }}
                                className="hello-btn hello-btn-black-and-static hello-btn-hover-flare w-full !text-[12px] md:!text-2xl !p-0 h-8 md:h-14"
                            >
                                ō&nbsp;&nbsp;&nbsp;Continue with Hellō
                            </button>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl sm:text-[3.95vw] xl:text-[49px] font-semibold relative z-10 -mb-6 sm:-mb-0">
                    Goodbye SSO tax.
                    <br className="sm:hidden" /> Hyperscale security for all.
                </h2>
            </section>

            <section className="callout">
                <div className="max-w-6xl mx-auto py-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold italic">
                        The Hellō Identity Interchange
                    </h1>
                    <h2 className="text-xl md:text-4xl font-semibold italic text-charcoal/50 dark:text-gray/50 mt-4">
                        Abstracting all identity providers into a single OpenID Connect
                        <br className="hidden sm:block" />
                        integration removes complexity and costs for everyone, enabling
                        <br />
                        <span className="text-charcoal dark:text-gray">
                            Hellō to provide&nbsp;&nbsp;
                            <span className="not-italic">
                                <span className="text-charcoal/50 dark:text-gray/50 text-[26.5px] md:text-[39px]">
                                    [
                                </span>{' '}
                                Free SSO{' '}
                                <span className="text-charcoal/50 dark:text-gray/50 text-[26.5px] md:text-[39px]">
                                    ]
                                </span>
                            </span>
                        </span>
                    </h2>
                    <InterchangeAnimation />
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-16 md:mt-20 space-y-16 md:space-y-20">
                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-4xl font-semibold">
                        Free Social Login for B2C Apps
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium opacity-65 mt-4">
                        One integration. Your users choose from 17 login providers with account
                        recovery.
                        <br />
                        You get a verified email and profile picture with no account linking.
                    </h2>
                    <HelloB2CSSO showTitle={false} compact={true} />
                </div>

                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-4xl font-semibold">
                        Free Enterprise SSO for B2B Apps
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium opacity-65 mt-4">
                        One integration gives you zero config enterprise SSO for most organizations.
                        <br />
                        No more SAML configuration. No more certificate management.
                    </h2>
                    <HelloB2BSSO showTitle={false} compact={true} />
                </div>

                <div id="hellō-lifecycle" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-4xl font-semibold">Hellō Lifecycle</h1>
                    <h2 className="text-xl md:text-2xl font-medium opacity-65 mt-4">
                        Add offboarding to your B2B app.
                    </h2>
                    <HelloLifecycle showTitle={false} compact={true} />
                </div>

                <div id="github-offboarding" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-4xl font-semibold">GitHub Offboarding</h1>
                    <h2 className="text-xl md:text-2xl font-medium opacity-65 mt-4">
                        Simplify & automate compliance.
                    </h2>
                    <GitHubOffboarding showTitle={false} compact={true} />
                </div>

                <div className="px-4">
                    <h1 className="text-[1.35rem] md:text-4xl font-semibold">
                        Zero Config Agentic Coding
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium opacity-65 mt-4">
                        Stop breaking developer flow with identity configuration.
                    </h2>
                    <CodingPlatforms showTitle={false} compact={true} />
                </div>
            </section>

            <section className="callout">
                <div className="max-w-6xl mx-auto py-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold italic">
                        Building a #BetterInternet
                    </h1>
                    <div className="mt-8 md:mt-16 gap-10">
                        <div className="flex-1 flex items-center text-base md:text-lg lg:text-xl font-normal">
                            <div className="space-y-3 md:space-y-5">
                                <p>
                                    <span className="font-semibold">
                                        <a
                                            href="https://www.linkedin.com/in/dickhardt/"
                                            className="no-global-hover"
                                        >
                                            Dick Hardt
                                        </a>
                                    </span>
                                    , Founder & CEO of Hellō, has been a leading voice in internet
                                    identity since the early 2000s.
                                </p>
                                <p>
                                    His groundbreaking{' '}
                                    <span className="font-semibold">
                                        <a
                                            href="https://youtu.be/JzuCE7lDYrM"
                                            className="no-global-hover"
                                        >
                                            "Identity 2.0"
                                        </a>
                                    </span>{' '}
                                    talk introduced a user-centric vision that shaped modern
                                    identity and the{' '}
                                    <span className="font-semibold">
                                        <a href="/approach/" className="no-global-hover">
                                            Hellō Approach
                                        </a>
                                    </span>
                                    .
                                </p>
                                <div
                                    id="video-mobile"
                                    className="flex md:hidden float-right w-full md:w-2/5 h-[260px] inset-shadow-sm items-end justify-center rounded-md relative overflow-hidden"
                                >
                                    <div className="play-overlay absolute inset-0 z-10 cursor-pointer plausible-event-name=Identity-Talk-Video"></div>
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube-nocookie.com/embed/JzuCE7lDYrM?si=lldKZB7eD1X-h_CL"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p>
                                    Dick led the design of OAuth 2.0 and JWTs and continues to lead
                                    the development of{' '}
                                    <span className="font-semibold">
                                        <a href="/approach/standards" className="no-global-hover">
                                            open identity standards
                                        </a>
                                    </span>
                                    .
                                </p>
                            </div>
                            <div
                                id="video-desktop"
                                className="hidden md:flex ml-5 w-full md:w-2/5 h-[260px] flex-shrink-0 inset-shadow-sm items-end justify-center rounded-md relative overflow-hidden"
                            >
                                <div className="play-overlay absolute inset-0 z-10 cursor-pointer plausible-event-name=Identity-Talk-Video"></div>
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube-nocookie.com/embed/JzuCE7lDYrM?si=lldKZB7eD1X-h_CL"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto pt-4 pb-12 md:py-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Latest Blog Posts</h1>
                    <BlogFeed />
                    <div className="text-center mt-10 md:mt-16">
                        <a
                            href="https://blog.hello.coop/"
                            target="_blank"
                            className="inline-block text-base md:text-lg xl:text-2xl opacity-50 hover:opacity-100 transition-all ext-link-icon"
                            rel="noreferrer"
                        >
                            Read more at blog.hello.coop
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
