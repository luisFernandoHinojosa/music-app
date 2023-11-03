import { useEffect, useRef, useState } from "react";
import { axiosMusic } from "../utils/configAxios";
import { TrackList } from "../components/shared/TrackList";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import { SearchIcon } from "../icons/Svgs";

export const Home = () => {
  const [tracksRecomendations, setTracksRecomendations] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchNameTrack, setSearchNameTrack] = useState("");
  const [trackSuggestions, setTrackSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const input = useRef(null);

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
    const inputValue = e.target.value.trim();
  setSearchNameTrack(inputValue);
  if (inputValue === "") {
    setTrackSuggestions([]);
    setSearchNameTrack("");
  }

  console.log("input", inputValue)
  };

  const handleSuggestionClick = (suggestion) => {
    setTrackSuggestions([]);
        setSearchNameTrack("");
    axiosMusic
      .get(`/api/tracks?limit=10&q=${suggestion.name}`)
      .then(({ data }) => {
        setSearchTracks(data.tracks.items);
      })
      .catch((err) => console.log(err));
  };

  const handleKeySuggestions = (e) => {
    if (e.key === "ArrowDown" && suggestionIndex < trackSuggestions.length - 1) {
      setSuggestionIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "ArrowUp" && suggestionIndex > 0) {
      setSuggestionIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "Enter" && suggestionIndex !== -1) {
      e.preventDefault();
      //setInputValue(suggestions[suggestionIndex].name);
      //setPokemonName(suggestions[suggestionIndex]);
      setTrackSuggestions([]);
        setSearchNameTrack("");
      setSuggestionIndex(-1)
      handleSuggestionClick(trackSuggestions[suggestionIndex])
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [suggestionIndex]);

  return (
    <PrincipalLayaout>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeySuggestions}
        className="bg-white/20 relative p-4 px-4 flex gap-4 rounded-t-md items-center"
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
          ref={input}
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
          <ul className="absolute  bg-[#2c2c2d] text-center top-full left-0 right-0 max-h-36 overflow-y-auto scrollbar-thumb-green-800 scrollbar-track-green-400 scrollbar-w-2 scrollbar-thumb-rounded-md rounded-b-md text-white z-10">
            {trackSuggestions.map((trackSuggestion,index) => (
              <li
                onClick={() => handleSuggestionClick(trackSuggestion)}
                className={`hover:bg-black cursor-pointer ${suggestionIndex===index&&("bg-black")}`}
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
