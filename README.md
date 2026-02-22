# Kotrol

A static site generator built with Kotlin that creates a project showcase page. The application reads project data from a YAML file and generates an HTML page with logos, deployed as a containerized nginx application.

## Features

- Static HTML generation using kotlinx.html
- YAML-based project configuration
- Logo asset management
- Docker containerization with nginx
- Multi-platform Docker images (amd64/arm64)
- CI/CD with GitHub Actions

## Prerequisites

- Java 25
- Gradle 8.x

## Build and Run

### Local Development

```bash
# Run the generator
./gradlew run

# Output will be in build/site/
```

### Docker

```bash
# Build the Docker image
docker build -t kotrol .

# Run the container
docker run -p 8080:80 kotrol
```

Visit `http://localhost:8080` to view the generated site.

## Project Structure

- `src/main/kotlin/io/heapy/kotrol/Main.kt` - Main application entry point
- `src/main/resources/projects.yaml` - Project configuration
- `src/main/resources/logos/` - Project logo assets
- `default.conf` - nginx configuration
- `Dockerfile` - Container image definition

## Configuration

Edit `src/main/resources/projects.yaml` to add or modify projects:

```yaml
projects:
  - title: "Project Name"
    link: "https://example.com"
    logo: "logo.svg"
```

Add corresponding logo files to `src/main/resources/logos/`.

## CI/CD

The project uses GitHub Actions for automated builds and Docker image publishing to GitHub Container Registry (`ghcr.io/irus/kotrol:main`).

## License

See [LICENSE](LICENSE) file for details.
