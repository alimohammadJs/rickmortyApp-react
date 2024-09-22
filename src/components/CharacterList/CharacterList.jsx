import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "../Loader";
import style from "./CharacterList.module.css";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  if (isLoading)
    return (
      <div className={style["characters-list"]}>
        <Loader />
      </div>
    );
  //در اینجا ما با این ایف گفتیم اگه که هنوز دیتا ها لود نشده
  //بود بیاد و اون کامپوننت لودر رو نشون بده و در غیر این صورت
  //که میشه دیتا ها لود شده بیاد و لیست دیتا ها رو نشون بده
  //این در غیر این صورت رو هم چون ما نمیتونیم
  //همزمان دو تا چیز کف کامپوننت ریترن کنیم دیگه
  //بر اساس همین قاعدهز تشخیص میده

  return (
    <div className={style['characters-list']}>
      {characters.map((item) => {
        return (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => onSelectCharacter(item.id)}
            >
              {selectedId == item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className={style[`list__item`]}>
      <img src={item.image} alt={item.name} />

      <h3 className={style.name}>
        <span>{item.gender === "Male" ? "👨" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className={`${style["list-item__info"]} ${style.info}`}>
        <span
          className={`${style.status} ${
            item.status == "Dead" ? style.red : ""
          }`}
        ></span>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </div>

      {children}
    </div>
  );
}
