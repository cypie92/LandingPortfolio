"use client";

import { useState, useActionState } from "react";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { updateProfile, updatePassword, signOut } from "@/actions/profile";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Define types for Order and Wishlist item
type Order = Database["public"]["Tables"]["orders"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type WishlistItem = Database["public"]["Tables"]["wishlist"]["Row"] & { product: Product };

type ProfileDashboardProps = {
    user: User;
    profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
    orders: Order[];
    wishlist: WishlistItem[];
};

function SignOutButton() {
    const router = useRouter();
    return (
        <button
            onClick={async () => {
                await signOut();
                router.push("/");
            }}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors mt-auto"
        >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
        </button>
    );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-primary hover:bg-[#c9451e] text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center gap-2"
        >
            {pending && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
            {pending ? "Saving..." : label}
        </button>
    );
}

function PasswordForm() {
    const [state, formAction] = useActionState(updatePassword, null);

    return (
        <form action={formAction} className="space-y-6 max-w-lg mt-8 pt-8 border-t border-gray-200 dark:border-border-dark">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Security</h3>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">New Password</label>
                <input
                    name="password"
                    type="password"
                    className="w-full p-3 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-[#1A1D21] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Confirm New Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    className="w-full p-3 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-[#1A1D21] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="••••••••"
                />
            </div>

            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-500 text-sm">{state.success}</p>}

            <SaveButton label="Update Password" />
        </form>
    )
}

function ProfileForm({ user, profile }: { user: User, profile: any }) {
    const [state, formAction] = useActionState(updateProfile, null);

    return (
        <form action={formAction} className="space-y-6 max-w-lg">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input
                    name="fullName"
                    defaultValue={profile?.full_name || user.user_metadata.full_name || ""}
                    className="w-full p-3 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-[#1A1D21] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <input
                    name="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full p-3 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-100 dark:bg-surface-dark/50 text-text-secondary cursor-not-allowed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input
                    name="phone"
                    defaultValue={profile?.phone || ""}
                    placeholder="+1 234 567 8900"
                    className="w-full p-3 border border-gray-200 dark:border-border-dark rounded-lg bg-gray-50 dark:bg-[#1A1D21] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
            </div>

            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-500 text-sm">{state.success}</p>}

            <SaveButton />
        </form>
    )
}

export default function ProfileDashboard({ user, profile, orders, wishlist }: ProfileDashboardProps) {
    const [activeTab, setActiveTab] = useState<"info" | "orders" | "wishlist">("info");

    const tabs = [
        { id: "info", label: "Overview", icon: "dashboard" },
        { id: "orders", label: "My Orders", icon: "package_2" },
        { id: "wishlist", label: "Wishlist", icon: "favorite" },
    ] as const;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl shadow-black/5 border border-gray-200 dark:border-border-dark overflow-hidden sticky top-24">
                            <div className="p-6 bg-gradient-to-br from-surface-dark to-[#15171B] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="material-symbols-outlined text-9xl text-white">construction</span>
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="size-24 rounded-full bg-gradient-to-br from-primary to-orange-600 p-0.5 mb-4 shadow-xl">
                                        <div className="w-full h-full rounded-full bg-surface-dark flex items-center justify-center text-white text-3xl font-display font-bold">
                                            {(profile?.full_name || user.email)?.[0]?.toUpperCase()}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-white font-display mb-1">
                                        {profile?.full_name || user.user_metadata.full_name || "Welcome Back"}
                                    </h2>
                                    <p className="text-sm text-gray-400 font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <nav className="space-y-1">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "text-text-secondary hover:bg-gray-50 dark:hover:bg-[#1A1D21] hover:text-slate-900 dark:hover:text-white"
                                                }`}
                                        >
                                            <span className="material-symbols-outlined">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>

                                <div className="h-px bg-gray-100 dark:bg-border-dark my-4" />
                                <SignOutButton />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === "info" && (
                                    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-border-dark p-8">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined text-2xl">badge</span>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Account Settings</h1>
                                                <p className="text-text-secondary">Manage your profile and security preferences</p>
                                            </div>
                                        </div>

                                        <ProfileForm user={user} profile={profile} />
                                        <PasswordForm />
                                    </div>
                                )}

                                {activeTab === "orders" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined text-2xl">package_2</span>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Order History</h1>
                                                <p className="text-text-secondary">Track and manage your recent purchases</p>
                                            </div>
                                        </div>

                                        {orders.length === 0 ? (
                                            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-12 text-center">
                                                <div className="size-20 bg-gray-100 dark:bg-[#1A1D21] rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
                                                    <span className="material-symbols-outlined text-4xl">remove_shopping_cart</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No orders yet</h3>
                                                <p className="text-text-secondary mb-6">Looks like you haven't made any purchases yet.</p>
                                                <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-[#c9451e] transition-colors">
                                                    Start Shopping
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                {orders.map((order) => (
                                                    <Link href={`/orders/${order.id}`} key={order.id} className="block bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                                        </div>
                                                        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                                            <div className="flex items-start gap-4">
                                                                <div className="size-12 rounded-lg bg-gray-100 dark:bg-[#1A1D21] flex items-center justify-center text-text-secondary">
                                                                    <span className="material-symbols-outlined">receipt_long</span>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <h3 className="font-bold text-slate-900 dark:text-white font-display text-lg">{order.order_code}</h3>
                                                                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${order.status === 'ready_for_pickup' ? 'bg-green-500/10 text-green-500' :
                                                                            order.status === 'payment_made' ? 'bg-blue-500/10 text-blue-500' :
                                                                                'bg-yellow-500/10 text-yellow-500'
                                                                            }`}>
                                                                            {order.status?.replace('_', ' ')}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-text-secondary">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm text-text-secondary mb-1">Total Amount</p>
                                                                <p className="text-2xl font-bold text-slate-900 dark:text-white">${order.total_amount.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "wishlist" && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                <span className="material-symbols-outlined text-2xl">favorite</span>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">My Wishlist</h1>
                                                <p className="text-text-secondary">Items you've saved for later</p>
                                            </div>
                                        </div>

                                        {wishlist.length === 0 ? (
                                            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-12 text-center">
                                                <div className="size-20 bg-gray-100 dark:bg-[#1A1D21] rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
                                                    <span className="material-symbols-outlined text-4xl">heart_broken</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Your wishlist is empty</h3>
                                                <p className="text-text-secondary mb-6">Save items you want to keep track of.</p>
                                                <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-[#c9451e] transition-colors">
                                                    Browse Products
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {wishlist.map((item) => (
                                                    <div key={item.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                                                        <div className="aspect-video bg-gray-100 dark:bg-[#1A1D21] relative flex items-center justify-center">
                                                            {item.product.images?.[0] ? (
                                                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                                                            )}

                                                            <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/50 text-red-500 rounded-full hover:scale-110 transition-transform">
                                                                <span className="material-symbols-outlined icon-filled text-xl">favorite</span>
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{item.product.name}</h3>
                                                            <div className="flex items-center justify-between mt-4">
                                                                <span className="text-xl font-bold text-primary">${item.product.price.toFixed(2)}</span>
                                                                <button className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity">
                                                                    <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
