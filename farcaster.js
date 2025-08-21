import { AuthKit, FrameValidation } from "https://cdn.jsdelivr.net/npm/@farcaster/auth-kit/dist/browser/index.min.js";

// init Farcaster AuthKit
const authKit = new AuthKit({
  rpcUrl: "https://hub.farcaster.xyz:2281", // public hub RPC
  relay: "https://relay.farcaster.xyz",    // relay official Farcaster
  appName: "WAQIT GAME PORTAL"
});

// ambil tombol dan div user
const userBox = document.getElementById("farcasterUser");

// fungsi untuk login
window.loginFarcaster = async () => {
  try {
    const res = await authKit.signIn();
    console.log("Farcaster login success:", res);

    if (res && res.fid) {
      userBox.innerHTML = `
        <div class="farc-user">
          ✅ Logged in as <b>@${res.username || res.fid}</b>
        </div>
      `;
    }
  } catch (err) {
    console.error("Farcaster login error:", err);
    alert("Login Farcaster gagal, coba lagi.");
  }
};
