# 🌐 GoGoCash - Decentralized Cashback Payment System

[![Next.js](https://img.shields.io/badge/Next.js-15.1+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

A modern, decentralized cashback payment system built with Next.js, TypeScript, and blockchain technology. GoGoCash enables users to earn and redeem cashback rewards through a secure, multi-chain smart contract infrastructure.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Smart Contracts](#-smart-contracts)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

## ✨ Features

### Core Features
- **💰 Cashback System**: Earn cashback rewards on transactions
- **🔗 Multi-Chain Support**: Deploy on Binance, Celo, Polygon, and Sonic chains
- **👛 Crypto Wallet Integration**: Seamless Crossmint wallet connectivity
- **🔐 Secure Authentication**: JWT-based auth with NextAuth.js
- **📱 Responsive Design**: Mobile-first, PWA-ready application

### User Features
- **Dashboard**: Real-time cashback overview and analytics
- **Wallet Management**: View balances, transactions, and manage funds
- **Withdrawal System**: Easy withdrawal of earned cashback
- **Shop & Products**: Browse merchants and discover deals
- **Promotions**: Access exclusive promotional offers
- **Transaction History**: Complete transaction tracking
- **Profile Management**: User settings and preferences
- **Notifications**: Real-time updates and alerts

### Technical Features
- **Next.js 15+**: App Router with Server Components
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **SWR**: Efficient data fetching and caching
- **Zod**: Schema validation
- **Recharts**: Data visualization
- **Jest**: Comprehensive testing

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────┤
│  Components │ Features │ Hooks │ Providers │ Lib            │
├─────────────────────────────────────────────────────────────┤
│                  Authentication (NextAuth)                   │
├─────────────────────────────────────────────────────────────┤
│                  Wallet (Crossmint SDK)                      │
├─────────────────────────────────────────────────────────────┤
│              Multi-Chain Smart Contracts                     │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│   │Binance  │ │  Celo   │ │ Polygon │ │  Sonic  │          │
│   │  Chain  │ │  Chain  │ │  Chain  │ │  Chain  │          │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node >= 20.18.0
yarn >= 1.22.22
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mygogocash/gogocash_public.git
   cd gogocash_public
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration (see [Configuration](#-configuration))

4. **Start development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint checks |
| `yarn format` | Format code with Prettier |
| `yarn test` | Run all tests |
| `yarn test:watch` | Run tests in watch mode |

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Node Environment
NODE_ENV=development

# Crossmint Wallet Integration
NEXT_PUBLIC_CROSSMINT_PROJECT_ID=your_crossmint_project_id
NEXT_PUBLIC_CROSSMINT_API_KEY=your_crossmint_api_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Crossmint Setup

1. Create an account at [Crossmint](https://crossmint.com)
2. Create a new project and obtain your Project ID and API Key
3. Configure your wallet settings in the Crossmint dashboard
4. Update your environment variables with the credentials

## 📁 Project Structure

```
gogocash_public/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (page)/            # Main pages
│   │   ├── api/               # API routes
│   │   ├── login/             # Authentication pages
│   │   ├── wallet/            # Wallet management
│   │   ├── withdraw/          # Withdrawal flow
│   │   ├── shop/              # Shopping pages
│   │   ├── product/           # Product details
│   │   ├── profile/           # User profile
│   │   ├── promotion/         # Promotions
│   │   ├── history/           # Transaction history
│   │   └── notification/      # Notifications
│   │
│   ├── components/            # Reusable UI components
│   │   └── common/           # Shared components
│   │
│   ├── features/             # Feature modules
│   │   ├── desktop/          # Desktop-specific features
│   │   │   ├── home/
│   │   │   ├── wallet/
│   │   │   ├── withdraw/
│   │   │   ├── shop/
│   │   │   ├── product/
│   │   │   ├── profile/
│   │   │   ├── promotion/
│   │   │   ├── search/
│   │   │   ├── notification/
│   │   │   └── help/
│   │   └── mobile/           # Mobile-specific features
│   │
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and services
│   │   ├── auth.ts          # Authentication logic
│   │   ├── crossmint.ts     # Crossmint integration
│   │   ├── crossmint-auth.ts
│   │   └── client.ts        # API client
│   │
│   ├── providers/           # React context providers
│   ├── styles/              # Global styles
│   ├── constants/           # App constants
│   └── smart contracts/     # Blockchain contracts
│       ├── binance chain/
│       ├── celo chain/
│       ├── polygon chain/
│       └── sonic chain/
│
├── public/                  # Static assets
├── docs/                    # Documentation
└── .github/                # GitHub workflows
```

## 🔗 Smart Contracts

GoGoCash uses audited smart contracts deployed across multiple blockchain networks:

### Supported Chains

| Chain | Contract | Status |
|-------|----------|--------|
| Binance Smart Chain | CashbackLedger.sol | ✅ Audited |
| Celo | CashbackLedger.sol | ✅ Audited |
| Polygon | CashbackLedger.sol | ✅ Audited |
| Sonic | CashbackLedger.sol | ✅ Audited |

### Audit Report

The smart contracts have been professionally audited. View the audit report:
- [SmartContract_Audit_Report_CashbackLedger.pdf](./src/smart%20contracts/SmartContract_Audit_Report_CashbackLedger.pdf)

## 🐳 Deployment

### Docker Deployment

GoGoCash uses multi-stage Docker builds for optimized production images.

**Development Build:**
```bash
docker build --target development -t gogocash:dev .
```

**Production Build:**
```bash
docker build --target production -t gogocash:prod .
docker run -p 3000:3000 gogocash:prod
```

### Vercel Deployment

The application is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📚 Documentation

- [Commit Conventions](./docs/commit-conventions.md)
- [Git Hooks](./docs/git-hooks.md)
- [Pre-commit Hooks](./docs/pre-commit-hooks.md)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our [commit conventions](./docs/commit-conventions.md)
4. Run tests (`yarn test`)
5. Submit a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write tests for new features
- Keep components modular and reusable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the GoGoCash Team
</p>
