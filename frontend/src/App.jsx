import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Home() {
  const features = [
    {
      title: "Mood-Based Playlist Generator",
      description: "Describe a vibe and get a Spotify playlist that matches.",
      path: "/playlist",
    },
    {
      title: "Analyze song using AI",
      description: "Upload a track to see BPM, structure, and energy curve.",
      path: "/analyzer",
    },
    {
      title: "Dance routine recommender",
      description: "Describe a song + dance style to get suggested moves.",
      path: "/dance",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GrooveLab</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                <p className="text-gray-600 mb-4">{f.description}</p>
              </div>
              <Link to={f.path}>
                <Button className="w-full">Try it</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

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
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const data = await response.json();
      setPlaylists(Array.isArray(data) ? data.filter((p) => p !== null) : []);
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError("Something went wrong while fetching playlists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Mood-Based Playlist Generator</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Enter a vibe (e.g. sunset drive, relaxed but groovy)"
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading playlists...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {playlists.length > 0 && (
        <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
          {playlists.slice(0, 4).map(
            (p) =>
              p && (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow overflow-hidden transition transform hover:scale-105"
                >
                  {/* Cover image with fixed size + Play overlay */}
                  <div className="relative group w-full h-60">
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
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600">
                        ▶ Play
                      </span>
                    </a>
                  </div>

                  {/* Playlist info */}
                  <div className="p-4 flex flex-col">
                    <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      By {p.owner?.display_name || "Unknown"}
                    </p>
                    {p.tracks?.total && (
                      <p className="text-xs text-gray-500 mb-2">
                        {p.tracks.total} tracks
                      </p>
                    )}
                    {p.description && (
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {p.description}
                      </p>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}












function SongAnalyzer() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">AI Song Analyzer</h2>
      <p className="text-gray-600">(Feature coming soon...)</p>
    </div>
  );
}

function DanceVisualizer() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dance Routine Visualizer</h2>
      <p className="text-gray-600">(Feature coming soon...)</p>
    </div>
  );
}

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
