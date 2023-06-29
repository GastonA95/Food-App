const { Router } = require("express");
const { Diet, Recipe } = require("../db");

const {
  allInfo,
  apiRecipeById,
  dbRecipeById,
} = require("../routes/controllers/recipesControllers");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const allRecipes = await allInfo();
    if (name) {
      const filterName = allRecipes.filter((el) =>
        el.title.toLowerCase().includes(name.toLowerCase())
      );

      filterName.length
        ? res.status(200).send(filterName)
        : res.status(404).send("No se encontro receta");
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id.length < 10) {
    try {
      const recipeId = await apiRecipeById(id);
      if (recipeId) {
        res.status(200).send(recipeId);
      } else {
        res.status(404).send("No se encontró receta :/");
      }
    } catch (error) {
      res.status(400).send({ error });
    }
  } else {
    try {
      const recipeId = await dbRecipeById(id);

      if (recipeId) {
        res.status(200).send(recipeId);
      } else {
        res.status(404).send("No se encontró receta :/");
      }
    } catch (error) {
      res.status(400).send({ error });
    }
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    summary,
    healthScore,
    analyzedInstructions,
    readyInMinutes,
    servings,
    cuisines,
    image,
    diets,
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      analyzedInstructions,
      readyInMinutes,
      servings,
      cuisines,
      image,
    });
    const dietsDb = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    await newRecipe.addDiet(dietsDb);
    return res.send(`message: la receta   ${title}   se creo exitosamente`);
  } catch (error) {
    return res.send("La receta no se pudo crear por " + error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletes = await Recipe.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send("se elimino correctamente");
  } catch (error) {
    res.status(404).send("no se pudo eliminar");
  }
});

module.exports = router;
