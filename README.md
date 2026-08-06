# FitZone Gym - MERN Stack Skeleton

Welcome to the FitZone Gym codebase. This is a MERN stack application starter.

## Project Structure

- `client/` - React frontend built using Vite
- `server/` - Node.js + Express backend

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v16.0.0 or higher is recommended).

### Installation

To install all dependencies for the root, server, and client, run the helper script in the root directory:

```bash
npm run install-all
```

Alternatively, you can install them manually:

1. **Root Dependencies:**
   ```bash
   npm install
   ```
2. **Server Dependencies:**
   ```bash
   cd server && npm install && cd ..
   ```
3. **Client Dependencies:**
   ```bash
   cd client && npm install && cd ..
   ```

### Running the Application

To run both the server and client concurrently in development mode, run the following command in the root directory:

```bash
npm run dev
```

- The React client will be available at: [http://localhost:5173](http://localhost:5173)
- The Express server will be listening at: [http://localhost:5000](http://localhost:5000)
- You can test the server health check at: [http://localhost:5000/api/health](http://localhost:5000/api/health)
