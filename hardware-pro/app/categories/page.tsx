import { createClient } from "@/utils/supabase/server";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Database } from "@/types/database.types";
import Reveal from "../components/animations/Reveal";
import * as motion from "framer-motion/client";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default async function CategoriesPage() {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            {/* Header */}
            <div className="relative bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10 text-center">
                    <Reveal>
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 dark:text-white mb-6">Shop by Category</h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                            Explore our comprehensive range of professional-grade tools and hardware.
                            Everything you need for your next project, organized for easy access.
                        </p>
                    </Reveal>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                {error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-lg inline-block">
                            Failed to load categories. Please try again later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories?.map((category, index) => (
                            <Reveal key={category.id} delay={index * 0.1}>
                                <Link
                                    href={`/categories/${category.slug}`}
                                    className="group block relative bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-gray-200 dark:border-border-dark"
                                >
                                    <div className="aspect-[4/3] bg-gray-100 dark:bg-[#1A1D21] relative overflow-hidden">
                                        {category.image_url ? (
                                            <img
                                                src={category.image_url}
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-50 dark:bg-zinc-900">
                                                <span className="material-symbols-outlined text-6xl opacity-50">category</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <h2 className="text-3xl font-bold text-white font-display mb-2">{category.name}</h2>
                                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                                    <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                        {category.description || "Discover high-quality tools in this collection."}
                                                    </p>
                                                    <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                                        Explore Collection
                                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
