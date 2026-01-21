"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database.types";
import Reveal from "./animations/Reveal";

type Post = Database["public"]["Tables"]["posts"]["Row"];

export default function NewsBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const supabase = createClient();

    useEffect(() => {
        async function fetchPosts() {
            const { data } = await supabase
                .from("posts")
                .select("*")
                .order("published_at", { ascending: false })
                .limit(3);

            if (data) {
                setPosts(data);
            }
        }

        fetchPosts();
    }, []);

    return (
        <section className="py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <Reveal>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display mb-2">
                                News Blog
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="text-text-secondary">
                                Expert advice for your next project.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.1}>
                        <Link href="/blog" className="hidden md:flex items-center gap-1 text-slate-900 dark:text-white hover:text-primary text-sm font-bold transition-colors group">
                            Visit the Blog
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                                chevron_right
                            </span>
                        </Link>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Reveal key={post.id} delay={0.2 + (index * 0.1)} className="h-full">
                                <Link href={`/blog/${post.slug}`} className="block h-full">
                                    <article className="group cursor-pointer bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-border-dark overflow-hidden flex flex-col h-full hover:border-primary/50 transition-colors">
                                        <div className="relative h-48 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{
                                                    backgroundImage: `url('${post.image_url || '/placeholder.jpg'}')`,
                                                }}
                                            ></div>
                                            {post.category && (
                                                <div className="absolute top-4 left-4 bg-background-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-sm border border-border-dark">
                                                    {post.category}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-text-secondary text-xs mb-3 font-medium">
                                                <span className="material-symbols-outlined text-sm">schedule</span> {post.read_time || '5 min read'}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-3 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read Article <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            </Reveal>
                        ))
                    ) : (
                        // Skeleton Loading States
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-[400px] bg-gray-200 dark:bg-surface-dark rounded-lg animate-pulse" />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
