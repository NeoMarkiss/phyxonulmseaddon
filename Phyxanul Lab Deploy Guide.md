# **🧪 Phyxanul Domain App: Local Lab Iteration Setup**

## **1\. Valid Design & Architecture**

This lab test implements the "Gateway Add-on" model.

1. **The Extension** acts as the locked front door.  
2. **The Popup (GUIX)** provides a modern, dark-themed (Tubi-style) interface prompting the user to verify their membership.  
3. **The Background Worker** handles the OAuth flow (MS Login / Patreon) securely outside the DOM.  
4. **Render Window URL:** Upon successful verification, the add-on dynamically generates and injects the user's secure token, opening a new Edge tab to your private video portal.

## **2\. Minimum Requirements & Browser Equivalence**

* **Manifest Standard:** Manifest V3 (MV3). *Note: MV2 is deprecated, MV3 is strictly required by Microsoft and Google.*  
* **Minimum Browser Version:** Microsoft Edge v114+ (Required for stable MV3 service workers and modern Identity APIs).  
* **Chromium Variants:** Because Edge is a Chromium browser, this exact codebase is **100% equivalent and compatible** with:  
  * Google Chrome (v114+)  
  * Brave Browser  
  * Opera & Vivaldi  
* **Best GUIX (UI/UX):** We are utilizing Tailwind CSS via CDN in the popup for a premium, lightweight, responsive dark-mode UI.

## **3\. Local Lab Test Deploy (Add-on Install)**

To test this directly in Microsoft Edge without publishing it to the public store:

1. **Create a Folder:** Create a new folder on your computer named Phyxanul\_Addon\_v0.1.0.  
2. **Save the Files:** Save the 4 code files generated below (manifest.json, background.js, popup.html, popup.js) into this folder.  
3. **Open Edge Extensions:** Open Microsoft Edge and navigate to edge://extensions/ in the URL bar.  
4. **Enable Developer Mode:** Toggle the **Developer mode** switch in the bottom left corner (or top right, depending on your Edge version) to **ON**.  
5. **Load Unpacked:** Click the **Load unpacked** button at the top of the page.  
6. **Select Folder:** Select the Phyxanul\_Addon\_v0.1.0 folder you created.  
7. **Pin it:** The extension is now installed locally\! Click the "Puzzle piece" icon in your Edge toolbar and click the "Eye" or "Pin" icon to keep it visible.

## **4\. Next Steps for Production**

* **Register OAuth Application:** To make the chrome.identity flow work in production, you must register an OAuth application in the Microsoft Entra Admin Center (for MS Login) or the Patreon Developer Portal, and paste the client\_id into the manifest.json OAuth2 block.  
* **Set up the Private Domain:** Build the receiving frontend (https://phyxanul-domain.com/verify) to accept the token passed by the extension and grant access to the video catalog.