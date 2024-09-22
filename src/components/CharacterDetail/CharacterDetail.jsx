import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "../Loader";
import toast from "react-hot-toast";
import style from "./CharacterDetail.module.css";

function CharacterDetail({ selectedId, onAddFavourite, isAddFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
    //دلیل این که یک کپی گرفتیم از اپیزودز ها اینه که
    //ما نمیخواهیم که اپیزود های ما تغییر کنه و ما
    //ما میخواهیم فقط تغییرات جدید رو بریزیم توی سورتد اپیزود
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodesId = data.episode.map((e) => {
          return e.split("/").at(-1);
        });

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setCharacter(data);
        console.log(episodeData);
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);
  if (isLoading)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        <Loader />
      </div>
    );
  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please select a chracter
      </div>
    );
  console.log(episodes);
  return (
    <div style={{ flex: 1 }}>
      <div className={style["character-detail"]}>
        <img
          src={character.image}
          alt={character.name}
          className={style["character-detail__img"]}
        />
        <div className={style["character-detail__info"]}>
          <h3 className={style.name}>
            <span>{character.gender === "Male" ? "👨" : "👩"}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className={style.info}>
            <span
              className={`status ${
                character.status === "Dead" ? style.red : ""
              }`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span> - &nbsp;{character.species}</span>
          </div>
          <div className={style.location}>
            <p>Last known Location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className={style.actions}>
            {isAddFavourite ? (
              <p style={{ color: "#ffff" }}>Already Added To Favourites ♥</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onAddFavourite(character)}
              >
                Add to favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={style["character-episodes"]}>
        <div className={style.title}>
          <h3>List of Episodes:</h3>
          <button onClick={() => setSortBy((prev) => !prev)}>
            <ArrowUpCircleIcon
              className={style.icon}
              style={{ rotate: sortBy ? "0deg" : "180deg" }}
            />
          </button>
        </div>
        <ul>
          {sortedEpisodes.map((item, index) => {
            return (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, 0)} - {item.episode} :{" "}
                  <strong>{item.name}</strong>
                </div>
                <div className="badge badge--secondary">{item.air_date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
