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
        {/* Left side - Logo */}
        <motion.img
          src="/groovelab-logo.png"
          alt="GrooveLab"
          className="w-40 h-40 mx-auto md:mx-0 drop-shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Right side - Text + Features */}
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

// --- Placeholder pages ---
function PlaylistGenerator() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">Playlist Generator</h2>
    </div>
  );
}
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
