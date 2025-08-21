// pastikan di index.html sudah ada:
// <script src="https://cdn.jsdelivr.net/npm/@farcaster/auth-kit"></script>
// <script type="module" src="./farcaster.js"></script>

let farcasterClient = null;

async function initFarcaster() {
  try {
    // bikin instance client
    farcasterClient = new window.AuthKit({
      rpcUrl: "https://hub.farcaster.xyz", // hub resmi Farcaster
    });
  } catch (err) {
    console.error("Gagal init Farcaster:", err);
  }
}

// fungsi login Farcaster
export async function loginFarcaster() {
  try {
    if (!farcasterClient) await initFarcaster();

    const session = await farcasterClient.signIn();

    const user = {
      fid: session.fid,
      username: session.username,
      avatar: session.pfpUrl,
      custody: session.custodyAddress,
    };

    console.log("✅ Farcaster login sukses:", user);

    // update UI
    const container = document.getElementById("farcasterUser");
    if (container) {
      container.innerHTML = `
        <img src="${user.avatar}" width="30" style="border-radius:50%"/> 
        <b>@${user.username}</b>
      `;
    }

    return user;
  } catch (err) {
    console.error("❌ Login Farcaster gagal:", err);
    alert("Login Farcaster gagal");
    return null;
  }
}
