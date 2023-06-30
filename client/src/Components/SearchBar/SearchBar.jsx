import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe, SEARCH_RECIPE_ERROR } from "../../Redux/Action";

import styles from "./SearchBar.module.css";

export default function SearchBar({ returnToFirstPage }) {
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setRecipe(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRecipe("");
    dispatch(searchRecipe(recipe)).then((action) => {
      if (action.type === SEARCH_RECIPE_ERROR) {
        setError(action.payload);
      } else {
        setError("");
        returnToFirstPage();
      }
    });
  }

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        type="search"
        value={recipe}
        placeholder="Search by name.."
        onChange={(e) => handleChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={styles.button}
      >
        <span className={styles.button_top}>Search</span>
      </button>
      {error && <div className={styles.error}>No se encontro la receta</div>}
    </div>
  );
}
