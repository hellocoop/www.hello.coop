'use client';

import { useState, useEffect } from 'react';
import OffboardingAnimation from "@/components/animations/offboarding-anim";

export default function GitHubOffboarding({showTitle = true}) {
    const [waitlistUrl, setWaitlistUrl] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const returnUri = encodeURIComponent(`${window.location.origin}${window.location.pathname}#github-offboarding`);
            setWaitlistUrl(`https://wallet.hello.coop/waitlist?waitlist_label=GitHub+Offboarding&return_uri=${returnUri}`);
        }
    }, []);

    return (
        <div id="github-offboarding" className="scroll-mt-20">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                    GitHub Offboarding
                </h1>
            )}
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
                                        href={waitlistUrl}
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
    );
}