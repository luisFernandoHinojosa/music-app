import { useEffect, useState } from "react";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import { SearchIcon } from "../icons/Svgs";
import { axiosMusic } from "../utils/configAxios";
import { PlaylistList } from "../components/playlists/PlaylistList";

export const Playlists = () => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   axiosMusic
  //     .get(
  //       `/api/tracks?limit=${formData.get("limit")}&q=${formData.get("query")}`
  //     )
  //     .then(({ data }) => setSearchTracks(data.tracks.items))
  //     .catch((err) => console.log(err));
  // };

  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => setPlaylists(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <PrincipalLayaout>
      <form className="bg-white/20 p-4 px-4 flex gap-4 rounded-md items-center">
        <button>
          <SearchIcon />
        </button>
        <input
          type="text"
          className="bg-transparent outline-none flex-1"
          placeholder="Buscar"
          name="query"
          required
          autoComplete="off"
          size={8}
        />
      </form>
      <PlaylistList playlists={playlists}/>
    </PrincipalLayaout>
  );
};
