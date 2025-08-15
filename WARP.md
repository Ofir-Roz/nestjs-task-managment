# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a NestJS-based Task Management API built with TypeScript, TypeORM, and PostgreSQL. The application provides RESTful endpoints for managing tasks and user authentication.

## Essential Commands

### Development
```bash
# Install dependencies
yarn install

# Start development server with hot reload
yarn run start:dev

# Start production build
yarn run start:prod

# Build the application
yarn run build
```

### Testing
```bash
# Run unit tests
yarn run test

# Run tests in watch mode
yarn run test:watch

# Run tests with coverage
yarn run test:cov

# Run end-to-end tests
yarn run test:e2e

# Debug tests
yarn run test:debug
```

### Code Quality
```bash
# Lint and fix code
yarn run lint

# Format code with Prettier
yarn run format
```

## Architecture Overview

### Module Structure
The application follows NestJS modular architecture with two main feature modules:

- **TasksModule** (`src/tasks/`): Core task management functionality
- **AuthModule** (`src/auth/`): User authentication and authorization

### Database Architecture
- **Database**: PostgreSQL (configured for localhost:5432)
- **ORM**: TypeORM with automatic entity loading and synchronization
- **Connection**: Configured in `app.module.ts` with hardcoded credentials (localhost development)

### Key Entities
- **Task Entity**: UUID primary key, title, description, and status (OPEN/IN_PROGRESS/DONE)
- **User Entity**: UUID primary key, unique username, and password

### Repository Pattern
The application uses the Repository pattern with custom repositories:
- `TasksRepository`: Handles task-specific database operations
- `UsersRepository`: Handles user-specific database operations

### Controllers and Services
Each module follows the standard NestJS pattern:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **DTOs**: Data Transfer Objects for validation and type safety

## Development Workflow

### Database Setup
Ensure PostgreSQL is running on localhost:5432 with:
- Database: `task-management`
- Username: `postgres` 
- Password: `postgres`

### Running the Application
1. Start PostgreSQL database
2. Run `yarn run start:dev` for development with hot reload
3. API will be available at `http://localhost:3000`

### API Endpoints
- **Tasks**: `/tasks` (GET, POST, PATCH, DELETE)
- **Authentication**: `/auth/signup` (POST)

### Validation
Global validation is enabled using `class-validator` pipes, ensuring all DTOs are automatically validated.

### TypeScript Configuration
- Target: ES2023
- Modern module resolution with `nodenext`
- Decorators enabled for NestJS
- Source maps for debugging
- Strict null checks enabled

## Testing Configuration

### Unit Tests
- Framework: Jest with ts-jest
- Location: `src/**/*.spec.ts`
- Coverage output: `coverage/` directory

### E2E Tests
- Configuration: `test/jest-e2e.json`
- Location: `test/**/*.e2e-spec.ts`
- Environment: Node.js

## Key Development Patterns

### Error Handling
Services throw NestJS exceptions (e.g., `NotFoundException`) which are automatically converted to appropriate HTTP responses.

### Dependency Injection
Heavy use of NestJS dependency injection for services, repositories, and database connections.

### Data Validation
DTOs with class-validator decorators ensure request data validation at the controller level.

### Database Operations
Repository pattern abstracts database operations, with TypeORM handling SQL generation and entity management.
