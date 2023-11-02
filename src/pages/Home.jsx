import { useEffect, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import { TrackList } from "../components/shared/TrackList";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import { SearchIcon } from "../icons/Svgs";

export const Home = () => {
  const [tracksRecomendations, setTracksRecomendations] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchNameTrack, setSearchNameTrack] = useState("");
  const [trackSuggestions, setTrackSuggestions] = useState([]);

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

  useEffect(() => {
    if (searchNameTrack) {
      axiosMusic
        .get(`/api/tracks?limit=10&q=${searchNameTrack}`)
        .then(({ data }) => setTrackSuggestions(data.tracks.items))
        .catch((err) => console.log(err));
    } else {
      setTrackSuggestions([]);
    }
  }, [searchNameTrack]);

  const handleSearchInputChange = (e) => {
    setSearchNameTrack(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    axiosMusic
      .get(`/api/tracks?limit=10&q=${suggestion.name}`)
      .then(({ data }) => {
        setSearchTracks(data.tracks.items);
        setTrackSuggestions([]);
        setSearchNameTrack("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <PrincipalLayaout>
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 relative p-4 px-4 flex gap-4 rounded-md items-center"
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
          onChange={handleSearchInputChange}
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

        {trackSuggestions.length > 0 && (
          <ul className="absolute  bg-[#a9a9ad] text-center top-full left-0 right-0 max-h-36 overflow-y-auto scrollbar-thumb-green-800 scrollbar-track-green-400 scrollbar-w-2 scrollbar-thumb-rounded-md text-white z-10">
            {trackSuggestions.map((trackSuggestion) => (
              <li
                onClick={() => handleSuggestionClick(trackSuggestion)}
                className="hover:bg-slate-500 cursor-pointer"
                key={trackSuggestion.id}
              >
                {trackSuggestion.name}
              </li>
            ))}
          </ul>
        )}
      </form>
      <TrackList
        tracks={searchTracks.length > 0 ? searchTracks : tracksRecomendations}
      />
    </PrincipalLayaout>
  );
};
