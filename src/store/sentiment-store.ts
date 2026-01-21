import { create } from "zustand";
import { ProductMetadata, SentimentResult } from "../types/schemas";

export interface HistoryItem {
    id: string;
    product: ProductMetadata;
    result: SentimentResult;
    timestamp: number;
}

export interface User {
    name: string;
    email: string;
    avatar?: string;
}

interface SentimentState {
    currentProduct: ProductMetadata | null;
    sentimentResult: SentimentResult | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    history: HistoryItem[];

    // New fields
    dailyLimit: number;
    scansUsed: number;
    plan: 'FREE' | 'PRO';
    isBottomSheetOpen: boolean;
    currentView: 'HOME' | 'AUTH';
    authMode: 'SIGN_UP' | 'SIGN_IN';
    activeTab: 'home' | 'history' | 'settings';

    // User Settings
    user: User | null;
    theme: 'light' | 'dark' | 'system';
    autoAnalyze: boolean;
    notifications: boolean;

    // Actions
    setProduct: (product: ProductMetadata) => void;
    setResult: (result: SentimentResult) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setBottomSheetOpen: (open: boolean) => void;
    setView: (view: 'HOME' | 'AUTH') => void;
    setAuthMode: (mode: 'SIGN_UP' | 'SIGN_IN') => void;
    setActiveTab: (tab: 'home' | 'history' | 'settings') => void;
    incrementScans: () => void;
    addToHistory: (item: HistoryItem) => void;
    clearHistory: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setAutoAnalyze: (enabled: boolean) => void;
    setNotifications: (enabled: boolean) => void;
    logout: () => void;
    reset: () => void;
}

export const useSentimentStore = create<SentimentState>((set) => ({
    currentProduct: null,
    sentimentResult: null,
    isLoading: false,
    error: null,
    isAuthenticated: true,
    dailyLimit: 3,
    scansUsed: 1,
    plan: 'FREE',
    isBottomSheetOpen: false,
    currentView: 'HOME',
    authMode: 'SIGN_UP',
    activeTab: 'home',
    user: {
        name: "Roky Hasan",
        email: "roky@sentimentiq.com",
    },
    theme: 'system',
    autoAnalyze: false,
    notifications: true,
    history: [
        {
            id: '1',
            product: { name: "Sony WH-1000XM5", brand: "Sony" },
            result: { score: 85, label: "high", pros: ["Great ANC", "Comfortable"], cons: ["Expensive"], warnings: [], platforms: ["Reddit"] },
            timestamp: Date.now() - 3600000 * 2 // 2 hours ago
        },
        {
            id: '2',
            product: { name: "iPhone 15 Pro", brand: "Apple" },
            result: { score: 72, label: "medium", pros: ["Camera", "Titanium"], cons: ["USB-C limit"], warnings: ["Overheating reports"], platforms: ["Reddit", "Forums"] },
            timestamp: Date.now() - 3600000 * 24 // 1 day ago
        },
        {
            id: '3',
            product: { name: "Mechanical Keyboard X", brand: "Keychron" },
            result: { score: 45, label: "low", pros: ["Build quality"], cons: ["Software issues", "Lag"], warnings: ["Quality control"], platforms: ["Reddit"] },
            timestamp: Date.now() - 3600000 * 48 // 2 days ago
        }
    ],

    setProduct: (product) => set({ currentProduct: product, error: null }),
    setResult: (result) => set({ sentimentResult: result, isLoading: false, isBottomSheetOpen: true }),
    setLoading: (loading) => set({ isLoading: loading, error: null }),
    setError: (error) => set({ error, isLoading: false }),
    setBottomSheetOpen: (open) => set({ isBottomSheetOpen: open }),
    setView: (view) => set({ currentView: view }),
    setAuthMode: (mode) => set({ authMode: mode }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    incrementScans: () => set((state) => ({ scansUsed: state.scansUsed + 1 })),
    addToHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
    clearHistory: () => set({ history: [] }),
    setTheme: (theme) => set({ theme }),
    setAutoAnalyze: (autoAnalyze) => set({ autoAnalyze }),
    setNotifications: (notifications) => set({ notifications }),
    logout: () => set({ isAuthenticated: false, user: null, currentView: 'AUTH' }),
    reset: () => set({
        currentProduct: null,
        sentimentResult: null,
        isLoading: false,
        error: null,
        isBottomSheetOpen: false,
        currentView: 'HOME'
    }),
}));
