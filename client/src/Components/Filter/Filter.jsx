import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  orderByName,
  orderByScore,
  filterRecipesByDiet,
} from "../../Redux/Action";

import styles from "./Filter.module.css";

export default function Filter({ setCurrentPage, setOrder }) {
  const diets = useSelector((store) => store.diets);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortNameChecked, setIsSortNameChecked] = useState(false);

  const handleFilterDiet = (e) => {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
    setCurrentPage(1);
  };

  const handleSortName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    setIsSortNameChecked((prevIsSortNameChecked) => !prevIsSortNameChecked);
  };

  const handleSortScore = (e) => {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`${styles.filter} filter`}>
      {isDropdownOpen && (
        <>
          {diets.map((d) => (
            <label key={d} className={`${styles.checkbox}`}>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleFilterDiet(e);
                }}
                value={d}
              />
              {d}
            </label>
          ))}
        </>
      )}
      {!isDropdownOpen && diets.length > 1 && (
        <label className={`${styles.checkbox}`}>
          <input
            type="checkbox"
            onChange={(e) => {
              handleDropdownToggle(e);
            }}
          />
          Select Diets
        </label>
      )}
      <label className={`${styles.checkbox}`}>
        <input
          type="checkbox"
          onChange={(e) => {
            handleSortName(e);
          }}
          value="asc"
          checked={isSortNameChecked} // Usar el estado local
        />
        A-Z
      </label>
      <label className={`${styles.checkbox}`}>
        <input
          type="checkbox"
          onChange={(e) => {
            handleSortName(e);
          }}
        />
        Z-A
      </label>
      <label className={`${styles.checkbox}`}>
        <input
          type="checkbox"
          onChange={(e) => {
            handleSortScore(e);
          }}
          value="asc"
        />
        Score 0 - 100
      </label>
      <label className={`${styles.checkbox}`}>
        <input
          type="checkbox"
          onChange={(e) => {
            handleSortScore(e);
          }}
        />
        Score 100 - 0
      </label>
    </div>
  );
}
