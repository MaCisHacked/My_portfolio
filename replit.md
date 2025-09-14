# Interactive 3D Portfolio

## Overview

This is a modern 3D interactive portfolio built with React, Three.js, and TypeScript. The application features a unique game-like experience where users navigate a virtual environment using a vehicle to explore different portfolio sections. The project combines 3D graphics with traditional web development, creating an immersive showcase of skills and projects.

The portfolio allows users to drive around a 3D environment and interact with floating objects that represent different sections (About, Projects, Skills, Contact). It supports both desktop and mobile interactions, with keyboard controls for desktop and touch controls for mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **3D Rendering**: Three.js via @react-three/fiber for declarative 3D scene management
- **UI Components**: Radix UI primitives with custom styling for accessible interface elements
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **State Management**: Zustand for lightweight, modular state management across audio, controls, game phases, and portfolio sections
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints and static file serving
- **Development**: Hot module replacement via Vite integration for seamless development experience
- **Database**: Drizzle ORM configured for PostgreSQL with migration support
- **Session Management**: In-memory storage with extensible interface for future database integration

### Key Design Patterns
- **Component Composition**: Modular 3D components (Environment, Vehicle, InteractiveObjects) for maintainable scene management
- **Hook-based State**: Custom Zustand stores for audio, controls, game state, and portfolio navigation
- **Responsive Design**: Mobile-first approach with touch controls and adaptive UI elements
- **Performance Optimization**: Asset preloading, efficient rendering loops, and optimized particle systems

### Data Storage Solutions
- **Database Schema**: User authentication system with username/password storage
- **Migration System**: Drizzle Kit for version-controlled database schema changes
- **Development Storage**: In-memory storage for rapid prototyping and testing

### 3D Scene Architecture
- **Scene Management**: Hierarchical component structure with lighting, environment, and interactive elements
- **Physics Simulation**: Custom vehicle movement with collision detection and smooth camera following
- **Particle Systems**: Multiple particle effects (dust, sparkles, floating orbs) for visual enhancement
- **Audio Integration**: Spatial audio system with background music, engine sounds, and interaction feedback

## External Dependencies

### Core Technologies
- **@react-three/fiber**: React renderer for Three.js enabling declarative 3D scene creation
- **@react-three/drei**: Helper components and utilities for common Three.js patterns
- **@react-three/postprocessing**: Post-processing effects for enhanced visual quality
- **three**: Core 3D graphics library for WebGL rendering and scene management

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver for cloud database connectivity
- **drizzle-orm**: Type-safe ORM with migration support and schema validation
- **drizzle-kit**: CLI tools for database migrations and schema management

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid styling
- **class-variance-authority**: Type-safe utility for component variant styling
- **clsx**: Conditional className utility for dynamic styling

### Audio System
- **howler**: Cross-platform audio library for background music and sound effects
- **@types/howler**: TypeScript definitions for audio integration

### Development Tools
- **vite**: Next-generation build tool with HMR and optimized bundling
- **typescript**: Static type checking for enhanced developer experience
- **@vitejs/plugin-react**: Vite plugin for React fast refresh and JSX transformation
- **vite-plugin-glsl**: Shader file import support for custom visual effects

### State Management & Queries
- **zustand**: Lightweight state management with subscription support
- **@tanstack/react-query**: Server state management and caching solution

### Session & Security
- **express-session**: Session middleware for user authentication
- **connect-pg-simple**: PostgreSQL session store for persistent sessions