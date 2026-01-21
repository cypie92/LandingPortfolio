"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const phoneNumber = "1234567890"; // Replace with actual number
    const message = "Hi HardwarePro, I have a question about a product.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl p-4 w-72 border border-gray-200 dark:border-border-dark mb-2"
                    >
                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-border-dark pb-3 mb-3">
                            <div className="size-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Customer Support</h3>
                                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Online now
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-text-secondary hover:text-slate-900 dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>

                        <p className="text-sm text-text-secondary mb-4">
                            Need help with a project or tool? Chat with our experts instantly!
                        </p>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>
                            Start Chat
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative size-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
                <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}`}>
                    chat
                </span>
                <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${isOpen ? 'scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0 absolute'}`}>
                    close
                </span>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap"
                        >
                            Chat with us
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}
