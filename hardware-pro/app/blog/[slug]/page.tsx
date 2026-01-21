

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/animations/Reveal";
import { Database } from "@/types/database.types";

type Post = Database["public"]["Tables"]["posts"]["Row"];

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const supabase = await createClient();
    const { slug } = await params;

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.image_url || '/placeholder.jpg'}')` }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <Reveal>
                        <div className="inline-block bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider mb-4">
                            {post.category || 'Blog'}
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6 leading-tight">
                            {post.title}
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="flex items-center justify-center gap-6 text-gray-300 text-sm font-medium">
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">person</span>
                                {post.author || 'Hardware Pro Team'}
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">schedule</span>
                                {post.read_time || '5 min read'}
                            </span>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-3xl mx-auto px-4 py-16 md:py-24">
                <Reveal delay={0.3}>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-xl text-text-secondary leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
                            {post.excerpt}
                        </p>
                        <div className="text-slate-900 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {post.content || 'Content coming soon...'}
                        </div>
                    </div>
                </Reveal>
            </article>
        </div>
    );
}
