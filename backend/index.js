import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});


app.post("/playlist", async (req, res) => {
  try {
    const { mood } = req.body;
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=playlist&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log("Spotify raw response:", data); // debug

    // ✅ FIX: filter out nulls and only send valid playlists
    if (data.playlists && data.playlists.items) {
      const cleaned = data.playlists.items.filter((p) => p !== null);
      res.json(cleaned);
    } else {
      res.status(404).json({ error: "No playlists found", raw: data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching playlist");
  }
});


app.listen(5000, () => console.log("Backend running on port 5000"));
