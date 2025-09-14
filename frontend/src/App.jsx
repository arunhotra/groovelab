import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, Brain, Activity } from "lucide-react";

/* ---------- Home (side-by-side hero) ---------- */
function Home() {
  const features = [
    {
      title: "Mood-Based Playlist Generator",
      description: "Describe a vibe and get a Spotify playlist that matches.",
      path: "/playlist",
      icon: <Music className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Analyze Song using AI",
      description: "Upload a track to see BPM, structure, and energy curve.",
      path: "/analyzer",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "Dance Routine Recommender",
      description: "Describe a song + dance style to get suggested moves.",
      path: "/dance",
      icon: <Activity className="w-8 h-8 text-indigo-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Left: logo */}
        <motion.img
          src="/groovelab-logo.png"
          alt="GrooveLab"
          className="w-16 h-16 scale-50 object-contain mx-auto md:mx-0 drop-shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Right: title, copy, features */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            GrooveLab
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            Discover playlists, analyze songs, and get AI-powered dance routines —
            all in one creative lab for music and movement.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-indigo-500 transition p-5"
              >
                <div>{f.icon}</div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{f.title}</h2>
                  <p className="text-gray-400 text-sm">{f.description}</p>
                </div>
                <Link to={f.path}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-sm">
                    Try it
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Playlist Generator (form + results) ---------- */
function PlaylistGenerator() {
  const [mood, setMood] = React.useState("");
  const [playlists, setPlaylists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "/api";
      const res = await fetch(`${API_BASE}/playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        body: JSON.stringify({ mood }),
      });
      if (!res.ok) throw new Error("Failed to fetch playlists");
      const data = await res.json();
      setPlaylists(Array.isArray(data) ? data.filter(Boolean) : []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching playlists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-700">
          🎶 Mood-Based Playlist Generator
        </h2>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Enter a vibe (e.g. sunset drive, chill focus)"
            className="flex-1 border rounded-lg px-4 py-2 shadow-sm"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow">
            Search
          </button>
        </form>

        {loading && <p className="text-gray-600">Loading playlists...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playlists.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl shadow-lg bg-white overflow-hidden"
            >
              <div className="relative group h-60">
                {p.images?.[0]?.url && (
                  <img
                    src={p.images[0].url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <a
                  href={p.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="bg-green-500 text-white px-5 py-2 rounded-full shadow-lg">
                    ▶ Play on Spotify
                  </span>
                </a>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600">
                  By {p.owner?.display_name || "Unknown"}
                </p>
                {p.tracks?.total ? (
                  <p className="text-xs text-gray-500 mt-1">{p.tracks.total} tracks</p>
                ) : null}
                {p.description ? (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{p.description}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Placeholder pages ---------- */
function SongAnalyzer() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">Song Analyzer</h2>
    </div>
  );
}
function DanceVisualizer() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">Dance Visualizer</h2>
    </div>
  );
}

/* ---------- App Router ---------- */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<PlaylistGenerator />} />
        <Route path="/analyzer" element={<SongAnalyzer />} />
        <Route path="/dance" element={<DanceVisualizer />} />
      </Routes>
    </Router>
  );
}
