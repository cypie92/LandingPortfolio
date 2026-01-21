
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Reveal from "@/app/components/animations/Reveal";
import OrderStepper from "@/app/components/OrderStepper";
import Link from "next/link";

interface OrderPageProps {
    params: {
        id: string;
    }
}

export default async function OrderPage({ params }: OrderPageProps) {
    // Await params to fix next.js 15 sync access warning/error
    const { id } = await params;

    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Fetch Order
    const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id) // Ensure user owns the order
        .single();

    if (!order) {
        notFound();
    }

    // Fetch Order Items with Product Details
    const { data: orderItems } = await supabase
        .from("order_items")
        .select(`
            *,
            products:product_id (*)
        `)
        .eq("order_id", id);

    // Helper for status color (reused from Track Order, could be util)
    const getStatusColor = (s: string) => {
        switch (s) {
            case "pending_payment": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "payment_made": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "preparing": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case "ready_for_pickup": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (s: string) => {
        switch (s) {
            case "pending_payment": return "Pending Payment";
            case "payment_made": return "Payment Received";
            case "preparing": return "Preparing Order";
            case "ready_for_pickup": return "Ready for Pickup";
            default: return s;
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <Link href="/profile" className="text-text-secondary hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </Link>
                                <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">Order Details</h1>
                            </div>
                            <p className="text-text-secondary mt-1 ml-9">Order {order.order_code}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={`/track-order?code=${order.order_code}`}
                                className="px-5 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg font-medium hover:border-primary text-slate-900 dark:text-white transition-colors"
                            >
                                Track Order
                            </Link>
                            <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-[#c9451e] transition-colors shadow-lg shadow-primary/20">
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Stepper */}
                        <Reveal delay={0.1} className="w-full">
                            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-8 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Order Status</h2>
                                <OrderStepper status={order.status || 'pending_payment'} />

                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-sm text-text-secondary">Current Status</span>
                                    <span className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusColor(order.status || '')}`}>
                                        {getStatusLabel(order.status || '')}
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Order Items */}
                        <Reveal delay={0.2} className="w-full">
                            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Items ({orderItems?.length || 0})</h2>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {orderItems?.map((item: any) => (
                                        <div key={item.id} className="p-6 flex gap-6">
                                            <div className="size-24 bg-gray-100 dark:bg-[#1A1D21] rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                                                {item.products?.images?.[0] ? (
                                                    <img src={item.products.images[0]} alt={item.products.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.products?.name || "Unknown Product"}</h3>
                                                <p className="text-sm text-text-secondary mb-3">{item.products?.category_id || "Category"}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm font-medium bg-gray-100 dark:bg-[#1A1D21] px-3 py-1 rounded-md text-slate-700 dark:text-gray-300">
                                                        Qty: {item.quantity}
                                                    </div>
                                                    <div className="font-bold text-slate-900 dark:text-white">
                                                        ${(item.price_at_time * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Order Summary */}
                        <Reveal delay={0.3} className="w-full">
                            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Subtotal</span>
                                        <span>${order.total_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-text-secondary">
                                        <span>Tax</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                                        <span>Total</span>
                                        <span>${order.total_amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Customer Details */}
                        <Reveal delay={0.4} className="w-full">
                            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Customer Details</h2>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Contact Info</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{user.email}</p>
                                        {/* Phone currently not in orders table, only in profile. Could fetch profile or leave out */}
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Payment Method</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-text-secondary">account_balance</span>
                                            <span className="font-medium text-slate-900 dark:text-white">Bank Transfer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.5} className="w-full">
                            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6">
                                <div className="flex gap-3">
                                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">help</span>
                                    <div>
                                        <h3 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">Need Help?</h3>
                                        <p className="text-xs text-blue-800 dark:text-blue-200 mb-3">
                                            If you have any issues with your order, contact our support team.
                                        </p>
                                        <button className="text-xs font-bold text-blue-700 dark:text-blue-300 hover:underline">
                                            Contact Support
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
