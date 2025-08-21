const dict = {
  en: {
    nav_games: 'Games',
    nav_how: 'How it Works',
    nav_token: 'Token',
    nav_roadmap: 'Roadmap',
    hero_title: 'Play Mini‑Games. Earn On‑Chain Rewards on Base.',
    hero_sub: 'Mobile‑first. Claim tokens at milestones. Gas paid by player on claim.',
    cta_play: 'Play Now',
    cta_token: 'View Tokenomics',
    games_h2: 'Games',
    games_sub: 'Pick your favorite. Claim after you hit targets.',
    how_h2: 'How it Works',
    how_1_t: 'Connect Wallet',
    how_1_d: 'Coinbase Wallet / MetaMask / others.',
    how_2_t: 'Play a Game',
    how_2_d: 'Reach a milestone (e.g., score 10).',
    how_3_t: 'Claim on Base',
    how_3_d: 'Send a tx to the reward contract.',
    note_gas: '* Gas is paid by player on claim.',
    token_h2: 'Token',
    token_supply: 'Total Supply',
    token_pool: 'Reward Pool',
    token_paid: 'Players Paid',
    token_tx: 'Tx on Base',
    token_view: 'View on BaseScan',
    token_read: 'Read Tokenomics',
    roadmap_h2: 'Roadmap',
    roadmap_mvp: '3 games live, on‑chain claims.',
    roadmap_growth: '10+ games, leaderboard, daily quests.',
    roadmap_scale: 'Tournaments, NFT badges, partners.',
    footer_rights: 'All rights reserved.',
    details: 'Details',
    play: 'Play',
    reward_per_claim: 'Per claim',
    reward_threshold: 'Threshold',
    reward_dailycap: 'Daily cap',
    modal_reward_na: 'Reward not available yet.',
    // Snake page
    back: 'Back',
    score: 'Score',
    claim: 'Claim Reward',
    controls_hint: 'Controls: swipe or arrow keys',
    need_score: 'Need score ≥ 10 to claim',
    claim_calling: 'Sending claim transaction…',
    claim_done: 'Claim submitted!',
    claim_fail: 'Claim failed',
    connect_wallet_first: 'Please connect your wallet first.'
  },
  id: {
    nav_games: 'Games',
    nav_how: 'Cara Kerja',
    nav_token: 'Token',
    nav_roadmap: 'Roadmap',
    hero_title: 'Main Mini‑Game. Dapatkan Reward On‑Chain di Base.',
    hero_sub: 'Mobile‑first. Klaim token saat milestone. Gas dibayar pemain saat klaim.',
    cta_play: 'Main Sekarang',
    cta_token: 'Lihat Tokenomics',
    games_h2: 'Games',
    games_sub: 'Pilih game favoritmu. Klaim setelah capai target.',
    how_h2: 'Cara Kerja',
    how_1_t: 'Connect Wallet',
    how_1_d: 'Coinbase Wallet / MetaMask / lainnya.',
    how_2_t: 'Mainkan Game',
    how_2_d: 'Capai milestone (mis: skor 10).',
    how_3_t: 'Klaim di Base',
    how_3_d: 'Kirim transaksi ke kontrak reward.',
    note_gas: '* Gas dibayar pemain saat klaim.',
    token_h2: 'Token',
    token_supply: 'Total Supply',
    token_pool: 'Reward Pool',
    token_paid: 'Pemain Dibayar',
    token_tx: 'Tx di Base',
    token_view: 'Lihat di BaseScan',
    token_read: 'Baca Tokenomics',
    roadmap_h2: 'Roadmap',
    roadmap_mvp: '3 game live, klaim on‑chain.',
    roadmap_growth: '10+ game, leaderboard, daily quests.',
    roadmap_scale: 'Turnamen, NFT badges, kemitraan.',
    footer_rights: 'Semua hak dilindungi.',
    details: 'Detail',
    play: 'Main',
    reward_per_claim: 'Per klaim',
    reward_threshold: 'Threshold',
    reward_dailycap: 'Batas harian',
    modal_reward_na: 'Reward belum tersedia.',
    // Snake page
    back: 'Kembali',
    score: 'Skor',
    claim: 'Klaim Reward',
    controls_hint: 'Kontrol: swipe atau tombol panah',
    need_score: 'Butuh skor ≥ 10 untuk klaim',
    claim_calling: 'Mengirim transaksi klaim…',
    claim_done: 'Klaim terkirim!',
    claim_fail: 'Klaim gagal',
    connect_wallet_first: 'Silakan connect wallet dulu.'
  }
};

export function detectLang() {
  const nav = navigator.language || 'en';
  return nav.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function initI18n(root = document, forced) {
  const lang = forced || localStorage.getItem('lang') || detectLang();
  localStorage.setItem('lang', lang);
  root.documentElement?.setAttribute?.('lang', lang);
  const t = dict[lang] || dict.en;
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key || t[key] == null) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
    else el.textContent = t[key];
  });
}

export function setLang(lang, root = document) {
  localStorage.setItem('lang', lang);
  initI18n(root, lang);
}
