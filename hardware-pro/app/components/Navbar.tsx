"use client";

import { useCartStore } from "@/stores/cartStore";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const { toggleCart, totalItems } = useCartStore();
    const [user, setUser] = useState<User | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkUser = async () => {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between gap-4 md:gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 text-slate-900 dark:text-white shrink-0 group">
                        <div className="size-10 flex items-center justify-center bg-primary rounded-md text-white">
                            <span className="material-symbols-outlined !text-3xl">construction</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight group-hover:text-primary transition-colors">
                            HardwarePro
                        </h2>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="block w-full p-3 pl-10 text-sm text-slate-900 dark:text-white border border-gray-300 dark:border-border-dark rounded-md bg-gray-50 dark:bg-[#1A1D21] focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 dark:placeholder-gray-500 transition-all font-body"
                                placeholder="Find tools, parts, supplies..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 md:gap-6 shrink-0">
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors font-display">
                                Categories
                            </Link>
                            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors font-display">
                                Deals
                            </Link>
                            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors font-display">
                                Blog
                            </Link>
                        </nav>
                        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-border-dark pl-4 md:pl-6">
                            <button
                                onClick={toggleCart}
                                className="flex items-center justify-center size-10 rounded-md hover:bg-gray-100 dark:hover:bg-background-dark text-text-main transition-colors relative"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {mounted && totalItems() > 0 && (
                                    <span className="absolute top-1 right-1 size-2 bg-primary rounded-full animate-bounce"></span>
                                )}
                            </button>

                            {user ? (
                                <Link
                                    href="/profile"
                                    className="flex items-center justify-center size-10 rounded-md hover:bg-gray-100 dark:hover:bg-background-dark text-text-main transition-colors"
                                    title="My Profile"
                                >
                                    <span className="material-symbols-outlined">
                                        account_circle
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-[#c9451e] text-white text-sm font-bold rounded-md transition-colors"
                                >
                                    Login
                                </Link>
                            )}
                            <button className="md:hidden flex items-center justify-center size-10 rounded-md hover:bg-gray-100 dark:hover:bg-background-dark text-text-main transition-colors">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search (Visible only on small screens) */}
                <div className="md:hidden mt-4">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="block w-full p-2.5 pl-10 text-sm text-slate-900 dark:text-white border border-gray-300 dark:border-border-dark rounded-md bg-gray-50 dark:bg-[#1A1D21] focus:ring-1 focus:ring-primary placeholder-gray-500"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
