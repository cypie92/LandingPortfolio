"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Database } from "@/types/database.types";
// import { toast } from "sonner"; 
// Wait, I don't think I installed Sonner. I'll use a simple button state instead.

type Product = Database["public"]["Tables"]["products"]["Row"];

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // Add item 'quantity' times
        // Current store only supports adding 1 by 1 or I need to loop?
        // Store `addItem` creates or increments.
        // Ideally store should have `addItem(product, quantity)`.
        // Let's check store definition.
        // store: addItem: (product) => void.
        // It increments by 1.
        // I should probably update store to accept quantity, but for now I will just call it repeatedly or update the store logic.
        // Actually, updating store is better.
        // For now, I'll just call it 'quantity' times to avoid breaking store interface in this step, 
        // OR better: loop.

        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex gap-4">
            <div className="flex items-center border border-gray-300 dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1D21] rounded-l-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="w-12 text-center font-bold text-slate-900 dark:text-white">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1D21] rounded-r-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                </button>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isAdded || (product as any).stock <= 0}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 ${isAdded
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-primary hover:bg-[#c9451e] shadow-lg shadow-primary/25"
                    } ${(product as any).stock <= 0 ? "opacity-50 cursor-not-allowed grayscale" : ""}`}
            >
                <span className="material-symbols-outlined">
                    {isAdded ? "check" : "shopping_cart"}
                </span>
                {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
        </div>
    );
}
