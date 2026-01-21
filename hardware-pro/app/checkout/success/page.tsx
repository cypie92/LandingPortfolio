"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderCode = searchParams.get("code");
    const [copied, setCopied] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="size-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>

                <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-4">
                    Order Placed Successfully!
                </h1>
                <p className="text-text-secondary text-lg mb-8">
                    Thank you for shopping with HardwarePro. Please complete your payment below.
                </p>

                <div className="bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-8 mb-8 max-w-lg mx-auto relative">
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-2">Order Reference Code</p>
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-4xl font-mono font-bold text-primary tracking-widest bg-white dark:bg-black/20 py-4 px-8 rounded-lg border border-dashed border-gray-300 dark:border-border-dark select-none w-full">
                            {orderCode || "ERROR"}
                        </div>
                        <button
                            onClick={() => {
                                if (orderCode) {
                                    navigator.clipboard.writeText(orderCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }
                            }}
                            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2 px-4 rounded-full hover:bg-white dark:hover:bg-white/5"
                        >
                            {copied ? (
                                <>
                                    <span className="material-symbols-outlined text-lg text-green-500">check</span>
                                    <span className="text-green-500">Copied to clipboard!</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">content_copy</span>
                                    <span>Copy Code</span>
                                </>
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-text-secondary mt-2">
                        Please keep this code safe. You will need it for tracking and pickup.
                    </p>
                </div>

                {/* Bank Details */}
                <div className="text-left bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-6 max-w-lg mx-auto mb-8">
                    <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">account_balance</span>
                        Bank Transfer Details
                    </h3>
                    <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                        <div className="flex justify-between">
                            <span>Bank Name:</span>
                            <span className="font-bold">HardwarePro Bank</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Account Number:</span>
                            <span className="font-bold font-mono text-lg">123-456-7890</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Account Name:</span>
                            <span className="font-bold">HardwarePro Pte Ltd</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/30 text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-bold mb-1">⚠️ Important:</p>
                        <p>Please enter your <span className="font-bold">Order Reference Code ({orderCode})</span> in the transfer description/remarks field so we can match your payment.</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Link href="/" className="px-6 py-3 border border-gray-300 dark:border-border-dark rounded-md text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors font-medium">
                        Return Home
                    </Link>
                    <Link href={`/track-order?code=${orderCode}`} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-[#c9451e] transition-colors font-medium shadow-lg shadow-primary/20">
                        Track Order
                    </Link>
                </div>

                <p className="mt-12 text-sm text-text-secondary">
                    Questions? <a href="#" className="underline hover:text-primary">Contact Support</a>
                </p>

            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
