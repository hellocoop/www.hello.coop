'use client';

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function BlogFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function processFeed() {
            try {
                const res = await fetch("https://blog.hello.coop/feed");
                const txt = await res.text();
                const xml = new window.DOMParser().parseFromString(txt, "text/xml");
                const allPosts = [...xml.querySelectorAll("item")];

                const filtered = allPosts.slice(0, 3); // your current behaviour

                const mapped = filtered.map(post => {
                    const title = post.querySelector("title")?.textContent ?? "";
                    const rawDescription = post.querySelector("description")?.textContent ?? "";
                    const descPlaceholder = document.createElement("div");
                    descPlaceholder.innerHTML = rawDescription;
                    const description = descPlaceholder.textContent ?? "";

                    return {
                        title,
                        description,
                        url: post.querySelector("link")?.textContent,
                        image: post.querySelector("content")?.getAttribute("url"),
                        date: dayjs(post.querySelector("pubDate")?.textContent)
                            .subtract(8, "hours")
                            .format("ddd, DD MMM YYYY"),
                    };
                });

                setPosts(mapped);
            } catch (err) {
                console.error(err);
                setError("Oops! Failed to fetch latest feed from blog.hello.coop");
            } finally {
                setLoading(false);
            }
        }

        processFeed();
    }, []);

    return (
        <div>
            <ul className="mt-10 md:mt-16 space-y-10">
                {loading && (
                    <span className="text-lg md:text-2xl opacity-50 text-center mt-10 md:mt-16 block h-44 flex items-center justify-center">
                        Fetching latest feed from blog.hello.coop...
                    </span>
                )}

                {error && (
                    <span className="text-lg md:text-2xl opacity-50 block text-center h-44 flex items-center justify-center">
                        {error}
                    </span>
                )}

                {!loading && !error &&
                    posts.map((p, i) => (
                        <li key={i}>
                            <a
                                href={p.url}
                                target="_blank"
                                className="no-global-hover flex flex-col md:flex-row items-center gap-5 md:gap-10 hover:bg-charcoal/10 dark:hover:bg-gray/10 rounded-md p-4 -m-4 transition-all"
                            >
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full md:w-1/3 rounded-sm flex-shrink-0"
                                />
                                <div>
                                    <span className="text-base md:text-xl opacity-50">{p.date}</span>
                                    <h3 className="text-xl md:text-2xl font-semibold my-3 md:my-4">
                                        {p.title}
                                    </h3>
                                    <p className="text-base md:text-lg lg:text-xl line-clamp-3 opacity-65">
                                        {p.description}
                                    </p>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
