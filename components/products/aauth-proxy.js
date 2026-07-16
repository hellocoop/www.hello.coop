export default function AauthProxy({ showTitle = true, compact = false }) {
    return (
        <div id="aauth-proxy" className="scroll-mt-20 text-[17px]">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">Hellō AAuth Proxy</h1>
            )}
            <div className="card !p-0 !py-[1.125rem] !my-0">
                <div className="card-description">
                    {compact ? (
                        <div className="py-4 md:py-12 text-lg opacity-65 font-medium">
                            <ol className="!space-y-1">
                                <li>OAuth was designed for a deterministic world.</li>
                                <li>AAuth was designed for agents and giving you control.</li>
                            </ol>
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            <p>
                                OAuth was designed for a deterministic world where we knew in
                                advance what software would do.
                            </p>
                            <p>
                                AAuth was built for agents. Instead of handing over a token up front
                                and trusting the software to stay in bounds, AAuth lets an agent ask
                                for what it needs as it works — and puts you in the loop for
                                anything that can’t be undone, like sending an email.
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col space-y-4">
                        <span className="text-base font-semibold">Status: Preview</span>
                        <p className="opacity-75 font-medium">For access: </p>
                        <div className="gap-2 flex flex-col md:flex-row items-start">
                            <a
                                href="https://www.aauth.dev/slack"
                                target="_blank"
                                rel="noreferrer"
                                id="aauth-proxy-join-slack-btn"
                                className="card-link-primary no-global-hover cursor-pointer"
                            >
                                Join the AAuth Slack
                                <svg width={10} height={10} fill="currentColor" className="ml-2">
                                    <g>
                                        <path className="line" d="M 0 5 H 7" />
                                        <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <p className="opacity-75 font-medium">and DM @DickHardt</p>
                    </div>
                </div>
                {/* Placeholder flow graphic — simple monochrome line art in the house
                    palette (currentColor: charcoal on light, gray on dark). Interim until
                    a doodle animation in the established style replaces it. */}
                <AauthProxyGraphic />
            </div>
        </div>
    )
}

// agent —AAuth→ Hellō (consent) —OAuth→ your apps
function AauthProxyGraphic() {
    return (
        <div className="text-charcoal dark:text-gray w-full md:w-2/3 flex items-center justify-center overflow-hidden py-6 md:py-0">
            <svg
                viewBox="0 0 360 150"
                role="img"
                aria-label="Your agent connects over AAuth to the Hellō proxy, which checks your consent and connects over OAuth to your apps"
                className="w-full h-auto max-w-[420px] mx-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* agent */}
                <rect x="14" y="46" width="70" height="58" rx="12" />
                <circle cx="40" cy="72" r="2.5" fill="currentColor" stroke="none" />
                <circle cx="58" cy="72" r="2.5" fill="currentColor" stroke="none" />
                <path d="M 40 84 h 18" />
                <text
                    x="49"
                    y="122"
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                    stroke="none"
                >
                    agent
                </text>

                {/* AAuth */}
                <text
                    x="122"
                    y="66"
                    textAnchor="middle"
                    fontSize="11"
                    fill="currentColor"
                    stroke="none"
                >
                    AAuth
                </text>
                <line x1="90" y1="75" x2="150" y2="75" />
                <path d="M 145 70 L 152 75 L 145 80" />

                {/* Hellō AAuth Proxy */}
                <rect x="158" y="40" width="70" height="70" rx="14" />
                <text x="193" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none">
                    <tspan x="193" y="70">
                        Hellō
                    </tspan>
                    <tspan x="193" y="83">
                        AAuth
                    </tspan>
                    <tspan x="193" y="96">
                        Proxy
                    </tspan>
                </text>

                {/* OAuth */}
                <text
                    x="262"
                    y="66"
                    textAnchor="middle"
                    fontSize="11"
                    fill="currentColor"
                    stroke="none"
                >
                    OAuth
                </text>
                <line x1="234" y1="75" x2="294" y2="75" />
                <path d="M 289 70 L 296 75 L 289 80" />

                {/* apps */}
                <rect x="302" y="52" width="20" height="20" rx="4" />
                <rect x="326" y="52" width="20" height="20" rx="4" />
                <rect x="302" y="78" width="20" height="20" rx="4" />
                <rect x="326" y="78" width="20" height="20" rx="4" />
                <text
                    x="324"
                    y="122"
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                    stroke="none"
                >
                    apps
                </text>
            </svg>
        </div>
    )
}
