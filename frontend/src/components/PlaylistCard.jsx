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
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[inherit] bg-slate-950/40">
      <div className="relative flex-1">
        {coverUrl ? (
          <>
            <img
              src={coverUrl}
              alt={playlist.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses}`} />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5 text-slate-100">
        <span className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">Playlist</span>
        <h3 className="text-lg font-semibold leading-tight text-white line-clamp-2">{playlist.name}</h3>
        <p className="text-sm text-slate-300">By {owner}</p>
        {trackCount ? <p className="text-xs text-slate-500">{trackCount} tracks</p> : null}
        {playlist.description ? (
          <p className="text-sm text-slate-400 line-clamp-2">{playlist.description}</p>
        ) : null}
      </div>
    </div>
  );

  const secondContent = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-slate-950/95 p-6 text-center text-slate-100 backdrop-blur-sm">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300/80">Ready to spin</p>
        <h3 className="text-xl font-semibold leading-tight text-white">{playlist.name}</h3>
        {followers ? <p className="text-sm text-slate-400">{followers}</p> : null}
      </div>
      <a
        href={playlist?.external_urls?.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-6 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        Play on Spotify
      </a>
    </div>
  );

  return (
    <PixelTransition
      className="group"
      aspectRatio="140%"
      pixelColor="rgba(16, 185, 129, 0.85)"
      gridSize={9}
      animationStepDuration={0.5}
      firstContent={firstContent}
      secondContent={secondContent}
    />
  );
}

export default PlaylistCard;
