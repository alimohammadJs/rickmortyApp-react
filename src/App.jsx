import React, { useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar, {
  SearchResult,
  Search,
  Favourites,
} from "./components/Navbar/Navbar";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);

  const [favourites, setFavourite] = useLocalStorage("FAVOURITES");
  const handeSelectChracter = (id) => {
    setSelectedId((prevId) => (prevId == id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourite((prevFav) => [...prevFav, char]);
  };
  const isAddFavourite = favourites.map((fav) => fav.id).includes(selectedId);
  const handleDeleteFavourites = (id) => {
    setFavourite((prevFav) => prevFav.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourites={handleDeleteFavourites}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          selectedId={selectedId}
          onSelectCharacter={handeSelectChracter}
        />
        <CharacterDetail
          isAddFavourite={isAddFavourite}
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
  //این مین رو ما همین جوری نوشتیم برای این که صرفا مفهوم
  //کامپوننت کامپوزیشن رو ازش استفاده کرده باشیم برای
  //یادگیری
}
