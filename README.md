# Task Manager

A modern, full-stack task management application built with Java Spring Boot and Next.js. Organize your work with users, projects, and tasks while managing deadlines and collaboration.

## Description

Task Manager is a comprehensive task management platform designed to help teams and individuals organize their work efficiently. The application supports multiple users managing projects and tasks with deadlines, enabling better organization and productivity. Built with a focus on scalability and security, this app demonstrates modern full-stack development practices.

### Future Features
- Real-time notifications and updates
- Task comments and collaboration features
- Advanced filtering and search capabilities
- Task priorities and categories
- Progress tracking and analytics
- Team workspaces and permissions
- File attachments and integration
- Recurring tasks and reminders

## Features

- **REST API**: Comprehensive backend API for all operations
- **Stateless Authentication**: Secure JWT-based authentication for stateless communication
- **Middleware**: Request validation and security middleware for protection
- **App Router & Dynamic Routes**: Modern Next.js app router with dynamic routing for user profiles and projects
- **Layered Architecture**: Clean separation of concerns with controller, service, and repository layers
- **User Management**: Create and manage user accounts
- **Project Organization**: Group tasks into projects for better organization
- **Task Management**: Create, update, and track tasks with deadlines

## Tech Stack

### Backend
- **Java Spring Boot** - RESTful API framework
- **PostgreSQL** - Relational database
- **Docker** - Containerization

### Frontend
- **Next.js** - React framework with app router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### DevOps
- **Docker & Docker Compose** - Container orchestration

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local Next.js development)
- Java 17+ (for local Spring Boot development)

### Running the Project with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Manager
   ```

2. **Start the backend and database**
   ```bash
   cd spring-backend/taskmanager
   docker-compose up -d
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Spring Boot backend on port 8080

3. **Start the frontend**
   ```bash
   cd nextjs-frontend/taskmanager
   npm install
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Running Locally (Without Docker)

1. **Backend Setup**
   ```bash
   cd spring-backend/taskmanager
   mvn clean install
   mvn spring-boot:run
   ```

2. **Frontend Setup**
   ```bash
   cd nextjs-frontend/taskmanager
   npm install
   npm run dev
   ```

## Project Structure

```
Task-Manager/
├── spring-backend/          # Java Spring Boot backend
│   └── taskmanager/
│       ├── src/main/java/   # Backend source code
│       ├── pom.xml          # Maven configuration
│       └── docker-compose.yml
├── nextjs-frontend/         # Next.js frontend
│   └── taskmanager/
│       ├── app/             # App router pages
│       ├── lib/             # Utilities, API calls, types
│       └── package.json
└── README.md
```

## API Documentation

The backend provides REST endpoints for:
- User authentication and management
- Project CRUD operations
- Task management with deadlines
- User profiles and settings

All endpoints require JWT authentication tokens (except login/register).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open source and available under the MIT License.
