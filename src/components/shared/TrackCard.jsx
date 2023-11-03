import { Link } from "react-router-dom";
import { AddIcon, MinusIcons, PlayIcon } from "../../icons/Svgs";
import { useDispatch } from "react-redux";
import { addTrack, removeTrack } from "../../store/slices/playlistCart.slice";

export const TrackCard = ({ 
  track, 
  showPlayBtn, 
  showAddBtn, 
  imageSize = "base" ,
  minusBtn, 
  deletebtn,
  playTrack
 }) => {
  const lastIndexArtist = track.artists.length - 1;

  const dispatch = useDispatch();

  const handleAddTrack = () => {
    dispatch(addTrack(track));
  };

  const handleRemoveTrack =()=>{
    dispatch(removeTrack(track.id))
  }

  const imageSizes ={
    base:"w-[58px] h-[58px]",
    sm:"w-[48px] h-[48px]"
  }

  return (
    <article className="flex gap-4 items-center bg-[#171717] hover:bg-white/20  rounded-md p-2 transition-transform duration-500 hover:scale-95">
      <div className={`rounded-md overflow-hidden  ${imageSizes[imageSize]}`}>
        <img  src={track.album.images[2].url} alt="" />
      </div>
      <div className="flex-1 text-sm grid gap-1">
        <Link
          to={`/tracks/${track.id}`}
          className="font-extrabold text-[1rem] line-clamp-1 hover:text-secondry transition-colors"
        >
          {track.name}
        </Link>
        {/* <h5 className="text-slate-400 line-clamp-1">{track.artists[0].name}</h5> */}
        <ul className="flex gap-2 line-clamp-1 text-slate-300">
          {track.artists.map((artist, index) => (
            <li className="" key={artist.id}>
              <Link
                className="hover:text-secondry transition-colors truncate"
                to={`/artists/${artist.id}`}
              >
                {artist.name} {lastIndexArtist !== index && ","}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        {showPlayBtn && (
          <button>
            <PlayIcon />
          </button>
        )}
        {showAddBtn && (
          <button onClick={handleAddTrack}>
            <AddIcon />
          </button>
        )}

        {minusBtn&&<button onClick={handleRemoveTrack}>
          <MinusIcons/>
        </button>}

        {deletebtn && (
        <button onClick={()=>deletebtn(track.id)}>
          <MinusIcons/>
        </button>
        )}

        {playTrack && (
          <button onClick={() => playTrack(track.spotifyId)}>
            <PlayIcon />
          </button>
        )}
      </div>
    </article>
  );
};
