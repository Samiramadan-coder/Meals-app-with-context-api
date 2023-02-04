import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }

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
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal }}>
      { children }
    </AppContext.Provider>
  );
};