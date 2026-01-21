"use client";

import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function CartDrawer() {
    const { isOpen, items, toggleCart, removeItem, updateQuantity, totalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black z-[60] backdrop-blur-sm"
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white dark:bg-surface-dark border-l border-border-dark shadow-2xl flex flex-col"
                    >
                        <div className="p-4 border-b border-border-dark flex items-center justify-between">
                            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Your Cart</h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 dark:hover:bg-background-dark rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center py-10">
                                    <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">shopping_cart_off</span>
                                    <p className="text-text-secondary">Your cart is empty.</p>
                                    <button onClick={toggleCart} className="mt-4 text-primary font-bold hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-background-dark rounded-lg border border-border-dark">
                                        {/* Image */}
                                        <div className="size-20 bg-white rounded-md flex items-center justify-center overflow-hidden shrink-0">
                                            {item.images && item.images[0] ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-gray-400">image</span>
                                            )}
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                                                <p className="text-primary font-bold">${item.price}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-border-dark rounded px-2 py-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary">-</button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary">+</button>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-4 border-t border-border-dark bg-gray-50 dark:bg-background-dark">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-text-secondary">Subtotal</span>
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">${totalPrice().toFixed(2)}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="block w-full py-3 bg-primary hover:bg-[#c9451e] text-white font-bold text-center rounded-md transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>
                                <p className="text-center text-xs text-text-secondary mt-2">
                                    Shipping & taxes calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
