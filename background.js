// INITIALIZATION LOG: App Version 0.1.0 
// This service worker runs in the background, listening for messages from the popup UI.

console.log("Phyxanul Gateway v0.1.0: Background service worker initialized.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "initiate_login") {
        console.log("Log: Login initiation requested from GUIX.");
        
        // ------------------------------------------------------------------
        // AUTHENTICATION FLOW (MS Login / Patreon Verifiable)
        // ------------------------------------------------------------------
        // In a true Edge/Chromium environment, chrome.identity.getAuthToken 
        // hooks natively into the logged-in Microsoft/Google account.
        // For custom OAuth (like Patreon), we use launchWebAuthFlow.
        
        // LAB TEST MOCK FLOW: 
        // To prevent the lab test from crashing without a real Client ID, 
        // we will simulate a successful verifiable login and proceed to the Render Window.
        
        const isLabTest = true; 

        if (isLabTest) {
            console.log("Log: Lab test active. Simulating successful OAuth verification.");
            setTimeout(() => {
                const mockSecureToken = "ms_patreon_verified_token_" + Math.random().toString(36).substring(7);
                handleSuccessfulLogin(mockSecureToken);
                sendResponse({ status: "success", message: "Verification complete." });
            }, 1500);
            
            return true; // Keeps the message channel open for async response
        } else {
            // PRODUCTION FLOW (Requires manifest.json client_id configuration)
            chrome.identity.getAuthToken({ interactive: true }, function(token) {
                if (chrome.runtime.lastError) {
                    console.error("Log Error: Authentication failed.", chrome.runtime.lastError.message);
                    sendResponse({ status: "error", message: chrome.runtime.lastError.message });
                    return;
                }
                console.log("Log: Authentication successful. Token retrieved.");
                handleSuccessfulLogin(token);
                sendResponse({ status: "success" });
            });
            return true;
        }
    }
});

// ------------------------------------------------------------------
// RENDER WINDOW URL FROM APP
// ------------------------------------------------------------------
function handleSuccessfulLogin(secureToken) {
    // We store the token securely in the browser's local extension storage
    chrome.storage.local.set({ phyxanulAuth: secureToken }, () => {
        console.log("Log: Token securely stored.");
        
        // Construct the private domain URL and inject the verifiable token
        // In production, your backend will consume this token, verify it with MS/Patreon, and issue a session cookie.
        const targetDomain = "https://phyxanul-domain.com"; // Replace with actual lab/prod domain
        const renderUrl = `${targetDomain}/portal-entry?auth_handshake=${secureToken}`;
        
        console.log(`Log: Rendering window URL from app: ${renderUrl}`);
        
        // Open the Tubi-style video portal in a new Edge tab
        chrome.tabs.create({ url: renderUrl });
    });
}