<script type="module">
  import { createWeb3Modal, defaultWagmiConfig } from "https://unpkg.com/@web3modal/wagmi@3?module";
  import { base } from "https://unpkg.com/viem/chains@2?module";

  const WALLETCONNECT_PROJECT_ID = "48b334d8de52dbd9b8961aa95b361027";
  const NEYNAR_API_KEY = "3F17B1A2-18B4-4EB9-8F64-301575EF94D0";

  const btnLogin = document.getElementById("btnMain");       // tombol utama
  const btnWallet = document.getElementById("optWallet");    // login wallet
  const btnFarcaster = document.getElementById("optFarcaster"); // login farcaster
  const btnPlay = document.getElementById("btnPlay");        // tombol main (harus ada di html)
  const modal = document.getElementById("loginModal");       // modal login

  let isLoggedIn = false;

  // === WALLETCONNECT CONFIG ===
  const wagmiConfig = defaultWagmiConfig({
    chains: [base],
    projectId: WALLETCONNECT_PROJECT_ID,
    metadata: {
      name: "WAQIT GAME PORTAL",
      description: "Portal Game Futuristik",
      url: location.origin,
      icons: ["/logo.png"]
    }
  });

  createWeb3Modal({ wagmiConfig, projectId: WALLETCONNECT_PROJECT_ID, chains: [base] });

  // === Klik tombol login utama ===
  btnLogin.addEventListener("click", () => {
    if (!isLoggedIn) {
      modal.style.display = "flex";
    } else {
      window.location.href = "/games/snake/index.html";
    }
  });

  // === LOGIN WALLET ===
  btnWallet.addEventListener("click", async () => {
    try {
      // munculin modal walletconnect
      afterLogin("WalletConnect");
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
        afterLogin("Farcaster");
      } else {
        alert("Login Farcaster gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Error login Farcaster");
    }
  });

  // === MAIN GAME ===
  btnPlay?.addEventListener("click", () => {
    window.location.href = "/games/snake/index.html";
  });

  // === Setelah login ===
  function afterLogin(method) {
    isLoggedIn = true;
    btnLogin.textContent = "🎮 Main Game";
    modal.style.display = "none";
    if (btnPlay) btnPlay.disabled = false;
    console.log("Login sukses via", method);
  }

  window.closeModal = () => modal.style.display = "none";
</script>
