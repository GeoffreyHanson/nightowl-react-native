# Night Owl

A React Native application to find late-night coffee shops using the Yelp API.

## Architecture

```mermaid
graph TB
    subgraph "Mobile App"
        RN[React Native + TypeScript]
        Expo[Expo]
        RN --> Expo
    end

    subgraph "Backend For Frontend"
        Express[Express Server]
        YelpService[Yelp Service]
        Express --> YelpService
    end

    subgraph "Shared"
        Types[TypeScript Types]
        Utils[Shared Utilities]
    end

    subgraph "External"
        Yelp[Yelp Fusion API]
    end

    %% Connections
    RN --> |HTTP Requests| Express
    Express --> |API Calls| Yelp
    RN --> |Uses| Types
    Express --> |Uses| Types

    %% Development Tools
    subgraph "Development Tools"
        PNPM[pnpm workspaces]
        ESLint[ESLint]
        DPrint[dprint]
        Turbo[TurboRepo]
    end

    %% Deployment
    subgraph "Deployment"
        EAS[Expo Application Services]
        Railway[Railway/Render/Vercel]
    end

    %% Tool Connections
    Expo --> EAS
    Express --> Railway
```

## Project Structure

```
night-owl/
├── apps/
│ ├── mobile/     # React Native + Expo app
│ └── backend/    # Express-based BFF
├── packages/
│ └── shared/     # Shared TypeScript types/utilities
├── pnpm-workspace.yaml
└── turbo.json    # Build/task orchestration
```
