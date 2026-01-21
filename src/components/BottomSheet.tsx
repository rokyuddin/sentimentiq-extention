import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="z-40 fixed inset-0 bg-black/40 backdrop-blur-[2px]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="right-0 bottom-0 left-0 z-50 fixed flex flex-col bg-background shadow-lg border-border border-t rounded-t-xl max-h-[90vh] overflow-hidden"
                    >
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-1 w-full cursor-grab active:cursor-grabbing">
                            <div className="bg-muted rounded-full w-12 h-1.5" />
                        </div>

                        {/* Header */}
                        {title && (
                            <div className="flex justify-between items-center px-6 py-4 border-border border-b">
                                <h3 className="font-bold text-foreground text-lg">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="hover:bg-accent p-1 rounded-full transition-colors"
                                >
                                    <span className="text-muted-foreground material-symbols-outlined">close</span>
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 px-6 py-6 overflow-y-auto custom-scrollbar">
                            {children}
                        </div>

                        {/* Footer Padding */}
                        <div className="h-4 shrink-0" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
