import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
export default function SingleCocktail() {
  // ckt is passed as path='/cocktail/ckt' i mean ckt is onthing but cocktail page

  const { ckt } = useParams();
  const [loading, setLoading] = useState(false);

  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    //keep setLoading true initiall
    setLoading(true);
    // get the html data from the given link with fetch like below
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ckt}`
        );
        const data = await response.json();
        if (data.drinks) {
          // console.log(data.drinks);
          // destruct the data.drinks from console.log
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strInstructions: instructions,
            strGlass: glass,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          } = data.drinks[0];
          // because of somany ingedients assain it to new variable
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          ];
          // now destruct all the assaigned values to single variable newCockt
          const newCockt = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients
          };
          // now give destructed cocktail value to the state chage cocktail setCocktail(newCockt)
          setCocktail(newCockt);
          // console.log(newCockt);
        } else {
          // if there are no values give it to null
          setCocktail(null);
        }
        //if there is no data log the error in console
      } catch (error) {
        console.log(error);
      }
      //to end the loading give false in setLoading
      setLoading(false);
    }
    //invoke the function
    getCocktail();
  }, [ckt]);

  // loading condition
  // we have to write this condition because of the async function
  // condition checks then sends it to the ui
  if (loading) {
    return <h2 className='section-title'>Loading...</h2>;
  }
  if (!cocktail) {
    return <h2 className='section-title'>Sorry! No Cocktile Found </h2>;
  } else {
    const {
      name,
      image,
      info,
      category,
      glass,
      instructions,
      ingredients
    } = cocktail;
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          Back Home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />

          <div className='drink-info'>
            <p>name:{name}</p>
            <p>Info:{info}</p>
            <p>category:{category}</p>
            <p>Glass:{glass}</p>
            <p>Instructions:{instructions}</p>
            <p>
              Ingredients:
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
