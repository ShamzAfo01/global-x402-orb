
import { Partner } from './types';

export const PARTNERS: Partner[] = [
  { id: '1', name: 'Coinbase', category: 'Infrastructure', description: 'Global crypto exchange and infrastructure provider.' },
  { id: '2', name: 'Cloudflare', category: 'Infrastructure', description: 'Web performance and security solutions.' },
  { id: '3', name: 'Circle', category: 'Payment', description: 'The issuer of USDC and global financial technology firm.' },
  { id: '4', name: 'Anthropic', category: 'AI', description: 'AI safety and research company, creators of Claude.' },
  { id: '5', name: 'Crossmint', category: 'Infrastructure', description: 'Enterprise-grade NFT infrastructure.' },
  { id: '6', name: 'CDP', category: 'Blockchain', description: 'Coinbase Developer Platform services.' },
  { id: '7', name: 'PayAI', category: 'Agentic', description: 'Agentic payment protocols.' },
  { id: '8', name: 'Kite AI', category: 'AI', description: 'Next-generation intelligent agent network.' },
  { id: '9', name: 'Base', category: 'Blockchain', description: 'Layer 2 blockchain by Coinbase.' },
  { id: '10', name: 'Stripe', category: 'Payment', description: 'Financial infrastructure for the internet.' },
  { id: '11', name: 'OpenAI', category: 'AI', description: 'Artificial intelligence research organization.' },
  { id: '12', name: 'Alchemy', category: 'Infrastructure', description: 'Web3 developer platform.' },
  { id: '13', name: 'Infura', category: 'Infrastructure', description: 'Blockchain development suite.' },
  { id: '14', name: 'Chainlink', category: 'Blockchain', description: 'Decentralized oracle network.' },
  { id: '15', name: 'Polygon', category: 'Blockchain', description: 'Ethereum scaling platform.' },
  { id: '16', name: 'Arbitrum', category: 'Blockchain', description: 'Layer 2 scaling for Ethereum.' },
  { id: '17', name: 'Optimism', category: 'Blockchain', description: 'Low-cost Ethereum Layer 2.' },
  { id: '18', name: 'Solana', category: 'Blockchain', description: 'High-performance L1 blockchain.' },
  { id: '19', name: 'Avalanche', category: 'Blockchain', description: 'Eco-friendly smart contracts platform.' },
  { id: '20', name: 'Worldcoin', category: 'Blockchain', description: 'Privacy-preserving digital identity.' },
  { id: '21', name: 'Uniswap', category: 'Payment', description: 'Decentralized exchange protocol.' },
  { id: '22', name: 'Aave', category: 'Payment', description: 'Liquidity protocol for lending.' },
  { id: '23', name: 'Lido', category: 'Blockchain', description: 'Liquid staking for digital assets.' },
  { id: '24', name: 'Safe', category: 'Infrastructure', description: 'The most trusted platform to manage digital assets.' },
  { id: '25', name: 'MetaMask', category: 'Infrastructure', description: 'Self-custodial crypto wallet.' },
  { id: '26', name: 'Phantom', category: 'Infrastructure', description: 'Crypto wallet for Solana and Ethereum.' },
  { id: '27', name: 'EigenLayer', category: 'Blockchain', description: 'Restaking collective on Ethereum.' },
  { id: '28', name: 'Celestia', category: 'Blockchain', description: 'Modular data availability network.' },
  { id: '29', name: 'LayerZero', category: 'Infrastructure', description: 'Omnichain interoperability protocol.' },
  { id: '30', name: 'Pyth Network', category: 'Blockchain', description: 'Real-time market data oracles.' },
  { id: '31', name: 'The Graph', category: 'Infrastructure', description: 'Indexing protocol for organizing blockchain data.' },
  { id: '32', name: 'Etherscan', category: 'Infrastructure', description: 'Ethereum blockchain explorer.' },
  { id: '33', name: 'Ledger', category: 'Infrastructure', description: 'Hardware security for crypto assets.' },
  { id: '34', name: 'Trezor', category: 'Infrastructure', description: 'The original hardware wallet.' },
  { id: '35', name: 'Fireblocks', category: 'Infrastructure', description: 'Institutional digital asset platform.' },
  { id: '36', name: 'Copper', category: 'Infrastructure', description: 'Digital asset custody and prime services.' },
  { id: '37', name: 'MoonPay', category: 'Payment', description: 'Crypto on-ramp and off-ramp services.' },
  { id: '38', name: 'Transak', category: 'Payment', description: 'Web3 onboarding infrastructure.' },
  { id: '39', name: 'Wormhole', category: 'Infrastructure', description: 'Cross-chain messaging protocol.' },
  { id: '40', name: 'Axelar', category: 'Infrastructure', description: 'Interoperability for the cross-chain future.' },
];

// Duplicate to reach ~80 items as requested
export const EXTENDED_PARTNERS = [
  ...PARTNERS,
  ...PARTNERS.map(p => ({ ...p, id: `ext-${p.id}` }))
];
