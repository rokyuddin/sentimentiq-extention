import { useSentimentStore } from "@/store/sentiment-store";
import { cn } from "@/lib/utils";

const SettingToggle: React.FC<{
    label: string;
    description?: string;
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
    icon: string;
}> = ({ label, description, enabled, onToggle, icon }) => (
    <div className="flex justify-between items-center bg-muted/20 p-4 border border-border rounded-xl">
        <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground">
                <span className="text-[20px] material-symbols-outlined">{icon}</span>
            </div>
            <div>
                <span className="block font-bold text-foreground text-sm">{label}</span>
                {description && <span className="text-[10px] text-muted-foreground">{description}</span>}
            </div>
        </div>
        <button
            onClick={() => onToggle(!enabled)}
            className={cn(
                "inline-flex relative border-2 border-transparent rounded-full focus:outline-none w-11 h-6 transition-colors duration-200 ease-in-out cursor-pointer shrink-0",
                enabled ? "bg-primary" : "bg-muted"
            )}
        >
            <span
                className={cn(
                    "inline-block bg-white shadow rounded-full ring-0 w-5 h-5 transition duration-200 ease-in-out pointer-events-none transform",
                    enabled ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    </div>
);

export const SettingsView: React.FC = () => {
    const {
        user, dailyLimit, scansUsed, theme, autoAnalyze, notifications,
        setTheme, setAutoAnalyze, setNotifications, logout
    } = useSentimentStore();

    if (!user) return null;

    return (
        <div className="flex flex-col bg-background pb-6 h-full overflow-y-auto font-nunito custom-scrollbar">
            {/* Profile Header */}
            <div className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center bg-primary/10 border-2 border-primary/20 rounded-full size-14 overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="size-full object-cover" />
                        ) : (
                            <span className="font-bold text-primary text-xl">{user.name.charAt(0)}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-foreground text-lg leading-tight">{user.name}</h2>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Usage Card */}
            <div className="px-6 py-4">
                <div className="group relative bg-primary/3 p-4 border border-primary/10 rounded-2xl overflow-hidden">
                    <div className="z-10 relative">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-[10px] text-primary uppercase tracking-widest">Storage & Usage</span>
                            <span className="font-bold text-foreground text-xs">{scansUsed} / {dailyLimit} scans</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="bg-muted mb-4 rounded-full w-full h-2 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-500"
                                style={{ width: `${(scansUsed / dailyLimit) * 100}%` }}
                            />
                        </div>
                        <button className="bg-primary shadow-lg shadow-primary/10 py-2.5 rounded-xl w-full font-bold text-primary-foreground text-xs active:scale-[0.98] transition-all cursor-pointer">
                            Upgrade to Unlimited
                        </button>
                    </div>
                    {/* Decorative background circle */}
                    <div className="-right-8 -bottom-8 absolute bg-primary/5 blur-2xl rounded-full size-32 group-hover:scale-110 transition-transform" />
                </div>
            </div>

            {/* Settings Grid */}
            <div className="space-y-3 px-6">
                <h3 className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Preferences</h3>

                <div className="flex flex-col space-y-1 bg-muted/10 p-2 border border-border rounded-xl">
                    <div className="flex justify-between items-center p-2">
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground scale-90 material-symbols-outlined">dark_mode</span>
                            <span className="font-bold text-foreground text-sm">Theme</span>
                        </div>
                        <div className="flex bg-muted p-1 rounded-lg">
                            {(['light', 'dark', 'system'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={cn(
                                        "px-3 py-1 rounded-md font-bold text-[10px] capitalize transition-all",
                                        theme === t ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <SettingToggle
                    label="Auto-Analyze"
                    description="Scan products automatically on page load"
                    enabled={autoAnalyze}
                    onToggle={setAutoAnalyze}
                    icon="search_insights"
                />

                <SettingToggle
                    label="Notifications"
                    description="Get alerts for price drops & sentiment shifts"
                    enabled={notifications}
                    onToggle={setNotifications}
                    icon="notifications"
                />
            </div>

            {/* Account Actions */}
            <div className="space-y-3 px-6 pt-6">
                <h3 className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Account</h3>

                <button className="group flex items-center gap-3 bg-muted/10 hover:bg-muted/20 p-4 border border-border rounded-xl w-full text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                    <span className="text-[20px] material-symbols-outlined">help</span>
                    <span className="flex-1 font-bold text-sm text-left">Help & Support</span>
                    <span className="opacity-50 text-sm transition-transform group-hover:translate-x-1 material-symbols-outlined">chevron_right</span>
                </button>

                <button
                    onClick={logout}
                    className="group flex items-center gap-3 bg-destructive/3 hover:bg-destructive/8 p-4 border border-destructive/10 rounded-xl w-full text-destructive transition-all cursor-pointer"
                >
                    <span className="text-[20px] material-symbols-outlined">logout</span>
                    <span className="flex-1 font-bold text-sm text-left">Sign Out</span>
                </button>

                <div className="pt-4 text-center">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Sentiment IQ v1.0.0</p>
                </div>
            </div>
        </div>
    );
};
