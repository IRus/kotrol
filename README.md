# Kotrol

A personal project dashboard built with Preact and esbuild. Reads project data from a JSON file and renders a card-based UI with click-frequency tracking via localStorage.

## Features

- Preact SPA with esbuild bundling
- JSON-based project configuration (no rebuild needed to update projects)
- Frequently Used section powered by localStorage
- Docker containerization with nginx
- Multi-platform Docker images (amd64/arm64)
- CI/CD with GitHub Actions

## Prerequisites

- Node.js 24

## Build and Run

### Local Development

```bash
npm install

# Dev server with watch mode on :8080
npm run dev

# Production build → build/site/
npm run build
```

### Docker

```bash
npm run build
docker build -t kotrol .
docker run -p 8080:80 kotrol
```

Visit `http://localhost:8080` to view the site.

## Project Structure

- `src/app.jsx` - Application entry point
- `src/components/` - Preact components (Card, Group, FrequentSection)
- `src/hooks/useFrequent.js` - localStorage tracking logic
- `src/style.css` - Styles
- `public/projects.json` - Project configuration
- `public/logos/` - Project logo assets
- `default.conf` - nginx configuration
- `Dockerfile` - Container image definition

## Configuration

Edit `public/projects.json` to add or modify projects:

```json
{
  "groups": [
    {
      "name": "Group Name",
      "projects": [
        {
          "title": "Project Name",
          "links": [{ "label": "Online", "url": "https://example.com" }],
          "logo": "logo.svg"
        }
      ]
    }
  ]
}
```

Add corresponding logo files to `public/logos/`.

## CI/CD

The project uses GitHub Actions for automated builds and Docker image publishing to GitHub Container Registry (`ghcr.io/irus/kotrol:main`).

## License

See [LICENSE](LICENSE) file for details.
