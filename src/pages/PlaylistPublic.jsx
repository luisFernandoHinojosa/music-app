import { useEffect, useState } from "react"
import { PublicLayout } from "../components/layaouts/PublicLayout"
import { AddIcon, ShareIcon, SpinIcon } from "../icons/Svgs"
import { Link, useParams } from "react-router-dom"
import { axiosMusic } from "../utils/configAxios"
import { TrackCard } from "../components/shared/TrackCard"
import { SpotifySong } from "../components/shared/SpotifySong"

export const PlaylistPublic = () => {
  const [isShowFront, setIsShowFront] = useState(false)
  const [playlist, setPlaylist] = useState(null)
  const [currentSong, setCurrentSong] = useState(null)
  const { id } = useParams();

  const playTrack = (idTrack) => {
    setCurrentSong(idTrack);
  }

  const handleCopyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard
    .writeText(currentURL)
    .then(() => alert("copiado en el portapapeles"))
  }

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => 
        setPlaylist(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <PublicLayout>
      <article
        className="top-24 grid rounded-md justify-center font-semibold gap-1 transition-all"
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          {/* frontal */}
          <div className="front">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[15px] left-[20px]  text-sm">
              <h3 className="bg-transparent text-black">{playlist?.title}</h3>
            </div>
            <button
              onClick={handleCopyURL}
              type="submit"
              className="absolute bottom-4 right-[50px] border-2  p-[3px]"
            >
              <AddIcon />
            </button>
           
            <Link
              type="button"
              className="absolute bottom-4 right-3 border-2 rounded-full p-[3px]"
            >
              <ShareIcon />
            </Link>
          </div>

          {/* parte trasera */}
          <div className="absolute back top-0">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute bg-white flex p-1 rounded-md items-center w-[198px] top-[15px] left-[20px]  text-sm gap-1">
              <span className="bg-transparent flex-1 outline-none text-black">
                  {playlist?.to}
              </span>
            </div> 
             <div className="bg-white p-1 rounded-md w-[198px] absolute top-[50px] left-[20px] gap-1 text-sm text-black h-[100px] overflow-y-auto">
                <p>{playlist?.message}</p>
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
      </article>

      {currentSong && <SpotifySong idTrack={currentSong} />}

      <section className="mt-6">
        {playlist?.tracks.map((track) => (
          <TrackCard key={track.id} track={track} playTrack={playTrack} />
        ))}
      </section>
    </PublicLayout>
  )
}