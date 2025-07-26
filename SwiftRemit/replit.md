# SwiftRemit - International Money Transfer Application

## Overview

SwiftRemit is a full-stack web application for international money transfers built with React, Express, and Firebase. The application provides user authentication, account management, and a modern UI for financial transactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot reload with tsx and Vite middleware integration

### Authentication & User Management
- **Primary Auth**: Firebase Authentication for secure login/signup
- **Database**: PostgreSQL with Drizzle ORM for user profiles and account data
- **Hybrid System**: Firebase handles authentication, PostgreSQL stores user profile data
- **API Integration**: Express.js backend with RESTful endpoints for user management

## Key Components

### Frontend Components
- **Pages**: Landing, Signup, Login, and 404 error handling
- **UI Components**: Complete Shadcn/ui component library including forms, dialogs, toasts
- **Custom Hooks**: Mobile detection, toast notifications
- **Utilities**: Class name merging, query client configuration

### Backend Components
- **Route Registration**: Centralized route management system
- **Storage Interface**: Abstracted storage layer supporting multiple implementations
- **Middleware**: Request logging, error handling, and development tooling
- **Vite Integration**: Development server with HMR support

### Database Schema
- **User Model**: ID, username, full name, country, contact info, email, currency, account number, balance
- **Validation Schemas**: Zod schemas for signup/login forms with country-currency mapping
- **Drizzle Configuration**: PostgreSQL dialect with migration support

## Data Flow

### User Registration Flow
1. User submits signup form with validation
2. Firebase creates authentication account
3. User profile stored in Firestore with generated account number
4. Automatic currency assignment based on country selection
5. Welcome toast with account details displayed

### Authentication Flow
1. Login form validates credentials against Firebase Auth
2. Successful authentication triggers user session
3. User redirected to appropriate dashboard (pending implementation)
4. Error handling with user-friendly toast messages

### Development Flow
1. Vite dev server handles frontend assets and HMR
2. Express server proxies API requests with logging
3. Drizzle manages database schema and migrations
4. Firebase provides authentication and user data storage

## External Dependencies

### Core Dependencies
- **Frontend**: React, Vite, Wouter, TanStack Query, React Hook Form
- **UI/Styling**: Tailwind CSS, Radix UI, Shadcn/ui, Lucide icons
- **Backend**: Express, Drizzle ORM, connect-pg-simple
- **Database**: PostgreSQL (via DATABASE_URL), Neon serverless driver
- **Authentication**: Firebase Auth and Firestore
- **Validation**: Zod for schema validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Development Dependencies
- TypeScript compilation and type checking
- ESBuild for production bundling
- PostCSS with Autoprefixer
- Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **Firebase Config**: API keys and project settings via environment variables
- **Development**: NODE_ENV=development enables dev middleware and HMR
- **Production**: NODE_ENV=production serves static assets and optimized builds

### Runtime Architecture
- Single Node.js process serving both API and static frontend
- PostgreSQL database for persistent storage and sessions
- Firebase services for authentication and user profiles
- Replit-specific optimizations for cloud deployment

### Scalability Considerations
- Stateless server design with database-backed sessions
- Modular storage interface allows easy database provider switching
- Separate build artifacts enable independent scaling of frontend/backend
- Environment-based configuration supports multiple deployment environments