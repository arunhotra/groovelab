import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Music, Brain, Activity } from "lucide-react";
import PlaylistCard from "@/components/PlaylistCard";

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
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl w-full">
      
      {/* Left: logo */}
      <motion.img
        src="/groovelab-logo.png"
        alt="GrooveLab"
        className="w-40 h-16 object-contain drop-shadow-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Right: text + features */}
      <motion.div
        className="flex-1 flex flex-col gap-8 text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          GrooveLab
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Discover playlists, analyze songs, and get AI-powered dance routines —
          all in one creative lab for music and movement.
        </p>

        <div className="flex flex-col gap-6">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-16 px-6 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">GrooveLab Labs</p>
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Pixelated Playlist Portal
          </h2>
          <p className="max-w-3xl text-base text-slate-300">
            Describe the vibe you're craving and watch Spotify curations assemble through a retro-futuristic pixel reveal.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur md:flex-row"
        >
          <label className="flex-1">
            <span className="sr-only">Describe a mood</span>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. neon nights, cozy focus, rooftop sunrise"
              className="w-full rounded-2xl border border-slate-700/60 bg-slate-950/70 px-5 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            />
          </label>
          <button
            type="submit"
            className="flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Reveal Playlists
          </button>
        </form>

        {loading ? (
          <p className="text-sm text-emerald-300">
            Translating your vibe into curated pixels...
          </p>
        ) : null}
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        {!loading && !error && playlists.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-800/70 bg-slate-900/40 p-10 text-center text-sm text-slate-400">
            Try prompts like "after-hours jazz bar" or "cyberpunk study session" to receive playlists.
          </div>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {playlists.map((playlist, idx) => (
            <motion.div
              key={playlist.id || idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="w-full"
            >
              <PlaylistCard playlist={playlist} />
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
