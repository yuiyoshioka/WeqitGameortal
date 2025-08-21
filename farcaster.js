import { AuthKit } from "https://cdn.jsdelivr.net/npm/@farcaster/auth-kit/dist/browser/index.min.js";

let farcasterUser = null;
const userBox = document.getElementById("farcasterUser");

const authKit = new AuthKit({
  rpcUrl: "https://hub.farcaster.xyz:2281",
  relay: "https://relay.farcaster.xyz",
  appName: "WAQIT GAME PORTAL"
});

window.loginFarcaster = async () => {
  try {
    const res = await authKit.signIn();
    if (res && res.fid) {
      farcasterUser = res;
      userBox.innerHTML = `
        <img src="${res.pfpUrl}" width="30" style="border-radius:50%;margin-right:6px"/>
        <b>@${res.username || res.fid}</b>
      `;
    }
  } catch (err) {
    console.error("Farcaster login error:", err);
    alert("Login Farcaster gagal.");
  }
};

// expose state biar bisa dicek app lain
export function isFarcasterLoggedIn() {
  return farcasterUser !== null;
}
export function getFarcasterUser() {
  return farcasterUser;
}
