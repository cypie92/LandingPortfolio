"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database.types";
import Reveal from "./animations/Reveal";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const supabase = createClient();

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .limit(4);

            if (data) {
                setCategories(data);
            }
        }

        fetchCategories();
    }, []);

    // Helper to get icon for category (could be stored in DB later)
    const getIcon = (slug: string) => {
        switch (slug) {
            case 'power-tools': return 'tools_power_drill';
            case 'plumbing': return 'plumbing';
            case 'electrical': return 'electrical_services';
            case 'gardening': return 'yard';
            case 'hand-tools': return 'handyman';
            case 'workwear': return 'safety_check';
            default: return 'category';
        }
    };

    return (
        <section className="py-12">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between mb-8">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display">Categories</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <Link href="/categories" className="text-slate-900 dark:text-white hover:text-primary text-sm font-bold flex items-center gap-1 transition-colors group">
                            View All Categories
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                                chevron_right
                            </span>
                        </Link>
                    </Reveal>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/categories/${category.slug}`} className="group block relative overflow-hidden rounded-lg bg-surface-dark border border-border-dark hover:border-primary transition-colors duration-300 h-full aspect-square">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${category.image_url || '/placeholder.jpg'}')`,
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                                    <span className="material-symbols-outlined text-primary mb-2 text-3xl">{getIcon(category.slug)}</span>
                                    <h3 className="text-white font-bold text-lg font-display">{category.name}</h3>
                                    <p className="text-text-secondary text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 line-clamp-2">
                                        {category.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Fallback skeleton while loading or if empty */}
                    {categories.length === 0 && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-200 dark:bg-surface-dark rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );
}
