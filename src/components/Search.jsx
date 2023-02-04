import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const [text, setText] = useState('');

  const {setSearchTerm, fetchRandomMeal} = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={text}
          placeholder="type favourite meal" 
          className="form-input" 
          onChange={handleChange} 
        />
        <button 
          type="submit" 
          className="btn"
        >
          Search
        </button>
        <button 
          type="button" 
          onClick={fetchRandomMeal}
          className="btn btn-hipster"
        >
          Surprise me!
        </button>
      </form>
    </header>
  )
}

export default Search;