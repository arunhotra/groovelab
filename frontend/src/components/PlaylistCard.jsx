import PixelTransition from "./pixel-transition/PixelTransition";

const gradientPalette = [
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-fuchsia-500 via-purple-500 to-indigo-500",
  "from-orange-500 via-pink-500 to-rose-500",
  "from-blue-500 via-sky-500 to-indigo-500",
];

function hashString(input = "") {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function formatFollowers(count) {
  if (typeof count !== "number") return null;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M followers`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K followers`;
  return `${count} followers`;
}

function PlaylistCard({ playlist }) {
  const coverUrl = playlist?.images?.[0]?.url;
  const owner = playlist?.owner?.display_name || "Unknown curator";
  const trackCount = playlist?.tracks?.total;
  const followers = formatFollowers(playlist?.followers?.total);
  const gradientIndex = hashString(playlist?.id) % gradientPalette.length;
  const gradientClasses = gradientPalette[gradientIndex];

  const firstContent = (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="absolute inset-0">
        {coverUrl ? (
          <>
            <img
              src={coverUrl}
              alt={playlist.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses}`} />
        )}
      </div>
      <div className="relative z-10 mt-auto flex flex-col gap-2 p-5">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">Playlist</span>
        <h3 className="text-2xl font-semibold text-white drop-shadow-lg">{playlist.name}</h3>
        <p className="text-sm text-white/70">Crafted by {owner}</p>
      </div>
    </div>
  );

  const secondContent = (
    <div className="flex h-full w-full flex-col justify-between gap-6 bg-slate-950/90 p-6 text-slate-100 backdrop-blur-sm">
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">GrooveLab</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight text-white">{playlist.name}</h3>
        </div>
        {playlist.description ? (
          <p className="text-sm text-slate-300 line-clamp-4">{playlist.description}</p>
        ) : (
          <p className="text-sm text-slate-400">
            Curated energies, BPM streaks, and moods matched to your vibe.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
        <div className="space-y-1">
          {trackCount ? <p>{trackCount} tracks</p> : null}
          {followers ? <p className="text-slate-500">{followers}</p> : null}
        </div>
        <a
          href={playlist?.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-4 py-2 font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Play on Spotify
        </a>
      </div>
    </div>
  );

  return (
    <PixelTransition
      className="group"
      aspectRatio="125%"
      pixelColor="rgba(16, 185, 129, 0.9)"
      gridSize={10}
      animationStepDuration={0.45}
      firstContent={firstContent}
      secondContent={secondContent}
    />
  );
}

export default PlaylistCard;
