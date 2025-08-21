const bgm = document.getElementById("bgm");
const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  if (bgm.muted) {
    bgm.muted = false;
    muteBtn.textContent = "🔊";
  } else {
    bgm.muted = true;
    muteBtn.textContent = "🔇";
  }
});

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Wallet connected!");
    } catch (err) {
      alert("Connection rejected.");
    }
  } else {
    alert("No wallet found. Install MetaMask or Coinbase Wallet.");
  }
});
