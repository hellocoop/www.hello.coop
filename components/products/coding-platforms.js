export default function CodingPlatforms({showTitle = true}) {
    return (
        <div id="coding-platforms">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">
                    Coding Platforms
                </h1>
            )}
            {/* <h2 className="text-xl md:text-3xl opacity-50 mt-0 md:mt-4">
                Let devs add identity in seconds
            </h2> */}
                    <div className="card !p-0 !py-[1.125rem] !my-0">
                        <div className="card-description">
                            <div className="mt-6 space-y-4">
                                <p>
                                    <span className="font-semibold mb-2 block">
                                        For developers:
                                    </span>
                                    Use our Admin MCP server with AI coding assistants to create and
                                    manage Hellō applications from your IDE. No context switching,
                                    just natural language commands.
                                </p>
                                <p>
                                    <span className="font-semibold mb-2 block">
                                        For platforms:
                                    </span>
                                    Integrate our Admin APIs to manage Hellō applications for your
                                    customers. OAuth-based authorization lets you provision and
                                    configure apps programmatically, enabling zero-friction identity
                                    without users leaving your platform.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="text-base font-semibold">
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
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[450px] md:absolute md:right-0 md:top-0 z-20 md:bottom-0"
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
                                    className="w-full md:w-auto -mb-4 md:-mb-0 md:mt-0 md:h-[450px] md:absolute md:right-0 md:top-0 md:bottom-0"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
    );
}