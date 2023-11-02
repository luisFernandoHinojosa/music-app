import { useEffect, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import { TrackList } from "../components/shared/TrackList";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import { SearchIcon } from "../icons/Svgs";

export const Home = () => {
  const [tracksRecomendations, setTracksRecomendations] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axiosMusic
      .get(
        `/api/tracks?limit=${formData.get("limit")}&q=${formData.get("query")}`
      )
      .then(({ data }) => setSearchTracks(data.tracks.items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=rock,salsa,latino")
      .then(({ data }) => setTracksRecomendations(data.tracks))
      .catch((err) => console.log(err));
  }, []);

  console.log("trackss", tracksRecomendations);

  return (
    <PrincipalLayaout>
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 p-4 px-4 flex gap-4 rounded-md items-center"
      >
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
        <select
          name="limit"
          className="bg-transparent outline-none [&>option]:text-black"
        >
          <option>5</option>
          <option>7</option>
          <option>10</option>
          <option>12</option>
        </select>
      </form>
      <TrackList
        tracks={searchTracks.length > 0 ? searchTracks : tracksRecomendations}
      />
    </PrincipalLayaout>
  );
};
