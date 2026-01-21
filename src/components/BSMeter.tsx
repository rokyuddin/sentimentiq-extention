import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BSMeterProps {
    score: number;
    size?: number;
    className?: string;
}

export const BSMeter: React.FC<BSMeterProps> = ({ score, size = 160, className }) => {
    const radius = size * 0.4;
    const strokeWidth = size * 0.08;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    // Color logic based on score
    const getColor = (s: number) => {
        if (s <= 33) return "var(--destructive)";
        if (s <= 66) return "var(--warning)";
        return "var(--success)";
    };

    const statusColor = getColor(score);

    return (
        <div className={cn("relative flex justify-center items-center", className)} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90 transform">
                {/* Background Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="var(--color-muted)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={statusColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 4px ${statusColor}44)` }}
                />
            </svg>

            {/* Center Label */}
            <div className="absolute flex flex-col justify-center items-center font-nunito">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-bold text-foreground text-4xl tracking-tight"
                >
                    {score}
                </motion.span>
                <span className="font-semibold text-[10px] text-muted-foreground uppercase tracking-widest">
                    Authenticity
                </span>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 opacity-20 blur-2xl rounded-full"
                style={{ backgroundColor: statusColor }}
            />
        </div>
    );
};
