'use client'

import { useState, useEffect } from 'react'
import LifecycleAnimation from '@/components/animations/lifecycle-anim'

export default function HelloLifecycle({ showTitle = true, compact = false }) {
    const [waitlistUrl, setWaitlistUrl] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const returnUri = encodeURIComponent(
                `${window.location.origin}${window.location.pathname}#hello-lifecycle`
            )
            setWaitlistUrl(
                `https://wallet.hello.coop/waitlist?waitlist_label=Hell%C5%8D+Lifecycle&return_uri=${returnUri}`
            )
        }
    }, [])

    return (
        <div id="hello-lifecycle" className="scroll-mt-20 text-[17px]">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">Hellō Lifecycle</h1>
            )}
            {/* <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                Add offboarding to your B2B app
            </h2> */}
            <div className="card !p-0 !py-[1.125rem] !my-0">
                <div className="card-description">
                    {compact ? (
                        <ol className="py-4 !space-y-2 md:py-12 text-lg opacity-65 font-medium">
                            <li>
                                Your customers link their
                                <br />
                                corporate directory.
                            </li>
                            <li>
                                Hellō sends your app a notification
                                <br />
                                when a user leaves.
                            </li>
                        </ol>
                    ) : (
                        <div className="mt-6 space-y-4">
                            <p>
                                Automate user deprovisioning for your B2B SaaS application. Your
                                customers' tenant admins connect their corporate directory
                                (Microsoft Entra, Google Workspace, etc.) through Hellō.
                            </p>
                            <p>
                                When an employee is deprovisioned in their directory, Hellō
                                automatically notifies your application via OpenID Provider Command,
                                allowing you to suspend or remove access immediately. Give your
                                enterprise customers the automated offboarding they expect.
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col space-y-4">
                        <span className="text-base font-semibold">Coming Q1 2026</span>
                        <div className="gap-2 flex flex-col md:flex-row items-start">
                            <a
                                href={waitlistUrl}
                                id="hello-lifecycle-join-waitlist-btn"
                                className="card-link-primary no-global-hover cursor-pointer"
                            >
                                Join the waitlist
                                <svg width={10} height={10} fill="currentColor" className="ml-2">
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
                    <LifecycleAnimation />
                </div>
            </div>
        </div>
    )
}
