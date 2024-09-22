import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { Character } from "../CharacterList/CharacterList";
import Modal from "../Modal";
import style from "./Navbar.module.css";

function Navbar({ children }) {
  return (
    <nav className={style.navbar}>
      <Logo />

      {children}
    </nav>
  );
}

export default Navbar;

function Logo() {
  return <div className={style[`navbar__logo`]}>logo😍</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <p className={style[`navbar__result`]}>Found {numOfResult} Result</p>;
}

export function Favourites({ favourites, onDeleteFavourites }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character item={item} key={item.id}>
            <button
              className="icon red"
              onClick={() => onDeleteFavourites(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className={style.heart} onClick={() => setIsOpen(true)}>
        <HeartIcon className={style.icon} />
        <span className={style.badge}>{favourites.length}</span>
      </button>
    </>
  );
}
