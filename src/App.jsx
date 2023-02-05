import "./App.css";
import { useGlobalContext } from "./context";
import Search from "./components/Search";
import Favourites from "./components/Favourite";
import Meals from "./components/Meals";
import Modal from "./components/Modal";

export default function App() {
  const {favourites, showModal} = useGlobalContext();

  return (
    <main>
      <Search />
      {favourites.length ? <Favourites /> : null}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}
