import { useState } from "react";
import "./PopUpPlaylist.css";
import { PencilIcon } from "../../icons/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { TrackCard } from "./TrackCard";
import { axiosMusic } from "../../utils/configAxios";
import { clearTracks } from "../../store/slices/playlistCart.slice";

export const PopUpPlaylist = ({ isShowPlaylist }) => {
  const [isShowFront, setIsShowFront] = useState(false);
  //canciones agregadas al la grabadora
  const tracks = useSelector((store) => store.playlistCart.tracks);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      to: e.target.to.value,
      message: e.target.message.value,
      tracks,
    };

    axiosMusic
      .post("/api/playlists", data)
      .then(({ data }) => {
        e.target.reset();
        dispatch(clearTracks());
        e.target.btnCreate.value = "PLAYLIS CREADA!";
        console.log(e.target.btnCreate.value)
        setTimeout(() => {
          e.target.btnCreate.value = "CREAR";
        }, 2000);
        console.log(e.target.btnCreate.value)
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`fixed top-24 bg-[#121212] uppercase grid p-4 rounded-md justify-start font-semibold border border-slate-300 gap-1 ${
        isShowPlaylist ? "right-10" : "-right-full"
      } transition-all`}
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
              required
              size={10}
            />
            <label htmlFor="title">
              <PencilIcon />
            </label>
          </div>
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
              required
              size={10}
            />
            <label htmlFor="title">
              <PencilIcon />
            </label>
          </div>
          <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[50px] left-[20px]  text-sm">
            <textarea
              name="message"
              rows={4}
              className="resize-none outline-none text-black"
              placeholder="Mensaje"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="border-2 border-slate-300 text-slate-300 uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-white hover:border-white transition-colors text-sm"
        onClick={() => setIsShowFront(!isShowFront)}
      >
        {isShowFront ? "Lado B" : "Lado A"}
      </button>

      <section className="normal-case font-normal w-[238px] max-h-[170px] overflow-y-auto">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} imageSize="sm" minusBtn />
        ))}
      </section>
      <input name="btnCreate" value="CREAR" type="submit" className="border-2 border-slate-300 bg-transparent cursor-pointer text-center uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-white hover:border-white transition-colors"
      />
    </form>
  );
};
