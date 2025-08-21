import { WALLETCONNECT_PROJECT_ID, NEYNAR_API_KEY } from "./config.js";
import { createWeb3Modal, defaultWagmiConfig } from "https://unpkg.com/@web3modal/wagmi@3?module";
import { base } from "https://unpkg.com/viem/chains@2?module";

const btnLogin = document.getElementById("btnLogin");
const btnWallet = document.getElementById("btnWallet");
const btnFarcaster = document.getElementById("btnFarcaster");
const btnPlay = document.getElementById("btnPlay");
const loginOptions = document.getElementById("loginOptions");

let isLoggedIn = false;

// === WALLETCONNECT CONFIG ===
const wagmiConfig = defaultWagmiConfig({
  chains: [base],
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: "WAQIT GAME PORTAL",
    description: "Portal Game Futuristik",
    url: location.origin,
    icons: ["/assets/logo.png"]
  }
});
createWeb3Modal({ wagmiConfig, projectId: WALLETCONNECT_PROJECT_ID, chains: [base] });

// === Buka pilihan login ===
btnLogin.addEventListener("click", () => {
  loginOptions.style.display = loginOptions.style.display === "none" ? "block" : "none";
});

// === LOGIN WALLET ===
btnWallet.addEventListener("click", async () => {
  try {
    isLoggedIn = true;
    btnLogin.innerText = "✅ Wallet Connected";
    enablePlay();
    loginOptions.style.display = "none";
  } catch (err) {
    console.error(err);
    alert("Gagal connect wallet");
  }
});

// === LOGIN FARCASTER ===
btnFarcaster.addEventListener("click", async () => {
  try {
    const res = await fetch("https://api.neynar.com/v2/farcaster/user", {
      headers: { "api_key": NEYNAR_API_KEY }
    });
    if (res.ok) {
      isLoggedIn = true;
      btnLogin.innerText = "✅ Farcaster Connected";
      enablePlay();
      loginOptions.style.display = "none";
    } else {
      alert("Login Farcaster gagal");
    }
  } catch (err) {
    console.error(err);
    alert("Error login Farcaster");
  }
});

// === ENABLE PLAY ===
function enablePlay() {
  if (isLoggedIn) btnPlay.disabled = false;
}

// === MAIN GAME ===
btnPlay.addEventListener("click", () => {
  window.location.href = "/games/snake/index.html";
});
