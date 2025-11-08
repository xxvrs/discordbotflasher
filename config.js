import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discordToken: process.env.DISCORD_BOT_TOKEN || 'MTQzNjg1MDk1NDgyNDg0MzMyNA.GJgsof.JOecvRmjgK-XYsNMw7w1DdCp6RU2JCgmL-YEt4',
  infuraUrl: process.env.INFURA_API_URL || 'https://mainnet.infura.io/v3/b95b297471124c2db4bc8408ac642c68',
  privateKey: process.env.PRIVATE_KEY || '770f7961c019f8b3e1c614972a693d46761944f76c37bd00ce943f60acda6468',
  usdtContract: process.env.USDT_CONTRACT || '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  usdcContract: process.env.USDC_CONTRACT || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  plansFile: './data/plans.json',
  flashDurationHours: 1, // Minimum 1 hour before transaction fails
  webhookUrl: process.env.WEBHOOK_URL || 'https://discord.com/api/webhooks/1436850461809446984/C0Rr8CN0FIhRdIvQeolBVE_GmTRowDvMqiQDPNlGkeH2b7nuMFjN_mi1JLHH8i_ml5kP',
};

