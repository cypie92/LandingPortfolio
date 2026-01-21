"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cartStore";
import { Database } from "@/types/database.types";
import { motion } from "framer-motion";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
    const { addItem } = useCartStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[280px] md:min-w-[300px] snap-center bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-border-dark p-4 group hover:border-primary/50 transition-colors"
        >
            <Link href={`/products/${product.slug}`} className="block h-full">
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-black/20 rounded-md overflow-hidden mb-4">
                    {product.images && product.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                            <span className="material-symbols-outlined text-4xl text-gray-400">image_not_supported</span>
                        </div>
                    )}

                    {/* Placeholder for "New" or "Sale" badge logic could go here */}

                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation to product page
                            e.stopPropagation();
                            addItem(product);
                        }}
                        className="absolute bottom-2 right-2 size-10 bg-white dark:bg-background-dark text-primary rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 active:scale-95"
                    >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold font-display text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-text-secondary text-sm mb-3 text-ellipsis overflow-hidden whitespace-nowrap">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${product.price}</span>
                    <div className="flex text-yellow-500 text-sm">
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
