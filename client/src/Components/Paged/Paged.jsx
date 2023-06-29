import React from "react";
import styles from "./Paged.module.css";

export default function Paged({ recipePerPage, recipes, paged, currentPage }) {
  const pageNumber = [];

  for (let i = 0; i <= Math.floor(recipes / recipePerPage); i++) {
    pageNumber.push(i + 1);
  }

  if (pageNumber.length > 1) {
    return (
      <div className={styles.container}>
        <div className={styles.pagination}>
          <ul>
            {pageNumber &&
              pageNumber.map((num) => (
                <li
                  key={"paged" + num}
                  className={currentPage === num ? styles.active : null}
                >
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    onClick={() => {
                      paged(num);
                    }}
                  >
                    {num}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
