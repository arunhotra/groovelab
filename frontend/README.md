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