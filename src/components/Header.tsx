import React from "react";
import { useSentimentStore } from "@/store/sentiment-store";
import { Logo } from "./ui/logo";

export const Header: React.FC = () => {
    const { plan } = useSentimentStore();

    return (
        <div className="flex justify-between items-center px-6 pt-6 pb-2 w-full font-nunito">
            <Logo />

            <div className="bg-muted px-2.5 py-1 border border-border rounded-md">
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                    {plan}
                </span>
            </div>
        </div>
    );
};
