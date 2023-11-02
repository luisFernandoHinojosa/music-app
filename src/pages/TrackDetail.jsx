import { Link, useParams } from "react-router-dom";
import { PrincipalLayaout } from "../components/layaouts/PrincipalLayaout";
import { useEffect, useState } from "react";
import { TrackCard } from "../components/shared/TrackCard";
import { axiosMusic } from "../utils/configAxios";

export const TrackDetail = () => {
  const [track, setTrack] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axiosMusic
      .get(`/api/tracks/${id}`)
      .then(({ data }) => setTrack(data))
      .catch((err) => console.log(err));
  }, [id]);

  console.log("track ",track)

  const lastIndexArtist = track?.artists.length - 1;
  return (
    <PrincipalLayaout>
      <Link className="text-secondry" to={-1}>Atras</Link>
      <header className="grid gap-4 mb-4 sm:grid-cols-2 sm:items-center">
        <div>
          <img
            className="block mx-auto rounded-2xl"
            src={track?.album.images[1].url}
            alt=""
          />
        </div>
        <ul className="grid gap-3">
          <li>
            <h3 className="font-semibold">{track?.name}</h3>
          </li>
          <li>
            <ul className="flex gap-2 line-clamp-1">
              {track?.artists.map((artist, index) => (
                <li className="" key={artist.id}>
                  <Link
                    className="hover:text-secondry transition-colors line-clamp-1 text-slate-400"
                    to={`/artists/${artist.id}`}
                  >
                    {artist.name} {lastIndexArtist !== index && ","}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="text-slate-400 line-clamp-1">
            <span className="font-semibold text-white">Album </span>
            {track?.album.name}
          </li>
          <li  className="text-slate-400">
            <span className="font-semibold text-white">Año de salida </span>
            {track?.album.release_date}
          </li>
        </ul>
      </header>

      <section>
        <h4 className="text-base font-semibold uppercase mb-8">Recomendaciones</h4>
        <div>
          {track?.relatedSongs.map((releatedTrack) => (
            <TrackCard key={releatedTrack.id} track={releatedTrack} showAddBtn/>
          ))}
        </div>
      </section>
    </PrincipalLayaout>
  );
};
