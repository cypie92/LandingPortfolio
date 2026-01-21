"use client";

import { useRef } from "react";
import { Database } from "@/types/database.types";
import ProductCard from "./ProductCard";
import Reveal from "./animations/Reveal";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function NewArrivalsClient({ products }: { products: Product[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const targetScroll = direction === "left"
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-12 bg-white dark:bg-[#1A1D21] border-y border-gray-200 dark:border-border-dark">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between mb-8">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-display mb-1">
                            New Arrivals
                        </h2>
                        <p className="text-text-secondary text-sm">Fresh from the factory floor.</p>
                    </Reveal>
                    <Reveal delay={0.2} className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="size-10 rounded-full border border-gray-300 dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors active:scale-95"
                            aria-label="Scroll left"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="size-10 rounded-full border border-gray-300 dark:border-border-dark flex items-center justify-center hover:border-primary hover:text-primary transition-colors active:scale-95"
                            aria-label="Scroll right"
                        >
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </Reveal>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                >
                    {products?.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}

                    {/* Empty state or skeleton could go here if products is empty */}
                    {!products?.length && (
                        <div className="text-center py-10 w-full text-text-secondary">
                            No new arrivals yet.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
