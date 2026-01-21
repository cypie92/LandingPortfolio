"use client";

import Image from "next/image";
import Reveal from "./animations/Reveal";
import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    description?: string;
    imageSrc?: string;
    actionLabel?: string;
    actionLink?: string;
}

export default function EmptyState({
    title = "No items found",
    description = "We couldn't find what you're looking for.",
    imageSrc = "/empty-state.png",
    actionLabel,
    actionLink
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Reveal>
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                    <Image
                        src={imageSrc}
                        alt="Empty State"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Reveal>

            <Reveal delay={0.1}>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {title}
                </h3>
            </Reveal>

            <Reveal delay={0.2}>
                <p className="text-text-secondary max-w-md mx-auto mb-8">
                    {description}
                </p>
            </Reveal>

            {actionLabel && actionLink && (
                <Reveal delay={0.3}>
                    <Link
                        href={actionLink}
                        className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
                    >
                        {actionLabel}
                    </Link>
                </Reveal>
            )}
        </div>
    );
}
