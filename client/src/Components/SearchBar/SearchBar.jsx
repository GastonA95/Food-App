import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../Redux/Action";

import styles from "./SearchBar.module.css";

export default function SearchBar({ returnToFirstPage }) {
  const [recipe, setRecipe] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setRecipe(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRecipe("");
    dispatch(searchRecipe(recipe));
    returnToFirstPage();
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
    </div>
  );
}
