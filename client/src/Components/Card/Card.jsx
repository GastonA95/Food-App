import React from "react";
import styles from "./Card.module.css";
import dietss from "../../Images/diet.png";
import NotFound from "../../Images/imgNotFound.png";
import healthScore1 from "../../Images/healthScore.png";
import servingg from "../../Images/serving.png";
import clock from "../../Images/clock.png";

export default function Card({
  name,
  diet,
  image,
  id,
  healthScore,
  readyInMinutes,
  summary,
  servings,
}) {
  if (typeof diet[0] === "object") {
    diet = diet.map((el) => el.name);
  }

  return (
    <div className={styles.recipe} key={id}>
      <div className={styles.recipethumb}>
        <span id="close-modal">
          <i className="ion ion-md-close"></i>
        </span>

        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = NotFound;
          }}
        />
      </div>
      <div className={styles.recipeContent}>
        <h2 className={styles.recipeTitle}>{name}</h2>

        <div className={styles.recipeDetails}>
          <p className={styles.recipeDetailsItem}>
            <span className={styles.value}>
              <img src={clock} alt="Time" />
              {readyInMinutes}
            </span>
            <span className={styles.title}>Minutes</span>
          </p>
          <p className={styles.recipeDetailsItem}>
            <i className="ion ion-ios-book-outline"></i>
            <span className={styles.value}>
              <img src={healthScore1} alt="Health Score" />
              {healthScore}
            </span>
            <span className={styles.title}>HealthScore</span>
          </p>
          <p className={styles.recipeDetailsItem}>
            <i className="ion ion-ios-person-outline"></i>
            <span className={styles.value}>
              <img src={servingg} alt="Servings" />
              {servings}
            </span>
            <span className={styles.title}>Serving</span>
          </p>
        </div>

        <div className={styles.description}>
          <h4>
            {" "}
            <img src={dietss} alt="Diet types" />
            Diet types:
          </h4>
          <ul>
            {diet.map((d, index) => (
              <li key={`${d.name}-${index}`}>{d}-</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <footer className={styles.contentFooter}>
          <a href={`/detail/${id}`}>View Recipe</a>
        </footer>
      </div>
    </div>
  );
}
