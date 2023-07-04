import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Paged from "../Paged/Paged";
import { useDispatch, useSelector } from "react-redux";
import { getDiet, getRecipes } from "../../Redux/Action";

import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.recipes);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage, setRecipePerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch]);

  function returnToFirstPage() {
    setCurrentPage(1);
  }

  return (
    <div className={style.container}>
      <NavBar
        returnToFirstPage={returnToFirstPage}
        setCurrentPage={setCurrentPage}
        setOrder={setOrder}
        order={order}
        className={style.nav}
      />
      {recipes.length === 0 ? (
        <div className={style.loading}>
          <p>Cargando..</p>
        </div>
      ) : (
        <>
          <div className={style.cards}>
            <Cards currentRecipes={currentRecipes} className={style.cards} />
          </div>
          <div>
            <Paged
              recipePerPage={recipePerPage}
              setRecipePerPage={setRecipePerPage}
              recipes={recipes.length}
              paged={paged}
              currentPage={currentPage}
              className={style.paged}
            />
          </div>
        </>
      )}
    </div>
  );
}
