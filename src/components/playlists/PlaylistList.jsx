import { PlaylistCard } from "./PlaylistCard";

export const PlaylistList = ({ playlists }) => {

  const CASSETTE_HEIGHT = 180
  const DELTA = 47
  const quantityCassettes = playlists.length;

  const totalHeight = `${CASSETTE_HEIGHT + (DELTA * (quantityCassettes-1))}px`

  return (
    <ul className="relative grid place-items-center" style={{height:totalHeight }}>
      {playlists.map((playlist, index) => (
        <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
      ))} 
    </ul>
  );
};
