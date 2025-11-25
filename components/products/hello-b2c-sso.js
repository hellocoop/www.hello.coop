export default function HelloB2BSSO({ showTitle = true, compact = false }) {
    return (
        <div id="hello-b2c-sso" className="text-[17px]">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">Hellō B2C SSO</h1>
            )}
            {/* <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                        Give users choice of 17 providers
                    </h2> */}
            <div className="card !p-0 !py-[1.125rem] !my-0">
                <div className="card-description">
                    {compact ? (
                        <span className="py-4 md:py-12 text-lg opacity-65 font-medium">
                            {' '}
                            You choose which providers are promoted.
                            <br />
                            Users choose their preferred login provider.
                        </span>
                    ) : (
                        <div className="mt-6 space-y-4">
                            <p>
                                One integration that gives your users the freedom to choose from 17
                                different login providers including Google, Apple, Microsoft,
                                GitHub, and more. Get verified emails and profile pictures without
                                complex account linking.
                            </p>
                            <p>
                                Perfect for consumer-facing applications that want to eliminate
                                passwords while giving users control over their preferred
                                authentication method.
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col space-y-4">
                        <span className="text-base font-semibold">Price: FREE</span>
                        <div className="gap-2 flex flex-col items-start">
                            <a
                                href="https://www.hello.dev/docs/getting-started/"
                                target="_blank"
                                className="card-link-primary no-global-hover"
                                rel="noreferrer"
                            >
                                Get started
                                <svg width={10} height={10} fill="currentColor" className="ml-2">
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
                                rel="noreferrer"
                            >
                                Try out the B2C demo
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
                <picture className="card-phone-shadow-bottom h-full relative md:static pt-2 md:pt-0 overflow-hidden md:overflow-auto mb-2">
                    <source srcSet="/b2c-dark.png" media="(prefers-color-scheme: dark)" />
                    <img
                        src="/b2c-light.png"
                        alt="phone showing continue with apple, google, and email buttons"
                        className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[500px] md:absolute md:right-0 mask-b-from-50% mask-b-to-90%"
                        style={{ animation: 'float 3s infinite' }}
                    />
                </picture>
            </div>
        </div>
    )
}
