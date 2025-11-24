export const navLinks = {
    products: {
        title: "Products",
        items: [
            {
                title: "Hellō B2C SSO",
                href: "/products#hello-b2c-sso",
                subtitle: "Give users choice of 17 providers"
            },
            {
                title: "Hellō B2B SSO",
                href: "/products#hello-b2b-sso",
                subtitle: "Zero configuration enterprise SSO"
            },
            {
                title: "Hellō Lifecycle",
                href: "/products#hello-lifecycle",
                subtitle: "Add offboarding to your B2B App"
            },
            {
                title: "GitHub Offboarding",
                href: "/products#github-offboarding",
                subtitle: "Simplify & automate compliance"
            },
            {
                title: "Coding Platforms",
                href: "/products#coding-platforms",
                subtitle: "Let devs add identity in seconds"
            }
        ]
    },
    devResources: {
        title: "Dev Resources",
        items: [
            {
                title: "Developer Docs",
                href: "https://hello.dev/",
                subtitle: "Guides, APIs, and tutorials",
                external: true
            },
            {
                title: "Developer Console",
                href: "https://console.hello.coop/",
                subtitle: "Create and manage applications",
                external: true
            },
            {
                title: "Playground",
                href: "https://playground.hello.dev/",
                subtitle: "Try Hellō features interactively",
                external: true
            },
            {
                title: "MCP Server",
                href: "https://www.hello.dev/docs/admin-mcp/",
                subtitle: "Manage apps from your IDE",
                external: true
            },
            {
                title: "Status Page",
                href: "https://status.hello.coop/",
                subtitle: "System status and uptime",
                external: true
            }
        ]
    },
    company: {
        title: "Company",
        items: [
            {
                title: "Cooperative Approach",
                href: "/approach/",
                subtitle: "Our identity solution explained"
            },
            {
                title: "Protecting Privacy",
                href: "/approach/laws-of-identity",
                subtitle: "Following the Laws of Identity"
            },
            {
                title: "Open Standards",
                href: "/approach/standards",
                subtitle: "Creating a #BetterInternet"
            },
            {
                title: "Hellō Blog",
                href: "https://blog.hello.coop/",
                subtitle: "blog.hello.coop",
                external: true
            }
        ]
    },
    social: {
        title: "Social",
        items: [
            {
                title: "Slack",
                href: "https://hello-community.slack.com/join/shared_invite/zt-1eccnd2np-qJoOWBkHGnpxvBpCTtaH9g",
                subtitle: "Join our community channel",
                external: true,
                icon: "slack"
            },
            {
                title: "GitHub",
                href: "https://github.com/HelloCoop",
                subtitle: "github.com/HelloCoop",
                external: true,
                icon: "github"
            },
            {
                title: "LinkedIn",
                href: "https://www.linkedin.com/company/HelloCoop/",
                subtitle: "linkedin.com/company/HelloCoop",
                external: true,
                icon: "linkedin"
            },
            {
                title: "Twitter",
                href: "https://x.com/HelloCoop",
                subtitle: "x.com/HelloCoop",
                external: true,
                icon: "x"
            },
            {
                title: "YouTube",
                href: "https://www.youtube.com/@HelloCoop",
                subtitle: "youtube.com/@HelloCoop",
                external: true,
                icon: "youtube"
            }
        ]
    }
};

// SVG icons for social links
export const socialIcons = {
    slack: (
        <svg role="img" className="w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <title>Slack</title>
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
    ),
    github: (
        <svg role="img" className="w-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    ),
    linkedin: (
        <svg className="w-3.5" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    x: (
        <svg role="img" className="w-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>X</title>
            <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
        </svg>
    ),
    youtube: (
        <svg role="img" className="w-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <title>YouTube</title>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    )
};

