# Employee Management System

A full-stack CRUD application built with **Spring Boot** (Java, REST API, Spring Data JPA) and **React** (Vite), backed by an in-memory H2 database for zero-setup local development.

## Architecture

```
React (Vite, port 5173)  --HTTP/JSON-->  Spring Boot REST API (port 8080)  -->  H2 in-memory DB
     Axios calls /api/employees              Controller -> Service -> Repository
```

- **Controller layer** (`EmployeeController`) — handles HTTP requests/responses, delegates to the service layer.
- **Service layer** (`EmployeeService`) — business logic, sits between controller and data access.
- **Repository layer** (`EmployeeRepository extends JpaRepository`) — Spring Data JPA auto-generates CRUD SQL.
- **Entity** (`Employee`) — JPA-mapped POJO, maps to the `employees` table.
- **Global exception handling** (`GlobalExceptionHandler` + `@RestControllerAdvice`) — consistent JSON error responses for not-found and validation errors.
- **DataSeeder** — seeds 4 sample employees on startup via `CommandLineRunner`.

## Prerequisites

- Java 17+ and Maven (backend)
- Node.js 18+ (frontend — already verified to build cleanly with `npm install && npm run build`)

## Run the backend

```bash
cd backend
mvn spring-boot:run
```
API will be live at `http://localhost:8080/api/employees`. H2 console (view the DB in a browser) is at `http://localhost:8080/h2-console` — JDBC URL `jdbc:h2:mem:emsdb`, username `sa`, no password.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```
Opens at `http://localhost:5173`. Vite's dev server proxies `/api/*` calls to the backend on port 8080 (see `vite.config.js`), so no CORS issues locally.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | List all employees |
| GET | `/api/employees/{id}` | Get one employee |
| GET | `/api/employees/department/{dept}` | Filter by department |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

## Switching to MySQL

Both `pom.xml` and `application.properties` have commented-out MySQL config ready to uncomment if you want to demo against a real relational DB instead of H2.

## Possible extensions (good "what would you add next" interview answer)

- Pagination/sorting on the list endpoint (`Pageable` from Spring Data)
- Spring Security + JWT auth
- Unit tests with JUnit + Mockito for the service layer, `@WebMvcTest` for the controller
- Dockerize both services with `docker-compose`
- Deploy backend to Render/Railway and frontend to Vercel (matches your existing deployment experience)
