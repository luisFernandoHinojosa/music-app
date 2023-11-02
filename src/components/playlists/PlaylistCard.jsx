import { Link } from "react-router-dom";
import { PencilIcon } from "../../icons/Svgs";

export const PlaylistCard = ({ playlist, index }) => {
  const top = `${index * 47}px`;
  return (
    <li
      className="text-black absolute font-bold hover:rotate-6 hover:-translate-y-2 transition-transform pt-3"
      style={{ top: top }}
    >
      <Link to={`/playlists/${playlist.id}`}>
        <div>
          <img src="/images/cassette.png" alt="" />
        </div>
        <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[28px] left-[20px]  text-sm">
          <h4 className="flex-1">{playlist.title}</h4>
          <PencilIcon />
        </div>
      </Link>
    </li>
  );
};
