import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, Brain, Activity } from "lucide-react";

// --- Home (Landing Page) ---
function Home() {
  const features = [
    {
      title: "Mood-Based Playlist Generator",
      description: "Describe a vibe and get a Spotify playlist that matches.",
      path: "/playlist",
      icon: <Music className="w-10 h-10 text-pink-500" />,
    },
    {
      title: "Analyze Song using AI",
      description: "Upload a track to see BPM, structure, and energy curve.",
      path: "/analyzer",
      icon: <Brain className="w-10 h-10 text-purple-500" />,
    },
    {
      title: "Dance Routine Recommender",
      description: "Describe a song + dance style to get suggested moves.",
      path: "/dance",
      icon: <Activity className="w-10 h-10 text-indigo-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col">
      {/* Hero section */}
      <motion.div
        className="text-center py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/groovelab-logo.png"
          alt="GrooveLab"
          className="mx-auto w-28 h-28 mb-8 drop-shadow-lg"
          whileHover={{ scale: 1.1 }}
        />
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          GrooveLab
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Discover playlists, analyze songs, and get AI-powered dance routines —
          all in one creative lab for music and movement.
        </p>
      </motion.div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-20">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 hover:border-indigo-500 transition"
          >
            <Card className="rounded-2xl bg-transparent border-none h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{f.icon}</div>
                  <h2 className="text-2xl font-semibold mb-3">{f.title}</h2>
                  <p className="text-gray-400 mb-6">{f.description}</p>
                </div>
                <Link to={f.path}>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Try it
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Playlist Generator (styled cards) ---
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
      const response = await fetch(`${API_BASE}/playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });
      if (!response.ok) throw new Error("Failed to fetch playlists");
      const data = await response.json();
      setPlaylists(Array.isArray(data) ? data.filter((p) => p) : []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching playlists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-8">
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
      {loading && <p>Loading playlists...</p>}
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
                href={p.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition"
              >
                <span className="bg-green-500 text-white px-5 py-2 rounded-full shadow-lg">
                  ▶ Play on Spotify
                </span>
              </a>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-gray-600">By {p.owner?.display_name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Placeholder Pages ---
function SongAnalyzer() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-4 text-purple-600">
        AI Song Analyzer
      </h2>
      <p className="text-gray-600">(Feature coming soon...)</p>
    </div>
  );
}

function DanceVisualizer() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-4 text-pink-600">
        Dance Routine Visualizer
      </h2>
      <p className="text-gray-600">(Feature coming soon...)</p>
    </div>
  );
}

// --- App Router ---
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
