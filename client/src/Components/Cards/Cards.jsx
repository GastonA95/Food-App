import React from "react";

import Card from "../Card/Card";

import style from "./Cards.module.css";

export default function Cards({ currentRecipes }) {
  return (
    <div className={style.container}>
      {currentRecipes && typeof currentRecipes === "object" ? (
        currentRecipes.map((r) => {
          return (
            <Card
              key={r.id}
              name={r.title}
              image={r.image}
              diet={r.diets}
              id={r.id}
              healthScore={r.healthScore}
              readyInMinutes={r.readyInMinutes}
              summary={r.summary}
              servings={r.servings}
              className={style.cards}
            />
          );
        })
      ) : (
        <h2 className={style.cargando}>No recipe found...</h2>
      )}
    </div>
  );
}
