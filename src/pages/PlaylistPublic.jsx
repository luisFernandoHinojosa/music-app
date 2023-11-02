import { useEffect, useState } from "react"
import { PublicLayout } from "../components/layaouts/PublicLayout"
import { AddIcon, SaveIcon, ShareIcon, SpinIcon } from "../icons/Svgs"
import { Link, useParams } from "react-router-dom"
import { axiosMusic } from "../utils/configAxios"

export const PlaylistPublic = () => {
  const [isShowFront, setIsShowFront] = useState(false)
  const [playlist, setPlaylist] = useState(null)
  const { id } = useParams();

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
              <h3 className="bg-transparent text-black">PlayList Title</h3>
            </div>
            <button
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
      </article>
    </PublicLayout>
  )
}