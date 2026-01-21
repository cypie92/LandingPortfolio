"use client";

import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/actions/auth";
import Reveal from "../components/animations/Reveal";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-primary hover:bg-[#c9451e] text-white font-bold rounded-md transition-colors disabled:opacity-70"
        >
            {pending ? "Signing in..." : "Sign In"}
        </button>
    );
}

export default function LoginPage() {
    const [state, formAction] = useActionState(login, null);

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark flex flex-col">
            <Navbar />

            <div className="flex-1 flex max-h-[calc(100vh-73px)]">
                {/* Left Side - Image (Desktop Only) */}
                <div className="hidden lg:block w-1/2 relative overflow-hidden bg-slate-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAY-IGwpPveSo2IIpoQXDqpz5v6eVRZUNznvdEep70CkTVU6C2a7d_VoLSqgExXGcpr_A76KExeeRORfIh06opc1GNh7Pwdl1lfDSh9_GTQXpfaO-CNc6APdrSMhcVaDVVZ13UUFVSh1ToC19lBUhYeAA9LTpltHncpQwTnxaEnaMDZ-noYPKE0x3m8NRa-CnjWJnq3zTnthdnzeqZuuRSfI10RvdIQ07luGnJXI4nhLtek55ruPCLQND2rDCcpkP0i0nMJsZepGT8')",
                            filter: "brightness(0.6)"
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12 lg:p-16">
                        <Reveal>
                            <div className="size-16 bg-primary rounded-xl flex items-center justify-center text-white mb-8 shadow-2xl">
                                <span className="material-symbols-outlined text-4xl">construction</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight">
                                Build your dream <br /> workshop today.
                            </h2>
                            <p className="text-lg text-gray-300 max-w-md leading-relaxed">
                                Join thousands of professionals and DIY enthusiasts getting the best tools delivered straight to their door.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <div className="w-full max-w-md space-y-8">
                        <Reveal delay={0.1}>
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                                <p className="text-text-secondary">Please enter your details to sign in.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <form action={formAction} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-200">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                                            <span className="material-symbols-outlined text-xl">mail</span>
                                        </div>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-gray-200">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                                            <span className="material-symbols-outlined text-xl">lock</span>
                                        </div>
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-border-dark rounded-lg bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {state?.error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">error</span>
                                        {state.error}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <SubmitButton />
                                </div>
                            </form>

                            <p className="mt-8 text-center text-text-secondary">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-primary hover:text-primary-dark font-bold hover:underline transition-colors">
                                    Create account
                                </Link>
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
