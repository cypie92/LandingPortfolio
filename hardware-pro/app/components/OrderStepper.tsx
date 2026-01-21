"use client";

import { motion } from "framer-motion";

interface OrderStepperProps {
    status: string;
}

const steps = [
    { label: "Pending Payment", status: "pending_payment", icon: "pending" },
    { label: "Payment Received", status: "payment_made", icon: "credit_card" },
    { label: "Processing", status: "preparing", icon: "inventory_2" },
    { label: "Ready for Pickup", status: "ready_for_pickup", icon: "storefront" },
];

export default function OrderStepper({ status }: OrderStepperProps) {
    const currentIndex = steps.findIndex((s) => s.status === status);
    const activeIndex = currentIndex === -1 ? 0 : currentIndex;

    return (
        <div className="w-full py-6">
            <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full -z-10" />

                {/* Active Progress Bar */}
                <motion.div
                    className="absolute top-6 left-0 h-1 bg-primary rounded-full -z-10"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                />

                {/* Steps Container */}
                <div className="flex justify-between w-full">
                    {steps.map((step, index) => {
                        const isCompleted = index <= activeIndex;
                        const isCurrent = index === activeIndex;

                        return (
                            <div key={step.status} className="flex flex-col items-center group cursor-default">
                                {/* Icon Circle */}
                                <motion.div
                                    className={`relative z-10 flex items-center justify-center size-12 rounded-full border-4 shadow-sm transition-all duration-500 ${isCompleted
                                            ? "bg-primary border-primary text-white shadow-primary/30"
                                            : "bg-white dark:bg-surface-dark border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600"
                                        }`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        borderColor: isCompleted ? "#e95420" : isCurrent ? "#e95420" : "#e5e7eb" // #e95420 is primary
                                    }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {isCompleted ? (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="material-symbols-outlined text-xl"
                                        >
                                            {step.icon}
                                        </motion.span>
                                    ) : (
                                        <span className="text-sm font-bold font-mono">{index + 1}</span>
                                    )}

                                    {/* Pulse Effect for Current Step */}
                                    {isCurrent && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-primary"
                                            initial={{ opacity: 0.4, scale: 1 }}
                                            animate={{ opacity: 0, scale: 1.8 }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                </motion.div>

                                {/* Label */}
                                <motion.div
                                    className={`mt-4 text-center text-xs md:text-sm font-medium transition-colors duration-300 max-w-[80px] md:max-w-none ${isCurrent
                                            ? "text-primary font-bold translate-y-0"
                                            : isCompleted
                                                ? "text-slate-900 dark:text-gray-200"
                                                : "text-gray-400 dark:text-gray-600"
                                        }`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    {step.label}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
