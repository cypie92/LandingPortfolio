import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Reveal from "../components/animations/Reveal";

export const metadata = {
    title: "News Blog | HardwarePro",
    description: "Expert advice, tool reviews, and safety guides for your next project.",
};

export default async function BlogListPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            <main className="py-16 md:py-24">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Reveal>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-display mb-4">
                                The Workbench
                            </h1>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="text-text-secondary text-lg">
                                Expert advice, in-depth reviews, and practical guides to help you build better.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts?.map((post, index) => (
                            <Reveal key={post.id} delay={index * 0.1}>
                                <Link href={`/blog/${post.slug}`} className="block h-full group">
                                    <article className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col">
                                        <div className="relative h-56 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: `url('${post.image_url || '/placeholder.jpg'}')` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                                                {post.category}
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-base">calendar_today</span>
                                                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-base">schedule</span>
                                                    {post.read_time}
                                                </span>
                                            </div>

                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-3 group-hover:text-primary transition-colors leading-tight">
                                                {post.title}
                                            </h2>

                                            <p className="text-text-secondary line-clamp-3 mb-6 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                                                Read Article
                                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    {!posts?.length && (
                        <div className="text-center py-20 text-text-secondary">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">article</span>
                            <p className="text-xl">No articles found. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
