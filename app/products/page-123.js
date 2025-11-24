'use client';

import { gsap } from "gsap";
import { useEffect } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import LifecycleAnimation from "@/components/animations/lifecycle-anim";
import OffboardingAnimation from "@/components/animations/offboarding-anim";

export default function Products() {
    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);
    }, []);
    return (
        <main id="products-page">
            <section className="max-w-6xl mx-auto mt-6 md:mt-14 space-y-16 md:space-y-20 mb-20">
                <div className="px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">Products</h1>
                    <h2 className="text-xl md:text-3xl font-semibold opacity-50 mt-4">
                        Identity solutions that eliminate complexity and cost. From #FreeSSO to
                        automated lifecycle management, Hellō abstracts away identity provider
                        complexity through a single OpenID Connect integration.
                    </h2>
                </div>
                <div id="hello-b2c-sso" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Hellō B2C SSO
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Give users choice of 17 providers
                    </h2>
                    <div className="card !p-0 !py-4">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    One integration that gives your users the freedom to choose from
                                    17 different login providers including Google, Apple, Microsoft,
                                    GitHub, and more. Get verified emails and profile pictures without
                                    complex account linking.
                                </p>
                                <p>
                                    Perfect for consumer-facing applications that want to eliminate
                                    passwords while giving users control over their preferred
                                    authentication method.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">
                                    Price: FREE
                                </span>
                                <div className="gap-2 flex flex-col items-start">
                                    <a
                                        href="https://www.hello.dev/docs/getting-started/"
                                        target="_blank"
                                        className="card-link-primary no-global-hover"
                                    >
                                        Get started
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.greenfielddemo.com/"
                                        target="_blank"
                                        className="card-link-secondary no-global-hover"
                                    >
                                        Try out the B2C demo
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <picture className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                            <source srcSet="/b2c-dark.png" media="(prefers-color-scheme: dark)" />
                            <img
                                src="/b2c-light.png"
                                alt="phone showing continue with apple, google, and email buttons"
                                className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[500px] md:absolute md:right-0"
                                style={{ animation: "float 3s infinite" }}
                            />
                        </picture>
                    </div>
                </div>
                <div id="hello-b2b-sso" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Hellō B2B SSO
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Zero configuration enterprise SSO
                    </h2>
                    <div className="card !p-0 !py-4">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    Enable enterprise SSO without any setup or configuration. Users
                                    simply enter their work email, and Hellō automatically routes them
                                    to their company's email provider (Microsoft, Google, Zoho, etc.),
                                    which handles authentication through their corporate SSO.
                                </p>
                                <p>
                                    The first user from a company helps establish branding, then
                                    subsequent users enjoy a seamless, branded login experience. No
                                    SAML configuration, no IT tickets, no waiting—it just works.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">
                                    Price: FREE
                                </span>
                                <div className="gap-2 flex flex-col items-start">
                                    <a
                                        href="https://www.hello.dev/docs/getting-started/"
                                        target="_blank"
                                        className="card-link-primary no-global-hover"
                                    >
                                        Get started
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.b2bsaasdemo.com/"
                                        target="_blank"
                                        className="card-link-secondary no-global-hover"
                                    >
                                        Try out the B2B demo
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <picture className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                            <source srcSet="/b2b-dark.png" media="(prefers-color-scheme: dark)" />
                            <img
                                src="/b2b-light.png"
                                alt="phone showing continue with apple, google, and email buttons"
                                className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[500px] md:absolute md:right-0"
                                style={{ animation: "float 3s infinite" }}
                            />
                        </picture>
                    </div>
                </div>
                <div id="hello-lifecycle" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Hellō Lifecycle
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Add offboarding to your B2B app
                    </h2>
                    <div className="card !p-0 !py-4">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    Automate user deprovisioning for your B2B SaaS application. Your
                                    customers' tenant admins connect their corporate directory
                                    (Microsoft Entra, Google Workspace, etc.) through Hellō.
                                </p>
                                <p>
                                    When an employee is deprovisioned in their directory, Hellō
                                    automatically notifies your application via OpenID Provider
                                    Command, allowing you to suspend or remove access immediately.
                                    Give your enterprise customers the automated offboarding they
                                    expect.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">
                                    Coming Q1 2026
                                </span>
                                <div className="gap-2 flex flex-col md:flex-row items-start">
                                    <a
                                        href="https://wallet.hello.coop/waitlist?waitlist_label=Hell%C5%8D+Lifecycle&return_uri=https%3A%2F%2Fwww.hello.coop%2Fproducts%23hello-lifecycle"
                                        id="hello-lifecycle-join-waitlist-btn"
                                        className="card-link-primary no-global-hover cursor-pointer"
                                    >
                                        Join the waitlist
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-10 md:my-0 md:w-3/5 md:ml-10 h-auto">
                            <LifecycleAnimation/>
                        </div>
                    </div>
                </div>
                <div id="github-offboarding" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        GitHub Offboarding
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Simplify &amp; automate compliance
                    </h2>
                    <div className="card !p-0 !py-4">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    Solve GitHub access management for your own organization. Hellō
                                    guides each GitHub org member through linking their personal
                                    GitHub account with their corporate identity in a custom
                                    repository.
                                </p>
                                <p>
                                    Connect your corporate directory, and when an employee is
                                    deprovisioned, their GitHub org access is automatically removed.
                                    See how Hellō Lifecycle works while solving a real compliance gap
                                    for your team.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">
                                    Coming Q1 2026
                                </span>
                                <div className="gap-2 flex flex-col md:flex-row items-start">
                                    <a
                                        href="https://wallet.hello.coop/waitlist?waitlist_label=GitHub+Offboarding&return_uri=https%3A%2F%2Fwww.hello.coop%2Fproducts%23github-offboarding"
                                        id="github-offboarding-join-waitlist-btn"
                                        className="card-link-primary no-global-hover cursor-pointer"
                                    >
                                        Join the waitlist
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
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
                <div id="coding-platforms" className="px-4 scroll-mt-6">
                    <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                        Coding Platforms
                    </h1>
                    <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Let devs add identity in seconds
                    </h2>
                    <div className="card !p-0 !py-4">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    <span className="text-charcoal/75 dark:text-gray/75 mb-2 block">
                                        For developers:
                                    </span>
                                    Use our Admin MCP server with AI coding assistants to create and
                                    manage Hellō applications from your IDE. No context switching,
                                    just natural language commands.
                                </p>
                                <p>
                                    <span className="text-charcoal/75 dark:text-gray/75 mb-2 block">
                                        For platforms:
                                    </span>
                                    Integrate our Admin APIs to manage Hellō applications for your
                                    customers. OAuth-based authorization lets you provision and
                                    configure apps programmatically, enabling zero-friction identity
                                    without users leaving your platform.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-medium text-charcoal/75 dark:text-gray/75">
                                    Price: FREE
                                </span>
                                <div className="gap-2 flex flex-col items-start">
                                    <a
                                        href="https://www.hello.dev/docs/admin-mcp/"
                                        target="_blank"
                                        className="card-link-primary no-global-hover"
                                    >
                                        Try out the Admin MCP Server
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.hello.dev/docs/apis/admin/"
                                        target="_blank"
                                        className="card-link-secondary no-global-hover"
                                    >
                                        Explore Admin API documentation
                                        <svg width={10} height={10} fil="currentColor" className="ml-2">
                                            <g>
                                                <path className="line" d="M 0 5 H 7" />
                                                <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* THIS IS A HACK TO GET ROBOT POSITIONED CORRECTLY ON MOBILE
                        FIGURING OUT THE POSITION WAS A NIGHTMARE HENCE DUPLICATED CODE */}
                        <div className="relative w-full overflow-hidden md:hidden">
                            <picture className="card-phone-shadow-bottom">
                                <source
                                    srcSet="/vibe-bg-dark.png"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    src="/vibe-bg-light.png"
                                    alt="background phone"
                                    className="w-full h-auto block"
                                />
                            </picture>
                            <picture className="absolute inset-0 flex items-center justify-center card-phone-shadow-bottom">
                                <source
                                    srcSet="/vibe-robot-dark.png"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    src="/vibe-robot-light.png"
                                    alt="overlayed phone elements"
                                    className="w-full h-auto z-10"
                                    style={{ animation: "fadeSlideLoop 3s ease-in-out infinite" }}
                                />
                            </picture>
                        </div>
                        <div className="hidden md:block">
                            <picture className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                                <source
                                    srcSet="/vibe-robot-dark.png"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    src="/vibe-robot-light.png"
                                    alt="phone showing continue with apple, google, and email buttons"
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[450px] md:absolute md:right-0 z-20 md:bottom-0"
                                    style={{ animation: "fadeSlideLoop 3s infinite" }}
                                />
                            </picture>
                            <picture className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                                <source
                                    srcSet="/vibe-bg-dark.png"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    src="/vibe-bg-light.png"
                                    alt="phone showing continue with apple, google, and email buttons"
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[450px] md:absolute md:right-0 md:bottom-0"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
