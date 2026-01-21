"use client";

import { useCartStore } from "@/stores/cartStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutFormValues, checkoutSchema } from "@/lib/schemas";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/checkout";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { createClient } from "@/utils/supabase/client";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
    });

    useEffect(() => {
        setMounted(true);
        const autoFill = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user && user.email) {
                setValue("email", user.email);

                // Try to guess name
                const fullName = user.user_metadata?.full_name || user.user_metadata?.fullName;
                if (fullName) {
                    setValue("fullName", fullName);
                }

                // Fetch Profile to get phone number
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("phone, full_name")
                    .eq("id", user.id)
                    .single(); // Ensure one result

                if (profile) {
                    if (profile.phone) setValue("phone", profile.phone);
                    // If we didn't get name from metadata, maybe it's in profile
                    if (!fullName && profile.full_name) setValue("fullName", profile.full_name);
                }
            }
        };
        autoFill();
    }, [setValue]);

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsSubmitting(true);
        setError(null);

        const result = await createOrder(data, items);

        if (result.success) {
            clearCart();
            router.push(`/checkout/success?code=${result.orderCode}`);
        } else {
            setError(result.error);
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center dark:bg-background-dark text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-6xl text-text-secondary mb-4">shopping_cart_off</span>
                    <h1 className="text-2xl font-bold font-display mb-2">Your cart is empty</h1>
                    <Link href="/" className="text-primary hover:underline">
                        Go back to shop
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white dark:bg-background-dark py-12">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Form */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Pickup Details</h2>
                            <p className="text-text-secondary text-sm mb-6">
                                Store Address: 123 Builder Lane, Industrial Park.
                                <br />
                                Open: Mon-Fri 9am-6pm, Sat 10am-4pm.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input
                                        {...register("fullName")}
                                        className="w-full p-3 border border-gray-300 dark:border-border-dark rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-text"
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        {...register("email")}
                                        className="w-full p-3 border border-gray-300 dark:border-border-dark rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-text"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Phone Number</label>
                                    <input
                                        {...register("phone")}
                                        className="w-full p-3 border border-gray-300 dark:border-border-dark rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-text"
                                        placeholder="+1 234 567 8900"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Preferred Pickup Time</label>
                                    <select
                                        {...register("pickupTime")}
                                        className="w-full p-3 border border-gray-300 dark:border-border-dark rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                                    >
                                        <option value="">Select a time...</option>
                                        <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                                        <option value="Afternoon (1pm - 5pm)">Afternoon (1pm - 5pm)</option>
                                    </select>
                                    {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Notes (Optional)</label>
                                    <textarea
                                        {...register("notes")}
                                        className="w-full p-3 border border-gray-300 dark:border-border-dark rounded-md bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none h-24 resize-none cursor-text"
                                        placeholder="Specific requests..."
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary hover:bg-[#c9451e] text-white font-bold text-lg rounded-md transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>Confirm Order</>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 dark:bg-surface-dark p-6 rounded-lg border border-gray-200 dark:border-border-dark h-fit">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 dark:border-border-dark pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                                <span className="font-bold text-2xl text-primary">${totalPrice().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
