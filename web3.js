import { WALLETCONNECT_PROJECT_ID, CHAIN, REWARD_CONTRACT_ADDRESS, REWARD_ABI } from './config.js';
import { base } from 'https://unpkg.com/viem/chains@2?module';
import { createWalletClient, custom, getAddress } from 'https://unpkg.com/viem@2?module';
import { createWeb3Modal, defaultWagmiConfig } from 'https://unpkg.com/@web3modal/wagmi@3?module';

// Init Web3Modal (mounts <w3m-button/>)
export function initWeb3() {
  const chains = [base]; // Base mainnet
  const metadata = {
    name: 'PlayBase',
    description: 'Mini‑games with on‑chain rewards',
    url: location.origin,
    icons: ['https://avatars.githubusercontent.com/u/37784886?s=200&v=4']
  };
  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId: WALLETCONNECT_PROJECT_ID,
    metadata,
    enableCoinbase: true,
    enableInjected: true,
    enableWalletConnect: true,
    enableEIP6963: true
  });
  createWeb3Modal({
    wagmiConfig,
    projectId: WALLETCONNECT_PROJECT_ID,
    chains,
    defaultChain: base,
    themeVariables: {'--w3m-accent': '#0052FF'}
  });
}

export async function ensureBaseChain() {
  if (!window.ethereum) throw new Error('No wallet provider');
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (chainId !== CHAIN.hex) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CHAIN.hex }]
    });
  }
}

export async function getAccount() {
  if (!window.ethereum) throw new Error('No wallet provider');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return getAddress(accounts[0]);
}

export async function writeClaim(args = []) {
  if (!window.ethereum) throw new Error('No wallet provider');
  await ensureBaseChain();
  const account = await getAccount();
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: custom(window.ethereum)
  });
  const hash = await walletClient.writeContract({
    address: REWARD_CONTRACT_ADDRESS,
    abi: REWARD_ABI,
    functionName: 'claim',
    args
  });
  return hash;
}
