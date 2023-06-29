import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./NavBar.module.css";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import { getRecipes } from "../../Redux/Action";

export default function NavBar({
  returnToFirstPage,
  setCurrentPage,
  setOrder,
}) {
  const dispatch = useDispatch();

  const todasRecetas = () => {
    dispatch(getRecipes());
    returnToFirstPage();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home" onClick={todasRecetas}>
          Food-App
        </Link>
      </div>
      <div className={styles.search}>
        <SearchBar returnToFirstPage={returnToFirstPage} />
      </div>
      <div className={styles.create}>
        <Link to="/home" onClick={todasRecetas}>
          <button className={styles.createbtn}>Home</button>{" "}
        </Link>
        <Link to="/create">
          <button className={styles.createbtn}>Create Recipe</button>{" "}
        </Link>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Filter 𝄙</button>

          <div className={styles.dropdownContent}>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a href="#">
              <Filter setCurrentPage={setCurrentPage} setOrder={setOrder} />
            </a>
          </div>
        </div>{" "}
      </div>
    </nav>
  );
}
