import { isFarcasterLoggedIn, getFarcasterUser } from "./farcaster.js";
import { getAccount, writeContract } from "@wagmi/core"; // otomatis kepake dari Web3Modal wagmi

// ganti dengan contract kamu
const REWARD_CONTRACT = "0xYourContractAddress";
const ABI = [
  {
    "inputs": [{ "name": "fid", "type": "uint256" }],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

document.getElementById("claimBtn").addEventListener("click", async () => {
  const status = document.getElementById("claimStatus");

  // cek Farcaster login
  if (!isFarcasterLoggedIn()) {
    status.innerText = "⚠️ Harus login Farcaster dulu.";
    return;
  }

  // cek wallet
  const account = getAccount();
  if (!account.address) {
    status.innerText = "⚠️ Harus connect wallet dulu.";
    return;
  }

  try {
    status.innerText = "⏳ Mengirim transaksi...";
    const user = getFarcasterUser();

    const txHash = await writeContract({
      address: REWARD_CONTRACT,
      abi: ABI,
      functionName: "claimReward",
      args: [user.fid] // kirim fid Farcaster
    });

    status.innerHTML = `✅ Reward diklaim. <a href="https://basescan.org/tx/${txHash}" target="_blank">Lihat Tx</a>`;
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Gagal claim.";
  }
});
