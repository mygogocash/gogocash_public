# 🌐 GoGoCash - Decentralized Cashback Payment System

[![Next.js](https://img.shields.io/badge/Next.js-15.1+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

A modern, decentralized cashback payment system built with Next.js, TypeScript, and blockchain technology. GoGoCash enables users to earn and redeem cashback rewards through a secure, multi-chain smart contract infrastructure.

---

## 📋 Table of Contents

- [Features](#-features)
- [Feature Details](#-feature-details)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Running on Your Own System](#-running-on-your-own-system)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Smart Contracts](#-smart-contracts)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 💰 **Cashback System** | Earn cashback rewards on every transaction |
| 🔗 **Multi-Chain Support** | Deploy on Binance, Celo, Polygon, and Sonic chains |
| 👛 **Crypto Wallet** | Seamless Crossmint wallet integration |
| 🔐 **Secure Auth** | JWT-based authentication with NextAuth.js |
| 📱 **Responsive** | Mobile-first, PWA-ready application |

---

## 📖 Feature Details

### 🏠 Dashboard (Home)

The main landing page provides a comprehensive overview of the platform:

- **Hero Banner**: Dynamic promotional banners with call-to-action
- **How It Works**: Step-by-step guide explaining the cashback process
- **Featured Merchants**: Carousel of partner merchants offering cashback
- **Don't Miss Section**: Time-sensitive deals and limited offers
- **Product Recommendations**: Personalized product suggestions
- **Community Section**: Social proof and user engagement features
- **Mobile App Banner**: Download links for iOS and Android apps

---

### 👛 Wallet Management

Complete cryptocurrency wallet functionality:

#### Balance Overview
- **Real-time Balance Display**: View your current cashback balance in USD
- **Visual Balance Card**: Beautiful UI with wallet icon and balance amount
- **Quick Actions**: One-click access to withdraw funds

#### Transaction History
- **Complete History**: View all past transactions with timestamps
- **Transaction Types**: Track deposits, withdrawals, and cashback earnings
- **Status Tracking**: Monitor pending, completed, and failed transactions
- **Filtering**: Filter transactions by date, type, or status

#### Payment Methods
- **Add Payment Methods**: Link bank accounts or crypto wallets
- **Edit/Remove Methods**: Manage existing payment options
- **Default Selection**: Set preferred withdrawal destination
- **Secure Storage**: Encrypted payment information

---

### 💸 Withdrawal System

Blockchain-powered withdrawal with multi-chain support:

#### Supported Chains
| Chain | Network | Speed | Fees |
|-------|---------|-------|------|
| 🟡 Binance Smart Chain | BNB Chain | ~3 seconds | Low |
| 🟢 Celo | Celo Mainnet | ~5 seconds | Very Low |
| 🟣 Polygon | Polygon PoS | ~2 seconds | Very Low |
| 🔵 Sonic | Sonic Network | ~1 second | Minimal |

#### Withdrawal Process
1. **Balance Check**: Verify available balance via `/withdraw/check` API
2. **Chain Selection**: Choose your preferred blockchain network
3. **Wallet Address**: Enter destination wallet address
4. **Amount Input**: Specify withdrawal amount (minimum thresholds apply)
5. **Confirmation**: Review and confirm transaction details
6. **Processing**: Smart contract executes the transfer
7. **Completion**: Receive funds in your wallet

#### Features
- **Real-time Conversion**: View USD to crypto conversion rates
- **Gas Estimation**: See estimated transaction fees before confirming
- **Transaction Tracking**: Monitor withdrawal status in real-time
- **Secure Signing**: Crossmint wallet integration for secure transactions

---

### 🛒 Shop & Merchants

Discover and shop from partner merchants:

#### Merchant Directory
- **Browse All Merchants**: Grid view of all available merchants
- **Search Functionality**: Find merchants by name or category
- **Category Filters**: Filter by Electronics, Fashion, Food, Travel, etc.
- **Cashback Percentages**: See cashback rates displayed on each merchant card
- **Pagination**: Load more merchants with infinite scroll

#### Merchant Categories
- 🛍️ **All** - View all merchants
- 💻 **Electronics** - Tech gadgets and devices
- 👗 **Fashion** - Clothing and accessories
- 🍔 **Food & Dining** - Restaurants and delivery
- ✈️ **Travel** - Hotels, flights, and bookings
- 🏠 **Home & Garden** - Furniture and decor

#### Merchant Details
- **Cashback Rate**: Percentage of purchase returned as cashback
- **Terms & Conditions**: Specific rules for earning cashback
- **How to Claim**: Step-by-step claiming instructions
- **Active Promotions**: Special limited-time offers

---

### 📦 Products

Product discovery and recommendation engine:

#### Product Listing
- **Grid Display**: Responsive product grid (2-5 columns based on screen)
- **Product Cards**: Image, name, shop, cashback percentage, price
- **Quick View**: Preview product details without leaving page
- **Category Tabs**: Switch between product categories easily

#### Product Features
- **Search**: Find products by keyword
- **Sort Options**: Price, cashback rate, popularity
- **Pagination**: Load more products seamlessly
- **Related Products**: See similar items after viewing

#### Product Details Page
- **High-Quality Images**: Multiple product images with zoom
- **Full Description**: Complete product information
- **Cashback Info**: Exact cashback amount you'll earn
- **Buy Now**: Direct link to merchant with affiliate tracking

---

### 🎁 Promotions & Deals

Special offers and promotional campaigns:

#### Promotion Types
- **Flash Sales**: Limited-time high-cashback offers
- **Seasonal Deals**: Holiday and special event promotions
- **Exclusive Offers**: Member-only promotional rates
- **Bundle Deals**: Multi-product cashback bonuses

#### Promotion Display
- **Banner Cards**: Visual promotion cards with images
- **Countdown Timers**: Time remaining for limited offers
- **Cashback Highlight**: Prominently displayed earn rates
- **Terms Display**: Clear eligibility requirements

#### Featured Sections
- **Picked for You**: Personalized promotion recommendations
- **Trending Now**: Popular promotions among users
- **Ending Soon**: Promotions about to expire

---

### 👤 Profile Management

Complete user account management:

#### Personal Information
- **View Profile**: Display name, email, and account details
- **Edit Profile**: Update personal information
- **Profile Picture**: Upload and manage avatar
- **Account Settings**: Preferences and configurations

#### Affiliate Links
- **My Links**: View all generated affiliate links
- **Link Details**: Offer name, creation date, deep link URL
- **Copy to Clipboard**: One-click link copying
- **Link Performance**: Track link usage and earnings
- **Quick Withdraw**: Direct access to withdrawal from earnings

#### Social Connections
- **Connected Accounts**: Link social media accounts
- **Referral Program**: Share referral codes with friends
- **Community Links**: Connect to GoGoCash social channels

---

### 🔔 Notifications

Stay updated with real-time notifications:

#### Notification Categories
| Category | Icon | Description |
|----------|------|-------------|
| **All** | 📋 | View all notifications |
| **Wallet** | 👛 | Balance updates and transactions |
| **Cashback** | 💰 | Earned cashback notifications |
| **Withdraw** | 💸 | Withdrawal status updates |
| **Promotion** | 🏷️ | New deals and offers |
| **Message** | 💬 | System messages and alerts |

#### Notification Features
- **Filter by Type**: Show only specific notification types
- **Read/Unread Status**: Visual indicator for new notifications
- **Timestamp**: When each notification was received
- **Action Links**: Direct links to related pages
- **Clear All**: Mark all as read option

---

### 🔐 Authentication

Secure user authentication system:

#### Login Options
- **Email/Password**: Traditional login method
- **Google OAuth**: One-click Google sign-in
- **Wallet Login**: Connect using Crossmint wallet

#### Registration
- **Email Signup**: Create account with email verification
- **Terms Acceptance**: Agree to terms and privacy policy
- **Welcome Flow**: Guided onboarding for new users

#### Password Management
- **Forgot Password**: Email-based password reset
- **Reset Password**: Secure token-based reset flow
- **New Password**: Set new password with strength validation

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15+)                    │
├─────────────────────────────────────────────────────────────┤
│  Pages (App Router)                                          │
│  ├── Home, Shop, Products, Promotions                       │
│  ├── Wallet, Withdraw, History                              │
│  └── Profile, Login, Notifications                          │
├─────────────────────────────────────────────────────────────┤
│  Components │ Features │ Hooks │ Providers                   │
├─────────────────────────────────────────────────────────────┤
│                  Authentication (NextAuth.js)                │
│  ├── JWT Token Management                                    │
│  ├── Session Handling                                        │
│  └── OAuth Providers (Google)                               │
├─────────────────────────────────────────────────────────────┤
│                  Wallet Integration (Crossmint)              │
│  ├── Wallet Connection                                       │
│  ├── Transaction Signing                                     │
│  └── Balance Management                                      │
├─────────────────────────────────────────────────────────────┤
│              Multi-Chain Smart Contracts                     │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│   │Binance  │ │  Celo   │ │ Polygon │ │  Sonic  │          │
│   │  Chain  │ │  Chain  │ │  Chain  │ │  Chain  │          │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│         CashbackLedger Smart Contract (Audited)              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Description |
|-------------|---------|-------------|
| Node.js | ≥ 20.18.0 | JavaScript runtime |
| Yarn | ≥ 1.22.22 | Package manager |
| Git | Latest | Version control |

### Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/mygogocash/gogocash_public.git

# 2. Navigate to project directory
cd gogocash_public

# 3. Install dependencies
yarn install

# 4. Copy environment file
cp .env.example .env.local

# 5. Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🖥 Running on Your Own System

### Step-by-Step Setup Guide

#### 1. System Requirements

Ensure your system meets these requirements:

```bash
# Check Node.js version
node --version  # Should be v20.18.0 or higher

# Check Yarn version
yarn --version  # Should be v1.22.22 or higher

# If Node.js is not installed, install via nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Install Yarn globally
npm install -g yarn
```

#### 2. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/mygogocash/gogocash_public.git

# OR Clone via SSH (if you have SSH keys set up)
git clone git@github.com:mygogocash/gogocash_public.git

# Navigate into the project
cd gogocash_public
```

#### 3. Install Dependencies

```bash
# Install all dependencies
yarn install

# This will install:
# - Next.js 15.1+ (React framework)
# - React 18.2+ (UI library)
# - TypeScript 5.7+ (Type safety)
# - Tailwind CSS (Styling)
# - NextAuth.js (Authentication)
# - Crossmint SDK (Wallet integration)
# - And many more...
```

#### 4. Environment Configuration

Create your local environment file:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```bash
# ============================================
# ENVIRONMENT CONFIGURATION
# ============================================

# Node Environment (development | production | test)
NODE_ENV=development

# ============================================
# CROSSMINT WALLET CONFIGURATION
# ============================================
# Get these from https://crossmint.com/console

NEXT_PUBLIC_CROSSMINT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_CROSSMINT_API_KEY=your_api_key_here

# ============================================
# NEXTAUTH CONFIGURATION
# ============================================
# Generate secret: openssl rand -base64 32

NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000

# ============================================
# API CONFIGURATION
# ============================================
# Your backend API URL

NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### 5. Run the Development Server

```bash
# Start the development server
yarn dev

# The app will be available at:
# - Local:    http://localhost:3000
# - Network:  http://your-ip:3000
```

#### 6. Verify Installation

Open your browser and navigate to:
- **Homepage**: http://localhost:3000
- **Shop**: http://localhost:3000/shop
- **Wallet**: http://localhost:3000/wallet
- **Login**: http://localhost:3000/login

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with hot reload |
| `yarn build` | Create optimized production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint to check code quality |
| `yarn lint:fix` | Auto-fix linting issues |
| `yarn format` | Format code with Prettier |
| `yarn test` | Run Jest test suite |
| `yarn test:watch` | Run tests in watch mode |

### Development Workflow

```bash
# 1. Start development (with hot reload)
yarn dev

# 2. In another terminal, run tests in watch mode
yarn test:watch

# 3. Before committing, run lint and format
yarn lint:fix && yarn format

# 4. Create production build to verify
yarn build
```

### Troubleshooting

#### Common Issues

**Issue: `yarn install` fails**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn cache clean
yarn install
```

**Issue: Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
yarn dev -p 3001
```

**Issue: Environment variables not loading**
```bash
# Ensure .env.local exists and restart server
cat .env.local  # Verify file contents
yarn dev        # Restart server
```

**Issue: TypeScript errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
yarn dev
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Environment mode |
| `NEXT_PUBLIC_CROSSMINT_PROJECT_ID` | Yes | Crossmint project ID |
| `NEXT_PUBLIC_CROSSMINT_API_KEY` | Yes | Crossmint API key |
| `NEXTAUTH_SECRET` | Yes | NextAuth encryption key |
| `NEXTAUTH_URL` | Yes | Application URL |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |

### Crossmint Wallet Setup

1. Create account at [Crossmint Console](https://crossmint.com/console)
2. Create a new project
3. Copy Project ID and API Key
4. Configure wallet settings
5. Add to environment variables

---

## 📁 Project Structure

```
gogocash_public/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── (page)/               # Main page routes
│   │   ├── api/                  # API routes
│   │   ├── wallet/               # Wallet pages
│   │   ├── withdraw/             # Withdrawal flow
│   │   ├── shop/                 # Shop pages
│   │   ├── product/              # Product pages
│   │   ├── profile/              # Profile pages
│   │   ├── promotion/            # Promotion pages
│   │   ├── history/              # Transaction history
│   │   ├── notification/         # Notifications
│   │   ├── login/                # Auth pages
│   │   └── layout.tsx            # Root layout
│   │
│   ├── 📁 components/            # Reusable UI
│   │   └── common/              # Shared components
│   │
│   ├── 📁 features/             # Feature modules
│   │   ├── desktop/             # Desktop views
│   │   └── mobile/              # Mobile views
│   │
│   ├── 📁 hooks/                # Custom hooks
│   ├── 📁 lib/                  # Utilities
│   ├── 📁 providers/            # Context providers
│   ├── 📁 styles/               # Global styles
│   └── 📁 smart contracts/      # Blockchain contracts
│
├── 📁 public/                   # Static assets
├── 📁 docs/                     # Documentation
├── 📄 package.json              # Dependencies
├── 📄 tailwind.config.js        # Tailwind config
├── 📄 tsconfig.json             # TypeScript config
└── 📄 Dockerfile                # Docker config
```

---

## 🔗 Smart Contracts

### CashbackLedger Contract

Audited smart contract deployed across multiple chains:

| Chain | Contract | Status | Gas |
|-------|----------|--------|-----|
| Binance Smart Chain | CashbackLedger.sol | ✅ Audited | Low |
| Celo | CashbackLedger.sol | ✅ Audited | Very Low |
| Polygon | CashbackLedger.sol | ✅ Audited | Very Low |
| Sonic | CashbackLedger.sol | ✅ Audited | Minimal |

### Audit Report

📄 [View Full Audit Report](./src/smart%20contracts/SmartContract_Audit_Report_CashbackLedger.pdf)

---

## 🐳 Deployment

### Docker

```bash
# Development build
docker build --target development -t gogocash:dev .
docker run -p 3000:3000 gogocash:dev

# Production build
docker build -t gogocash:prod .
docker run -p 3000:3000 gogocash:prod
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## � API Reference

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/withdraw/check` | Check withdrawal eligibility |
| GET | `/offer` | Get available offers |
| POST | `/offer/my-offers` | Get user's affiliate links |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Follow [commit conventions](./docs/commit-conventions.md)
4. Run tests (`yarn test`)
5. Submit Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

<p align="center">
  Made with ❤️ by the GoGoCash Team
</p>
