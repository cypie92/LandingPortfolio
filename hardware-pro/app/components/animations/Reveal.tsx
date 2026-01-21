"use client";

import { motion } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    threshold?: number;
}

export default function Reveal({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    y = 20,
    x = 0,
    threshold = 0.1,
}: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: threshold }}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
