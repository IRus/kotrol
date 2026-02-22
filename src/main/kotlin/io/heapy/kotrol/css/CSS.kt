package io.heapy.kotrol.css

internal val CSS by lazy {
    """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #0f0f0f;
    color: #e0e0e0;
    min-height: 100vh;
}
.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
}
h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ffffff;
}
.group {
    margin-bottom: 2.5rem;
}
.group h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #aaaaaa;
    margin-bottom: 1rem;
}
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.25rem;
}
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 12px;
    text-decoration: none;
    color: #e0e0e0;
    transition: border-color 0.2s, transform 0.2s;
}
.card:hover {
    border-color: #555;
    transform: translateY(-2px);
}
.logo {
    width: 64px;
    height: 64px;
    object-fit: contain;
}
.title {
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
}
.links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}
.link-btn {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    background: #2a2a2a;
    border: 1px solid #3a3a3a;
    border-radius: 6px;
    color: #cccccc;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
}
.link-btn:hover {
    background: #3a3a3a;
    border-color: #555;
    color: #ffffff;
}
""".trimIndent()
}
