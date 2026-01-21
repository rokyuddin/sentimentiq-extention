// Background script to manage tab-specific product states
import { ProductMetadata } from '../types/schemas';

// In-memory map to store product info per tab
const tabProducts: Record<number, ProductMetadata | null> = {};

// Update the global currentProduct in storage
const updateGlobalProduct = async (tabId: number) => {
  const product = tabProducts[tabId] || null;
  console.log(`[Background] Syncing product for tab ${tabId}:`, product);
  await chrome.storage.local.set({ currentProduct: product });
};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PRODUCT_DETECTED' && sender.tab?.id) {
    const tabId = sender.tab.id;
    tabProducts[tabId] = message.payload;
    console.log(`[Background] Product detected in tab ${tabId}:`, message.payload);

    // Only update global if this is the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id === tabId) {
        updateGlobalProduct(tabId);
      }
    });

    sendResponse({ success: true });
  }
});

// Sync when switching tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log(`[Background] Tab activated: ${activeInfo.tabId}`);
    updateGlobalProduct(activeInfo.tabId);
});

// Sync when tab content is updated (e.g., refresh or path change in SPA)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    updateGlobalProduct(tabId);
  }
});

// Clean up when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  console.log(`[Background] Tab removed: ${tabId}`);
  delete tabProducts[tabId];
});

console.log('[Background] SentimentIQ Service Worker initialized');
