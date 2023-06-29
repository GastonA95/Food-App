const axios = require("axios");
const { Diet, Recipe } = require("../../db");
const { API_KEY2, URL_RECIPES, URL_ID } = process.env;

// Try catch para ver si esta caida la api y por lo menos devolver la info de la db devolviendo un []
const getApiRecipes = async function () {
  try {
    const infoApi = await axios.get(
      `${URL_RECIPES}${API_KEY2}&addRecipeInformation=true&number=50`
    );

    const resultInfoApi = await infoApi.data.results.map((r) => {
      return {
        id: r.id,
        title: r.title,
        image: r.image,
        diets: r.diets,
        healthScore: r.healthScore,
        readyInMinutes: r.readyInMinutes,
        summary: r.summary,
        servings: r.servings,
      };
    });

    return resultInfoApi;
  } catch (error) {
    return [];
  }
};

const getDbRecipes = async function () {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    return [];
  }
};

const allInfo = async function () {
  const dbData = await getDbRecipes();
  const apiData = await getApiRecipes();

  const allData = dbData.concat(apiData);
  return allData;
};

const apiRecipeById = async function (id) {
  const response = await axios.get(`${URL_ID}${id}/information?${API_KEY2}`);
  const finalResponse = response.data;
  const idRecipe = {
    id: finalResponse.id,
    title: finalResponse.title,
    image: finalResponse.image,
    diets: finalResponse.diets,
    dishTypes: finalResponse.dishTypes,
    summary: finalResponse.summary,
    readyInMinutes: finalResponse.readyInMinutes,
    servings: finalResponse.servings,
    cuisines: finalResponse.cuisines,
    healthScore: finalResponse.healthScore,
    analyzedInstructions:
      finalResponse.analyzedInstructions.length > 0
        ? finalResponse.analyzedInstructions[0].steps.map((e) => e.step)
        : "No steps",
  };

  return idRecipe;
};

const dbRecipeById = async (id) => {
  return await Recipe.findAll({
    where: {
      id: id,
    },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getApiRecipes,
  getDbRecipes,
  allInfo,
  apiRecipeById,
  dbRecipeById,
};
