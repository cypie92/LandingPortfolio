"use client";


import Navbar from "../components/Navbar";
import { Suspense, useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import OrderStepper from "../components/OrderStepper";
import Reveal from "../components/animations/Reveal";

function TrackOrderContent() {
    const searchParams = useSearchParams();
    const [code, setCode] = useState(searchParams.get("code") || "");
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useCallback to stable reference for useEffect
    const fetchStatus = useCallback(async (orderCode: string) => {
        setLoading(true);
        setStatus(null);
        setError(null);

        const supabase = createClient();
        const { data, error } = await supabase
            .from("orders")
            .select("status")
            .eq("order_code", orderCode.trim())
            .single();

        if (error || !data) {
            setError("Order not found. Please check your code.");
        } else {
            setStatus(data.status);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const queryCode = searchParams.get("code");
        if (queryCode) {
            fetchStatus(queryCode);
        }
    }, [searchParams, fetchStatus]);

    const checkStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;
        await fetchStatus(code);
    };

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
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <Reveal>
                    <span className="material-symbols-outlined text-5xl text-primary mb-4">local_shipping</span>
                    <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Track Your Order</h1>
                    <p className="text-text-secondary mb-8">Enter your reference code to check current status.</p>

                    <form onSubmit={checkStatus} className="flex gap-2 mb-8">
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 dark:border-border-dark rounded-md bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                            placeholder="HP-XXXX"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 bg-primary text-white font-bold rounded-md hover:bg-[#c9451e] transition-colors disabled:opacity-50"
                        >
                            {loading ? "..." : "Track"}
                        </button>
                    </form>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm animate-shake">
                            {error}
                        </div>
                    )}
                </Reveal>

                {status && (
                    <Reveal delay={0.2} className="w-full">
                        <div className="border border-gray-200 dark:border-border-dark rounded-xl p-8 bg-gray-50 dark:bg-surface-dark mt-12 shadow-sm">
                            <div className="mb-10 text-left">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 ml-1">Order Progress</h2>
                                <p className="text-sm text-text-secondary ml-1 mb-8">Tracking Code: <span className="font-mono text-primary font-bold">{code}</span></p>
                                <OrderStepper status={status} />
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-border-dark text-left">
                                <p className="text-text-secondary mb-2 text-sm font-medium uppercase tracking-wider">Current Status Detail</p>
                                <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-lg ${getStatusColor(status)}`}>
                                    <span className="material-symbols-outlined">info</span>
                                    {getStatusLabel(status)}
                                </div>
                            </div>

                            {status === 'ready_for_pickup' && (
                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-300 animate-pulse text-left">
                                    <p className="font-bold text-lg mb-1 flex items-center gap-2">
                                        <span className="material-symbols-outlined">store</span>
                                        Your order is ready!
                                    </p>
                                    <p className="pl-7">Please proceed to <span className="font-bold">123 Builder Lane</span> with your order code.</p>
                                </div>
                            )}
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackOrderContent />
        </Suspense>
    );
}
