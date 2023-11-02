import { useEffect, useRef, useState } from "react";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import {
  PencilIcon,
  SaveIcon,
  ShareIcon,
  SpinIcon,
  TrashIcon,
} from "../icons/Svgs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosMusic } from "../utils/configAxios";
import { TrackCard } from "../components/shared/TrackCard";
export const PlaylistDetail = () => {
  const [isShowFront, setIsShowFront] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      to: e.target.to.value,
      message: e.target.message.value,
    };

    axiosMusic
      .patch(`/api/playlists/${id}`, data)
      .then(() => {
        alert("playlist actualizada");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => {
        setPlaylist(data);
        formRef.current.message.value = data.message;
        formRef.current.title.value = data.title;
        formRef.current.to.value = data.to;
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteTrack = (idTrack) => {
    axiosMusic
      .delete(`/api/playlists/${playlist.id}/tracks/${idTrack}`)
      .then(() => {
        const playlistCopy = structuredClone(playlist);
        playlistCopy.tracks = playlistCopy.tracks.filter(
          (track) => track.id !== idTrack
        );
        setPlaylist(playlistCopy);
      })
      .catch((err) => console.log(err));
  };

  const deletePlaylist = () => {
    axiosMusic
      .delete(`/api/playlists/${playlist.id}`)
      .then(() => {
        alert("playlisteleinfnnj")
        navigate("/playlists")
      })
      .catch((err) => console.log(err));
  };


  return (
    <PrincipalLayaout>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="top-24 uppercase grid rounded-md justify-center font-semibold gap-1 transition-all"
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          {/* frontal */}
          <div className="front">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[15px] left-[20px]  text-sm">
              <input
                name="title"
                type="text"
                className="bg-transparent flex-1 outline-none text-black"
                placeholder="Titulo"
                size={5}
              />
              <label htmlFor="title">
                <PencilIcon />
              </label>
            </div>
            <button
              type="submit"
              className="absolute bottom-4 left-5 border-2 rounded-full p-[3px]"
            >
              <SaveIcon />
            </button>
            <button
            onClick={deletePlaylist}
              type="button"
              className="absolute bottom-4 left-[60px] border-2 rounded-full p-[3px]"
            >
              <TrashIcon />
            </button>
            <Link
            to={`/playlists/public/${playlist?.id}`}
              type="button"
              className="absolute bottom-4 right-3 border-2 rounded-full p-[3px]"
            >
              <ShareIcon />
            </Link>
          </div>
          {/* parte trasera */}
          <div className="absolute back top-0">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[15px] left-[20px]  text-sm">
              <input
                name="to"
                type="text"
                className="bg-transparent flex-1 outline-none text-black"
                placeholder="Destinatario"
                size={10}
              />
              <label htmlFor="title">{/* <PencilIcon /> */}</label>
            </div>
            <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[50px] left-[20px]  text-sm">
              <textarea
                name="message"
                rows={4}
                className="resize-none outline-none text-black"
                placeholder="Mensaje"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="border-2 border-white uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-secondry hover:border-secondry transition-colors text-sm flex items-center gap-3"
          onClick={() => setIsShowFront(!isShowFront)}
        >
          {isShowFront ? "Lado B" : "Lado A"} <SpinIcon />
        </button>
      </form>
      <section>
        {playlist?.tracks.map((track) => (
          <TrackCard key={track.id} track={track} deletebtn={deleteTrack} />
        ))}
      </section>
    </PrincipalLayaout>
  );
};
