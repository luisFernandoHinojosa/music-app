import { useParams } from "react-router-dom"
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout"
import { axiosMusic } from "../utils/configAxios"
import { useEffect, useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"

export const ArtistDetail = () => {

  const {id} = useParams();

  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    axiosMusic
      .get(`/api/artists/${id}`)
      .then(({data}) => setArtistInfo(data))
      .catch((err) => console.log(err));
  }, [])
  
  return (
    <PrincipalLayaout>
      <h3 className="uppercase">Albunes del Artista</h3>

      <section>
          <Swiper className="mySwiper" breakpoints={{
            0:{
              slidesPerView:2,
              spaceBetween:15,
            },
            500:{
              slidesPerView:3,
              spaceBetween:15,
            },
          }}>
            {
              artistInfo?.albums.map((album) =>(
                <SwiperSlide key={album.id}>
                  <article className="text-sm grid gap-[2px]">
                  <header className="rounded-xl overflow-hidden">
                  <img src={album.images[1].url} alt="" />
                </header>
                <h5 className="line-clamp-1 font-semibold">{album.name}</h5>
                <span className="line-clamp-1 text-slate-400">{album.artists[0].name}</span>
                  </article>
              </SwiperSlide>
              ))
            }
          </Swiper>
      </section>
    </PrincipalLayaout>
  )
}