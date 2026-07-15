export default function AgentProxy({ showTitle = true, compact = false }) {
    return (
        <div id="agent-proxy" className="text-[17px]">
            {showTitle && (
                <h1 className="text-[1.35rem] md:text-5xl font-semibold">Hellō Agent Proxy</h1>
            )}
            <div className="card !p-0 !py-[1.125rem] !my-0">
                <div className="card-description">
                    {compact ? (
                        <div className="py-4 md:py-12 text-lg opacity-65 font-medium">
                            <span className="block">
                                Let your AI agent use your apps — Gmail, Calendar, and more — with
                                your consent, without ever handing it your passwords or tokens.
                            </span>
                            <span className="block mt-6">
                                An AAuth-to-OAuth bridge: you approve what your agent may do, and
                                Hellō holds the connection and checks every request against your
                                approval.
                            </span>
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            <p>
                                The Hellō Agent Proxy is an{' '}
                                <span className="font-semibold">AAuth-to-OAuth bridge</span>. It
                                lets you authorize your own AI agent to access your own data at the
                                services you use — Gmail, Google Calendar, Contacts, Tasks, Search
                                Console, Analytics, and more — without ever giving the agent your
                                credentials or OAuth tokens.
                            </p>
                            <p>
                                <span className="font-semibold mb-2 block">
                                    You stay in control:
                                </span>
                                You grant a narrow, named set of actions — not blanket access — and
                                can see and revoke exactly what each agent may do, per service and
                                per account. Your agent asks your Person Server for permission;
                                Hellō holds the connection and checks every request against what you
                                approved.
                            </p>
                            <p>
                                <span className="font-semibold mb-2 block">
                                    Consent gates sensitive actions:
                                </span>
                                Reads are granted once. Actions that cannot be undone — sending an
                                email, deleting data — require a fresh approval that shows the exact
                                action before it happens. A standing grant to “send email” is never
                                a license to send any particular email.
                            </p>
                            <p className="opacity-65">
                                Operated by Hello Identity Co-op. Your data is fetched on your
                                behalf, for you — never used for advertising, sold, or warehoused.
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col space-y-4">
                        <span className="text-base font-semibold">Status: Preview</span>
                        <div className="gap-2 flex flex-col items-start">
                            <a href="/privacy-policy" className="card-link-primary no-global-hover">
                                Read our privacy commitments
                                <svg width={10} height={10} fill="currentColor" className="ml-2">
                                    <g>
                                        <path className="line" d="M 0 5 H 7" />
                                        <path className="tip" d="M 5 10 L 10 5 L 5 0" />
                                    </g>
                                </svg>
                            </a>
                            <a
                                href="mailto:contact@hello.coop?subject=Hell%C5%8D%20Agent%20Proxy"
                                className="card-link-secondary no-global-hover"
                            >
                                Get in touch
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
            </div>
        </div>
    )
}
