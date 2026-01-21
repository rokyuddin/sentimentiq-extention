import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSentimentStore } from "@/store/sentiment-store";
import { Logo } from "../ui/logo";

export const AuthView: React.FC = () => {
    const { authMode, setAuthMode, setView } = useSentimentStore();

    const isSignUp = authMode === "SIGN_UP";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col bg-background h-full overflow-hidden font-nunito"
        >
            <div className="flex flex-col flex-1 mx-auto w-full">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 pt-6">
                    <Logo />
                    <button
                        onClick={() => setView('HOME')}
                        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={authMode}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col flex-1"
                    >
                        {/* Headline & Body */}
                        <div className="px-6">
                            <h2 className="pt-4 font-bold text-foreground text-2xl leading-tight tracking-tight">
                                {isSignUp ? "Get started" : "Welcome back"}
                            </h2>
                            <p className="pt-1 font-normal text-muted-foreground text-sm leading-normal">
                                {isSignUp
                                    ? "Analyze sentiment instantly with our AI tools."
                                    : "Sign in to access your analysis history."}
                            </p>
                        </div>

                        {/* Social Auth Button */}
                        <div className="px-6 pt-6 pb-4">
                            <button className="flex justify-center items-center gap-3 bg-card hover:bg-muted shadow-sm px-5 border border-border rounded-lg w-full h-11 overflow-hidden font-bold text-foreground text-sm transition-all cursor-pointer">
                                <span className="material-symbols-outlined">account_circle</span>
                                <span className="truncate">Continue with Google</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center px-6">
                            <div className="border-border border-t grow"></div>
                            <span className="mx-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest shrink">or</span>
                            <div className="border-border border-t grow"></div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-3 px-6 pt-4">
                            <div className="space-y-1.5">
                                <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <input
                                        className="bg-muted px-4 border border-border focus:border-primary rounded-lg outline-none focus:ring-1 focus:ring-primary w-full h-10 text-foreground placeholder:text-muted-foreground/50 text-sm transition-all"
                                        placeholder="name@company.com"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">Password</label>
                                    <a className="font-bold text-[10px] text-primary hover:underline" href="#">Forgot?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        className="bg-muted px-4 border border-border focus:border-primary rounded-lg outline-none focus:ring-1 focus:ring-primary w-full h-10 text-foreground placeholder:text-muted-foreground/50 text-sm transition-all"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Primary Action Button */}
                        <div className="px-6 pt-6 pb-4">
                            <button className="flex justify-center items-center gap-2 bg-primary hover:opacity-90 shadow shadow-primary/20 px-5 rounded-lg w-full h-11 overflow-hidden font-bold text-primary-foreground text-base leading-normal tracking-tight active:scale-[0.98] transition-all cursor-pointer">
                                <span className="truncate">{isSignUp ? "Create account" : "Sign in"}</span>
                                <span className="text-lg material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Toggle Footer */}
                <div className="px-6 pb-6 text-center">
                    <p className="text-muted-foreground text-sm">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <button
                            onClick={() => setAuthMode(isSignUp ? "SIGN_IN" : "SIGN_UP")}
                            className="ml-1 font-bold text-primary hover:underline cursor-pointer"
                        >
                            {isSignUp ? "Sign in" : "Sign up"}
                        </button>
                    </p>
                    <p className="mt-4 px-4 text-[10px] text-muted-foreground leading-tight">
                        By continuing, you agree to Sentiment IQ's <br />
                        <a className="hover:text-foreground underline" href="#">Terms</a> and <a className="hover:text-foreground underline" href="#">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
