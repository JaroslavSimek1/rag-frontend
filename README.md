# rag-frontend

React + Vite frontend for the RAG system.

## Stack

- **React 18** + **TypeScript**
- **Vite** for development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Nginx** for production serving

## Local Development

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. API is expected at `http://localhost:8000`.

## Docker (Production)

Multi-stage build: Vite builds the static app, Nginx serves it and proxies `/api` to the backend.

```bash
docker build -t rag-frontend .
docker run -p 80:80 rag-frontend
```

## CI/CD

On every push to `main`, GitHub Actions automatically builds and pushes the Docker image to `ghcr.io/your-org/rag-frontend:latest`.
