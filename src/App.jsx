import "./App.css";
import Search from "./components/Search";
// import Favourites from "./components/Favourite";
import Meals from "./components/Meals";
// import Modal from "./components/Modal";

export default function App() {
  return (
    <main>
      <Search />
      {/* <Favourites /> */}
      <Meals />
      {/* <Modal /> */}
    </main>
  );
}
