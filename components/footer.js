import { navLinks, socialIcons } from '@/lib/nav-links'

export default function Footer() {
    return (
        <footer className="flex font-medium flex-col justify-center w-full items-center max-w-6xl mx-auto px-4">
            <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {Object.values(navLinks).map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <span>{section.title}</span>
                        <ul className="space-y-2 mt-2">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <a
                                        href={item.href}
                                        target={item.external ? '_blank' : undefined}
                                        rel={item.external ? 'noopener noreferrer' : undefined}
                                        className={
                                            item.icon
                                                ? 'inline-flex items-center space-x-2'
                                                : item.external
                                                  ? 'ext-link-icon'
                                                  : ''
                                        }
                                    >
                                        {item.icon && socialIcons[item.icon]}
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl w-full h-12 flex items-center justify-center border-t border-charcoal/15 dark:border-gray/15 text-xs md:text-sm space-x-2">
                <div className="flex items-center space-x-4 py-2 md:py-0">
                    <a href="/terms-of-service.html">Terms of Service</a>
                    <a href="/privacy-policy.html">Privacy Policy</a>
                    <a href="/trademark-disclaimer">Trademark Disclaimer</a>
                </div>
            </div>
        </footer>
    )
}
