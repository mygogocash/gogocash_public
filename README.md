# 🌐 GoGoCash

Modern cashback application frontend built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 13+**: App Router, Server Components
- **TypeScript**: Type-safe development  
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **PWA Ready**: Progressive Web App capabilities
- **Authentication**: JWT-based auth integration
- **Real-time Updates**: Live cashback tracking
- **Multi-language**: i18n support

## 🛠 Development

### Prerequisites
```bash
node >= 20.0.0
yarn or npm
```

### Quick Start
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Available Scripts
```bash
yarn dev          # Development server
yarn build        # Production build
yarn start        # Production server
yarn lint         # ESLint check
yarn lint:fix     # Fix lint issues
yarn test         # Run tests
yarn test:watch   # Watch mode tests
```

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=GoGoCash
NEXT_PUBLIC_ENV=development
```

### API Integration
- REST API endpoints
- Real-time cashback updates
- User authentication
- Transaction history

## 📱 Features

### User Interface
- Dashboard with cashback overview
- Transaction history
- Merchant directory
- Reward redemption
- Profile management

### Performance
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting

## 🚀 Deployment

Built with Docker multi-stage builds for optimal production images.

```bash
# Development
docker build --target development -t web:dev .

# Production
docker build --target production -t web:prod .
```

## 📚 Documentation

- [API Integration](./docs/api-integration.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
