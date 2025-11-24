export default function HelloB2BSSO({showTitle = true}) {
    return (
        <div id="hello-b2c-sso">
        {showTitle && (
            <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                Hellō B2C SSO
            </h1>
        )}
        <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
            Give users choice of 17 providers
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
    );
}