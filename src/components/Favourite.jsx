import { useGlobalContext } from "../context";

const Favourites = () => {
  const {favourites, removeFromFavourite, selectMeal} = useGlobalContext();

  return (
    <section className="favourites">
      <div className="favourites-content">
        <div className="favourites-container">
          {
            favourites.map(item => {
              const {idMeal, strMealThumb: image} = item;
              return (
                <div key={idMeal} className="favourite-item">
                  <img src={image} alt="" className="favorites-img img" onClick={() => selectMeal(idMeal, true)} />
                  <button className="remove-btn" onClick={() => removeFromFavourite(idMeal)}>
                    remove
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Favourites;