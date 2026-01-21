
export function SvgLogo() {
    return (
        <svg
            className="fill-primary size-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            {/* Head (mirrored to face right) */}
            <g transform="scale(-1,1) translate(-24,0)">
                <path d="M19.94 9.06C19.5 5.73 16.57 3 13 3 9.47 3 6.57 5.61 6.08 9l-1.93 3.48c-.41.66.07 1.52.85 1.52h1v2c0 1.1.9 2 2 2h1v3h7v-4.68c2.62-1.25 4.35-4.08 3.94-7.26" />
            </g>

            {/* Big readable question mark */}
            <text
                x="12"
                y="12"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="700"
                fill="white"
            >
                ?
            </text>
        </svg>
    )
}

export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-primary/10 rounded-md size-8 text-primary shrink-0">
                <SvgLogo />
            </div>
            <h2 className="font-bold text-foreground text-lg leading-tight tracking-tight">Sentiment IQ</h2>
        </div>
    )
}

