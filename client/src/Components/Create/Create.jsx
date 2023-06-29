import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDiet } from "../../Redux/Action";
import { createRecipe } from "../../Redux/Action";
import styles from "./Create.module.css";

function validate(input) {
  const errors = {};
  let score = Number(input.healthScore);
  let serv = Number(input.servings);
  let min = Number(input.readyInMinutes);

  if (!input.title) errors.title = "Campo Necesario";
  else if (/[^A-Za-z0-9 ]+/g.test(input.title))
    errors.title = "Nombre no puede tener caracteres especiales o tildes";

  if (!input.summary || input.summary === "vacio") {
    errors.summary = "Campo Necesario";
  }

  if (!input.healthScore) {
    errors.healthScore = "Campo Necesario";
  } else if (score <= 0 || score > 101) {
    errors.healthScore = "Debe ser entre 1 y 100";
  }

  if (!input.servings) {
    errors.servings = "Campo Necesario";
  } else if (serv <= 0 || serv > 24) {
    errors.servings = "Debe ser entre 1 y 24";
  }

  if (!input.readyInMinutes) {
    errors.readyInMinutes = "Campo Necesario";
  } else if (min <= 0 || min > 60) {
    errors.readyInMinutes = "Debe ser entre 0 y 60";
  }

  if (!input.analyzedInstructions || input.analyzedInstructions === "vacio") {
    errors.analyzedInstructions = "Campo Necesario";
  }

  if (!input.Cuisines || input.Cuisines === "vacio") {
    errors.Cuisines = "Campo Necesario";
  }

  if (!input.image) {
    errors.image = "Ingresar URL de alguna imagen representativa";
  }

  if (!input.diets || input.countridiets === 0) {
    errors.diets = "Campo Necesario";
  }

  return errors;
}
export default function Create() {
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: "",
    analyzedInstructions: "",
    readyInMinutes: "",
    servings: "",
    cuisines: "",
    image: "",
    diets: [],
  });

  const dietas = useSelector((state) => state.diets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiet());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDiets = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.title ||
      !input.summary ||
      !input.healthScore ||
      !input.analyzedInstructions ||
      !input.readyInMinutes ||
      !input.servings ||
      !input.cuisines ||
      !input.image ||
      !input.diets
    ) {
      return alert("Complete correctamente el formulario antes de enviarlo");
    }

    dispatch(createRecipe(input));
    alert(`${input.title} created`);
    setInput({
      title: "",
      summary: "",
      healthScore: "",
      analyzedInstructions: "",
      readyInMinutes: "",
      servings: "",
      cuisines: "",
      image: "",
      diets: [],
    });
    history.push("/home");
  }

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className={styles.fondo}>
      <form className={styles.msform} onSubmit={handleSubmit}>
        <ul className={styles.progressbar}>
          <li className={step === 1 ? styles.active : ""}></li>
          <li className={step === 2 ? styles.active : ""}></li>
          <li className={step === 3 ? styles.active : ""}></li>
        </ul>
        {step === 1 && (
          <fieldset>
            <h2 className={styles["fs-title"]}>Recipe</h2>
            <div className={styles.inputContainer}>
              <input
                type="text"
                required
                name="title"
                placeholder="Title"
                value={input.title}
                onChange={(e) => handleChange(e)}
                className={errors.title ? `${styles.error}` : ""}
              />
              {errors.title && (
                <p className={styles.errorMessage}>{errors.title}</p>
              )}

              <input
                name="cuisines"
                type="text"
                id="cuisines"
                value={input.cuisines}
                onChange={(e) => handleChange(e)}
                className={errors.cuisines ? styles.error : ""}
                placeholder="Cuisines"
              />
              {errors.cuisines && (
                <p className={styles.errorMessage}>{errors.cuisines}</p>
              )}
              <input
                name="image"
                type="url"
                id="image"
                placeholder="Url image.."
                value={input.image}
                onChange={(e) => handleChange(e)}
                className={errors.image ? styles.error : ""}
              />
              {errors.image && (
                <p className={styles.errorMessage}>{errors.image}</p>
              )}
            </div>
            <input
              type="button"
              name="next"
              className={`${styles.next} ${styles["action-button"]}`}
              onClick={handleNext}
              value="Next"
              disabled={
                errors.title ||
                errors.cuisines ||
                errors.image ||
                input.title === "" ||
                input.cuisines === "" ||
                input.image === ""
              }
            />
          </fieldset>
        )}
        {step === 2 && (
          <fieldset>
            <h2 className={styles["fs-title"]}>Recipe</h2>
            <div className={styles.inputContainer}>
              <input
                name="servings"
                type="number"
                id="servings"
                value={input.servings}
                min="1"
                max="10"
                onChange={(e) => handleChange(e)}
                className={errors.servings ? styles.error : ""}
                placeholder="Servings"
              />
              {errors.servings && (
                <p className={styles.errorMessage}>{errors.servings}</p>
              )}
              <input
                name="readyInMinutes"
                type="number"
                id="readyInMinutes"
                value={input.readyInMinutes}
                min="0"
                max="100"
                onChange={(e) => handleChange(e)}
                className={errors.readyInMinutes ? styles.error : ""}
                placeholder="Ready In Minutes"
              />
              {errors.readyInMinutes && (
                <p className={styles.errorMessage}>{errors.readyInMinutes}</p>
              )}
              <input
                name="healthScore"
                type="number"
                id="health-score"
                value={input.healthScore === 0 ? "" : input.healthScore}
                min="0"
                max="100"
                onChange={(e) => handleChange(e)}
                className={errors.healthScore ? styles.error : ""}
                placeholder="Health Score"
              />
              {errors.healthScore && (
                <p className={styles.errorMessage}>{errors.healthScore}</p>
              )}
            </div>
            <input
              type="button"
              name="previous"
              className={`${styles.previous} ${styles["action-button"]}`}
              onClick={handlePrev}
              value="Previous"
            />
            <input
              type="button"
              name="next"
              className={`${styles.next} ${styles["action-button"]}`}
              onClick={handleNext}
              value="Next"
              disabled={
                errors.servings ||
                errors.readyInMinutes ||
                errors.healthScore ||
                input.servings === "" ||
                input.readyInMinutes === "" ||
                input.healthScore === ""
              }
            />
          </fieldset>
        )}
        {step === 3 && (
          <fieldset>
            <h2 className={styles["fs-title"]}>Recipe</h2>
            <div className={styles.inputContainer}>
              <label htmlFor="name">
                {" "}
                <select
                  name="diets"
                  onChange={(e) => handleDiets(e)}
                  className={`${styles.input} ${
                    errors.diets ? styles.errorMessage : ""
                  }`}
                  value=""
                >
                  <option value="" disabled>
                    Type Diets
                  </option>
                  {dietas &&
                    dietas.map((d) => (
                      <option key={d} value={`${d}`}>
                        {d}
                      </option>
                    ))}
                </select>
              </label>
              <textarea
                value={input.diets.join(", ")}
                onChange={(e) =>
                  setInput({ ...input, diets: e.target.value.split(",") })
                }
                className={styles.textareaDiet}
                disabled
              />

              <textarea
                type="text"
                id="summary"
                required
                name="summary"
                value={input.summary}
                onChange={(e) => handleChange(e)}
                className={errors.summary ? styles.errorMessage : ""}
                placeholder="Summary"
              />
              <textarea
                type="text"
                id="analyzedInstructions"
                required
                name="analyzedInstructions"
                value={input.analyzedInstructions}
                onChange={(e) => handleChange(e)}
                className={
                  errors.analyzedInstructions ? styles.errorMessage : ""
                }
                placeholder="Instructions"
              />
            </div>
            <input
              type="button"
              name="previous"
              className={`${styles.previous} ${styles["action-button"]}`}
              onClick={handlePrev}
              value="Previous"
            />
            <input
              type="submit"
              name="submit"
              className={`${styles.submit} ${styles["action-button"]}`}
              value="Submit"
              disabled={
                errors.diets ||
                errors.summary ||
                errors.analyzedInstructions ||
                input.diets === "" ||
                input.summary === "" ||
                input.analyzedInstructions === ""
              }
            />
          </fieldset>
        )}
      </form>
      <div className={styles.home_button_container}>
        <a href="/home" className={styles.home_button}>
          Back to Home
        </a>
      </div>
    </div>
  );
}
