import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const useGlobalContext = () => {
  return useContext(AppContext);
};

const getFavouritesFromLocalStorage = () => {
  let favourites = localStorage.getItem('favorites');
  if (favourites) {
    favourites = JSON.parse(localStorage.getItem('favorites'));
  } else {
    favourites = [];
  }
  return favourites;
}

export const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favourites, setFavourite] = useState(getFavouritesFromLocalStorage());

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const fetchMeals = async(url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch(error) {
      // console.log(error.response);
    }
    setLoading(false);
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if (favouriteMeal) {
      meal = favourites.find(meal => meal.idMeal === idMeal);
    } else {
      meal = meals.find(meal => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavourite = (idMeal) => {
    const alreadyFavourite = favourites.find(meal => meal.idMeal === idMeal);
    if (alreadyFavourite) return;

    const meal = meals.find(meal => meal.idMeal === idMeal);
    const updatedFavourites = [...favourites, meal];
    setFavourite(updatedFavourites);
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
  };

  const removeFromFavourite = (idMeal) => {
    const updatedFavourites = favourites.filter(meal => meal.idMeal !== idMeal);
    setFavourite(updatedFavourites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, [])

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={
      { 
        meals, 
        loading, 
        setSearchTerm, 
        fetchRandomMeal, 
        showModal, 
        selectedMeal, 
        selectMeal,
        closeModal,
        favourites,
        addToFavourite,
        removeFromFavourite
      }
    }>
      { children }
    </AppContext.Provider>
  );
};
