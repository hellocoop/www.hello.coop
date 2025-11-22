'use client';

import { useEffect } from "react";
import { navLinks, socialIcons } from "@/lib/nav-links";

export default function Header() {
    useEffect(() => {
        handleNavMenu();
    }, []);
    async function handleNavMenu() {
        const mobileNavToggle = document.querySelector('#movile-nav-toggle');
        const mobileNavDropdown = document.querySelector('#mobile-nav-dropdown');
        mobileNavToggle.onclick = () => {
            mobileNavDropdown.classList.toggle('hidden');
            if (mobileNavDropdown.classList.contains('hidden')) {
                document.body.classList.remove('overflow-y-hidden');
            } else {
                document.body.classList.add('overflow-y-hidden');
            }
        }
        window.onresize = () => {
            if (window.innerWidth > 768) {
                document.body.classList.remove('overflow-y-hidden');
            }
        }
    }
    return (
        <header className="bg-charcoal font-medium w-full h-12 sticky top-0 z-10 text-white dark:text-gray relative z-50">
            <div className="max-w-[88rem] mx-auto flex items-center justify-between h-full px-4 relative">
                <div className="flex items-center h-full">
                    <a
                        href="/"
                        className="font-semibold text-center text-xl mr-8 no-global-hover hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none [mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%] hover:[mask-position:100%]"
                    >
                        Hellō
                    </a>
                    <ul className="hidden md:flex items-center justify-left h-full">
                        <li
                            id="nav-products"
                            className="relative cursor-pointer h-full flex items-center justify-center transition-all group/li"
                        >
                            <a
                                href="/products"
                                className="no-global-hover opacity-75 flex items-center space-x-1 group-hover/li:opacity-100 transition-all rounded-t-md group-hover/li:bg-[#434343] px-3 pb-3 -mb-2 pt-1 z-60"
                            >
                                <span>{navLinks.products.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3 mt-0.5 opacity-50 group-hover/li:opacity-100 transition-all group-hover/li:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </a>
                            <div
                                id="nav-products-dropdown"
                                className="invisible group-hover/li:visible absolute top-6 left-0 w-70"
                            >
                                <div className="bg-[#434343] p-4 mt-6 opacity-0 group-hover/li:opacity-100 rounded-b-sm rounded-tr-sm perspective-1000 perspective-origin-top rotate-x-75 origin-top group-hover/li:-rotate-x-0 transition-all">
                                    <ul className="space-y-4">
                                        {navLinks.products.items.map((item, index) => (
                                            <li key={index} className="flex flex-col">
                                                <a
                                                    href={item.href}
                                                    className="flex flex-col no-global-hover group p-2 -m-2 hover:bg-charcoal rounded-sm transition-all"
                                                >
                                                    <span>{item.title}</span>
                                                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-all">
                                                        {item.subtitle}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li
                            id="nav-dev-resources"
                            className="relative cursor-pointer h-full flex items-center justify-center group/li transition-all"
                        >
                            <div className="opacity-75 flex items-center space-x-1 group-hover/li:opacity-100 transition-all rounded-t-md group-hover/li:bg-[#434343] px-3 pb-3 -mb-2 pt-1">
                                <span>{navLinks.devResources.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3 mt-0.5 opacity-50 group-hover/li:opacity-100 transition-all group-hover/li:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <div
                                id="nav-dev-resources-dropdown"
                                className="invisible group-hover/li:visible absolute top-6 left-0 w-70"
                            >
                                <div className="bg-[#434343] p-4 mt-6 opacity-0 group-hover/li:opacity-100 rounded-b-sm rounded-tr-sm perspective-1000 perspective-origin-top rotate-x-75 origin-top group-hover/li:-rotate-x-0 transition-all">
                                    <ul className="space-y-4">
                                        {navLinks.devResources.items.map((item, index) => (
                                            <li key={index} className="flex flex-col">
                                                <a
                                                    href={item.href}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                    className="flex flex-col no-global-hover group p-2 -m-2 hover:bg-charcoal rounded-sm transition-all"
                                                >
                                                    <span className={item.external ? "ext-link-icon" : ""}>{item.title}</span>
                                                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-all">
                                                        {item.subtitle}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li
                            id="nav-company"
                            className="relative cursor-pointer h-full flex items-center justify-center group/li transition-all"
                        >
                            <div className="opacity-75 flex items-center space-x-1 group-hover/li:opacity-100 transition-all rounded-t-md group-hover/li:bg-[#434343] px-3 pb-3 -mb-2 pt-1">
                                <span>{navLinks.company.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3 mt-0.5 opacity-50 group-hover/li:opacity-100 transition-all group-hover/li:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <div
                                id="nav-company-dropdown"
                                className="invisible group-hover/li:visible absolute top-6 left-0 w-70"
                            >
                                <div className="bg-[#434343] p-4 mt-6 opacity-0 group-hover/li:opacity-100 rounded-b-sm rounded-tr-sm perspective-1000 perspective-origin-top rotate-x-75 origin-top group-hover/li:-rotate-x-0 transition-all">
                                    <ul className="space-y-4">
                                        {navLinks.company.items.map((item, index) => (
                                            <li key={index} className="flex flex-col">
                                                <a
                                                    href={item.href}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                    className="flex flex-col no-global-hover group p-2 -m-2 hover:bg-charcoal rounded-sm transition-all"
                                                >
                                                    <span className={item.external ? "ext-link-icon" : ""}>{item.title}</span>
                                                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-all">
                                                        {item.subtitle}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li
                            id="nav-social"
                            className="relative cursor-pointer h-full flex items-center justify-center group/li transition-all"
                        >
                            <div className="opacity-75 flex items-center space-x-1 group-hover/li:opacity-100 transition-all rounded-t-md group-hover/li:bg-[#434343] px-3 pb-3 -mb-2 pt-1">
                                <span>{navLinks.social.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3 mt-0.5 opacity-50 group-hover/li:opacity-100 transition-all group-hover/li:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <div
                                id="nav-social-dropdown"
                                className="invisible group-hover/li:visible absolute top-6 left-0 w-70"
                            >
                                <div className="bg-[#434343] p-4 mt-6 opacity-0 group-hover/li:opacity-100 rounded-b-sm rounded-tr-sm perspective-1000 perspective-origin-top rotate-x-75 origin-top group-hover/li:-rotate-x-0 transition-all">
                                    <ul className="space-y-4">
                                        {navLinks.social.items.map((item, index) => (
                                            <li key={index} className="flex flex-col">
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col no-global-hover group p-2 -m-2 hover:bg-charcoal rounded-sm transition-all"
                                                >
                                                    <div className="flex space-x-2">
                                                        {item.icon && socialIcons[item.icon]}
                                                        <span className="ext-link-icon">{item.title}</span>
                                                    </div>
                                                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-all">
                                                        {item.subtitle}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="text-right">
                    <a
                        href="mailto:contact@hello.coop?subject=Hellō Inquiry"
                        className="hidden md:inline-block"
                    >
                        Contact
                    </a>
                    <div className="md:hidden flex items-center justify-left">
                        <button
                            id="movile-nav-toggle"
                            className="cursor-pointer opacity-50 hover:opacity-100 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div
                id="mobile-nav-dropdown"
                className="hidden md:hidden px-4 max-w-6xl mx-auto pb-12 pt-0 bg-charcoal fixed h-screen w-full overflow-y-auto top-12 left-0 right-0 z-40"
            >
                <div className="text-right">
                    <a
                        href="mailto:contact@hello.coop?subject=Hellō Inquiry"
                        className="text-right !opacity-100"
                    >
                        Contact
                    </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-4 pb-4">
                    {Object.values(navLinks).map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <span>{section.title}</span>
                            <ul className="space-y-2 mt-2">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <a
                                            href={item.href}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            className={item.icon ? "inline-flex items-center space-x-2" : item.external ? "ext-link-icon" : ""}
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
            </div>
        </header>

    );
}