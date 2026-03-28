// Initialize UI Elements
const loginBtn = document.getElementById('loginBtn');
const loadingUI = document.getElementById('loadingUI');
const statusMsg = document.getElementById('statusMsg');

loginBtn.addEventListener('click', () => {
    // 1. Update GUIX to show loading state
    loginBtn.classList.add('hidden');
    loadingUI.classList.remove('hidden');
    loadingUI.classList.add('flex');
    
    // 2. Communicate with background worker to start auth
    // Comment for log: Sending message to background.js to begin identity verification
    chrome.runtime.sendMessage({ action: "initiate_login" }, (response) => {
        
        loadingUI.classList.add('hidden');
        loadingUI.classList.remove('flex');
        statusMsg.classList.remove('hidden');

        if (chrome.runtime.lastError) {
            // Handle communication errors
            statusMsg.textContent = "Error communicating with gateway.";
            statusMsg.className = "mt-4 text-xs text-red-400";
            loginBtn.classList.remove('hidden');
            console.error("Popup Error:", chrome.runtime.lastError);
        } else if (response && response.status === "success") {
            // Success: background.js will handle the Render Window URL injection
            statusMsg.textContent = "Verified! Opening secure portal...";
            statusMsg.className = "mt-4 text-xs text-green-400";
        } else {
            // Auth rejection or failure
            statusMsg.textContent = response.message || "Authentication failed.";
            statusMsg.className = "mt-4 text-xs text-red-400";
            loginBtn.classList.remove('hidden');
        }
    });
});