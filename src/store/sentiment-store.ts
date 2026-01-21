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
    setResult: (result: SentimentResult | null) => void;
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

export const useSentimentStore = create<SentimentState>((set) => {
    // Initialize from storage
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(["currentProduct", "history", "scansUsed"]).then((data) => {
            const updates: Partial<SentimentState> = {};
            if (data.currentProduct && typeof data.currentProduct === 'object' && 'name' in data.currentProduct) {
                updates.currentProduct = data.currentProduct as ProductMetadata;
            }
            if (Array.isArray(data.history)) {
                updates.history = data.history as HistoryItem[];
            }
            if (typeof data.scansUsed === 'number') {
                updates.scansUsed = data.scansUsed;
            }
            set(updates);
        });

        // Listen for changes from content scripts
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && changes.currentProduct) {
                set({ currentProduct: changes.currentProduct.newValue as ProductMetadata });
            }
        });
    }

    return {
        currentProduct: null,
        sentimentResult: null,
        isLoading: false,
        error: null,
        isAuthenticated: true, // Keep true for now to allow full flow testing
        dailyLimit: 3,
        scansUsed: 0,
        plan: 'FREE',
        isBottomSheetOpen: false,
        currentView: 'HOME',
        authMode: 'SIGN_UP',
        activeTab: 'home',
        user: { name: "Test User", email: "test@example.com" }, 
        theme: 'system',
        autoAnalyze: false,
        notifications: true,
        history: [],

        setProduct: (product) => set({ currentProduct: product, error: null }),
        setResult: (result) => set({ sentimentResult: result, isLoading: false, isBottomSheetOpen: true }),
        setLoading: (loading) => set({ isLoading: loading, error: null }),
        setError: (error) => set({ error, isLoading: false }),
        setBottomSheetOpen: (open) => set({ isBottomSheetOpen: open }),
        setView: (view) => set({ currentView: view }),
        setAuthMode: (mode) => set({ authMode: mode }),
        setActiveTab: (tab) => set({ activeTab: tab }),
        incrementScans: () => set((state) => {
            const newCount = state.scansUsed + 1;
            chrome.storage.local.set({ scansUsed: newCount });
            return { scansUsed: newCount };
        }),
        addToHistory: (item) => set((state) => {
            const newHistory = [item, ...state.history].slice(0, 50); // Limit history size
            chrome.storage.local.set({ history: newHistory });
            return { history: newHistory };
        }),
        clearHistory: () => {
            chrome.storage.local.set({ history: [] });
            set({ history: [] });
        },
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
    };
});
