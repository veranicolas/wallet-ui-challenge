# WayniWallet - Digital Wallet Application

A modern digital wallet application built with Next.js, TypeScript, and Tailwind CSS. This project simulates the core functionalities of a digital wallet including user management, money transfers, and transaction history.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Superset of JavaScript for type safety.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Zustand**: State management library with persistence.
- **React Query**: Data fetching and state management.
- **React-PDF**: For generating PDF documents.
- **Day.js**: For date manipulation.
- **localStorage**: For persisting user data across sessions.
- **randomuser.me API**: For generating random user data.

## 📁 Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── favicon.ico        # Application favicon
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home screen
│   ├── styles.css         # Home styles
│   ├── profile/           # Profile screen
│   │   ├── page.tsx       # Profile page component
│   │   └── styles.css     # Profile-specific styles
│   ├── send-again/        # Send money screen
│   │   ├── page.tsx       # Send money page component
│   │   ├── styles.css     # Send money page styles
│   │   └── success/       # Success confirmation screen
│   │       ├── page.tsx   # Success page component
│   │       └── styles.css # Success page styles
│   └── transfers/         # Transfers screen
│       ├── page.tsx       # Transfers page component
│       └── styles.css     # Transfers-specific styles
├── assets/                # Static assets and icons
│   ├── icon-history.svg   # History/transfers icon
│   ├── icon-home.svg      # Home screen icon
│   └── icon-profile.svg   # Profile screen icon
├── components/            # Reusable UI components
│   ├── NavigationBar.tsx  # Bottom navigation
│   ├── PDF.tsx            # PDF generation component
│   ├── QueryProvider.tsx  # React Query provider
│   ├── Skeletons.tsx      # Loading skeletons
│   └── UserAvatar.tsx     # User avatar component
├── services/              # API services and hooks
│   ├── hooks.ts           # React Query hooks
│   └── userService.ts     # randomuser.me API service
├── stores/                # State management
│   └── walletStore.ts     # Zustand store with persistence
├── types/                 # TypeScript type definitions
│   └── index.ts           # Application types
└── utils/                 # Utility functions
    └── index.ts           # Helper functions
```

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/veranicolas/wallet-ui-challenge.git
   cd wayniwallet-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)
