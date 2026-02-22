---
name: add-link
description: Add a new project link to the Kotrol dashboard. Use when the user wants to add a new project, link, or service to the homepage.
argument-hint: <url> <title> [group]
allowed-tools: Read, Edit, Write
---

# Add a new project link to Kotrol

Add a new project card to the Kotrol static site dashboard.

## Arguments

- `$0` — URL of the project (required)
- `$1` — Display title for the project (required)
- `$2` — Group name: "Websites", "Services", or "Infrastructure" (optional, default: "Services")

## Steps

1. Read `src/main/resources/projects.yaml` to see existing groups and projects.
2. Derive a logo filename from the title by lowercasing and replacing spaces with hyphens (e.g. "Telegram GPT" → `telegram-gpt.svg`).
3. Check that the URL is not already present in `projects.yaml` to avoid duplicates.
4. Append a new entry at the end of the matching group's `projects:` list in `projects.yaml`:
   ```yaml
         - title: "<title>"
           links:
             - label: "Online"
               url: "<url>"
           logo: "<logo-filename>.svg"
   ```
   If no group argument is provided, add to the "Services" group.
5. Create a placeholder SVG logo at `src/main/resources/logos/<logo-filename>.svg`. Pick a distinct color from this palette that is not already used by other logos: `#E91E63`, `#9C27B0`, `#673AB7`, `#3F51B5`, `#2196F3`, `#009688`, `#4CAF50`, `#FF9800`, `#FF5722`, `#795548`, `#607D8B`. Use the first letter of the title as the text. Follow this template:
   ```svg
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
     <circle cx="32" cy="32" r="30" fill="<color>"/>
     <text x="32" y="32" text-anchor="middle" dominant-baseline="central" fill="#fff" font-family="sans-serif" font-size="28" font-weight="bold"><letter></text>
   </svg>
   ```
6. Report what was added and which group it was placed in.
