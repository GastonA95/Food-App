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
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual (inicia en la 1)
  const [recipePerPage, setRecipePerPage] = useState(9); //Cantidad de recetas por pagina
  const indexOfLastRecipe = currentPage * recipePerPage; //'Indice' de la ultima receta
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage; //'Indice' de la primer receta
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //Corta las recetas a mostrar por pagina

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
    </div>
  );
}
