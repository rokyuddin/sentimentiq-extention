import { useEffect } from 'react'
import { extractProductInfo } from '@/lib/extraction'

function App() {
  useEffect(() => {
    const handleExtraction = () => {
      const info = extractProductInfo();
      console.log('[SentimentIQ] Extraction check:', info);
      
      // Notify background script
      chrome.runtime.sendMessage({ 
        type: 'PRODUCT_DETECTED', 
        payload: info || null 
      });
    };

    // Run on mount
    handleExtraction();

    // Handle SPA navigation (poll or listen to common events)
    const interval = setInterval(handleExtraction, 3000);
    
    // Also listen to popstate for browser navigation
    window.addEventListener('popstate', handleExtraction);

    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', handleExtraction);
    };
  }, []);

  // No UI needed - just background product detection
  return null;
}

export default App
