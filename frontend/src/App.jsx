import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, Brain, Activity } from "lucide-react"; // icons

// --- Home (Landing Page) ---
function Home() {
  const features = [
    {
      title: "Mood-Based Playlist Generator",
      description: "Describe a vibe and get a Spotify playlist that matches.",
      path: "/playlist",
      icon: <Music className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Analyze Song using AI",
      description: "Upload a track to see BPM, structure, and energy curve.",
      path: "/analyzer",
      icon: <Brain className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Dance Routine Recommender",
      description: "Describe a song + dance style to get suggested moves.",
      path: "/dance",
      icon: <Activity className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex flex-col">
      {/* Hero section */}
      <div className="text-center py-16 px-6">
        <motion.img
          src="/groovelab-logo.png"
          alt="GrooveLab"
          className="mx-auto w-24 h-24 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          GrooveLab
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover playlists, analyze songs, and get AI-powered dance routines — 
          all in one creative lab for music and movement.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-16">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg bg-white"
          >
            <Card className="rounded-2xl border-none">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-4">{f.icon}</div>
                  <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                  <p className="text-gray-600 mb-6">{f.description}</p>
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

// --- Playlist Generator (unchanged except styling can be improved later) ---
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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">🎶 Mood-Based Playlist Generator</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Enter a vibe (e.g. sunset drive, chill focus)"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Search
        </button>
      </form>
      {loading && <p>Loading playlists...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playlists.map((p) => (
          <div key={p.id} className="rounded-xl shadow bg-white overflow-hidden">
            <div className="relative group h-56">
              {p.images?.[0]?.url && (
                <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
              )}
              <a
                href={p.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition"
              >
                <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                  ▶ Play
                </span>
              </a>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">By {p.owner?.display_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Placeholder Pages ---
function SongAnalyzer() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">AI Song Analyzer</h2>
      <p className="text-gray-600">(Feature coming soon...)</p>
    </div>
  );
}

function DanceVisualizer() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Dance Routine Visualizer</h2>
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
