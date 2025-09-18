🎶 GrooveLab

GrooveLab is a vibe coding experiment where you can generate and explore Spotify playlists based on a mood, analyze songs, and visualize dance routines. It’s built with React + Vite (frontend), an Express.js backend, and styled using Tailwind CSS.

🚀 Features

Mood-Based Playlist Generator

Type in a mood (e.g., "sunset drive", "dark", "chill vibes")

Fetches curated Spotify playlists that match the vibe

Displays cover art, title, owner, track count, and description

Clickable Play button opens playlist directly in Spotify

Richer Playlist Cards

Consistent grid layout

Album artwork with hover zoom effect

Play button fades in on hover

Descriptions truncated neatly with Tailwind’s line-clamp

Upcoming Features

AI Song Analyzer → Upload a track and visualize BPM, structure, and energy curve

Dance Routine Visualizer → Enter a song and style, get suggested dance move sequences

🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS

Backend: Express.js + Node.js

API: Spotify Web API (Client Credentials Flow)

Containerization: Podman (with podman-compose)

Other Tools: PostCSS, Autoprefixer

📦 Installation
1. Clone the Repo
git clone https://github.com/<your-username>/groovelab.git
cd groovelab

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the project root:

SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret


⚠️ The .env file is gitignored and will not be uploaded to GitHub.

4. Run with Podman
podman-compose up --build


Frontend runs at: http://localhost:5173

Backend runs at: http://localhost:5000

🖼️ Screenshots

Playlist Grid with Hover Effects

Play Button Overlay

Example: Mood = "sad" returns playlists like sad songs to cry out to

(Screenshots can be added here later.)

🤝 Contributing

This is an experimental project, but contributions are welcome!

Fork the repo

Create a feature branch

Submit a pull request

📜 License

MIT License.


----------------

High-level layout

The repository is split into two top-level projects: a Node/Express backend in backend/ and a React/Vite frontend in frontend/, making it easy to work on either side independently.

The README in the frontend folder summarizes the product vision (mood-based playlists today, AI song analysis and dance visualization next) and the stack choices: React + Tailwind on the frontend, Express on the backend, and Spotify’s Web API powering data.



Backend overview

The backend is an Express application that loads environment variables with dotenv, enables CORS, and parses JSON bodies so the frontend can post moods safely from another origin.

Spotify credentials are read from SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET, and a helper function performs the Client Credentials OAuth flow to obtain a bearer token before each API call.

A single /api/playlist POST route accepts { mood }, retrieves playlists from Spotify’s Search endpoint, strips null entries, and either returns an array of playlist objects or a 404/500 error as appropriate.

Dependencies are kept minimal—Express, cors, dotenv, and node-fetch—and the npm start script simply launches index.js, keeping the service straightforward to run locally or in production.

The Dockerfile builds on the Node 20 image, installs dependencies, copies the source, exposes port 5000, and runs the start script, which is the same setup used by the Podman compose workflow.




Frontend overview


Vite bootstraps the React app from src/main.jsx, rendering <App /> under React Strict Mode and pulling in Tailwind’s index.css base styles (which include the Tailwind directives).

App.jsx wires up React Router with four routes: the animated home hero, the implemented playlist generator, and placeholder views for future song analysis and dance visualization features.

The home hero showcases the three planned capabilities with Framer Motion animations, Lucide icons, and Tailwind utility classes to create an on-brand marketing section.

PlaylistGenerator holds the current core UX: a controlled mood input, loading/error states, and a fetch call to ${import.meta.env.VITE_API_BASE || "/api"}/playlist, allowing easy switching between local proxies and deployed APIs.

Returned playlists are displayed in a responsive grid with hover animations, a Spotify play overlay, and Tailwind’s line-clamp plugin to truncate long descriptions, giving newcomers a real example of the design system in action.

UI primitives such as Button and Card live under src/components/ui/, providing reusable styling hooks while still allowing Tailwind classes to be layered on via the className prop.

Project tooling includes scripts for vite dev/build/preview and eslint, dependencies for Framer Motion, Lucide, and React Router, plus dev-time Tailwind, PostCSS, and ESLint plugins.

The Vite config registers the React plugin and an alias so imports like @/components/ui/button resolve cleanly; Tailwind is configured to scan index.html and src/**/* with the @tailwindcss/line-clamp plugin, and PostCSS loads Tailwind and Autoprefixer.

ESLint is set up with modern React and hooks presets, ignoring the build output and tightening unused-variable checks, which keeps the codebase lint-clean during development.

There is legacy styling in App.css; the current Tailwind-based views illustrate the transition away from these global styles, so treat App.css as an optional cleanup target.



Tooling & execution


The README walks through local setup: clone, install dependencies, add a .env with Spotify credentials, and then use podman-compose up --build to run both services (frontend on 5173, backend on 5000).

The Podman Compose definition builds the frontend container, wires it to the backend service, forwards the expected ports, and passes the Spotify credentials into the backend container environment.

The frontend’s Dockerfile performs a two-stage build (Node for npm run build, then Nginx to serve the static dist/ output), mirroring the production deployment approach suggested by the compose setup.



Pointers for what to learn next


Implement the future pages. SongAnalyzer and DanceVisualizer are just placeholders right now—fleshing them out will require exploring new APIs or ML integrations and adding corresponding backend endpoints.

Understand the Spotify integration. Study the client credentials flow in the backend and how results are filtered, then consider pagination, richer metadata, or caching strategies as potential improvements.

Refine the design system. Explore how Tailwind, the shared UI components, and Framer Motion cooperate in PlaylistGenerator, and decide whether to expand the component library, migrate remaining global CSS, or introduce theming.

Harden the toolchain. Investigate how to proxy API calls during local Vite development (e.g., via a dev server proxy config) and expand lint/test coverage so future features ship with confidence.

Container & deployment practices. If you plan to deploy, review the Dockerfiles and compose file, then decide whether to switch to Docker Compose or integrate with a CI/CD pipeline that can build and push these images.

------------------------------------------