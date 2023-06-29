const axios = require("axios");
const { Diet } = require("../../db");
const { API_KEY2, URL_RECIPES } = process.env;

const getAllDiets = async function () {
  // Chequea si la db tiene las dietas guardadas
  const allDiets = await Diet.findAll();

  if (allDiets.length === 0) {
    const response = await axios.get(
      `${URL_RECIPES}${API_KEY2}&number=50&addRecipeInformation=true`
    );

    const dietas = response.data.results.map((recipe) => {
      return recipe.diets;
    });

    const dietasUnidas = dietas.flat();

    const dietasFiltradas = dietasUnidas.filter((d, index) => {
      return dietasUnidas.indexOf(d) === index; //busca el primer indice de la dieta 'd' en el arreglo dietasUnidas y se fija que coincida con el index para devolverlo
    });

    await dietasFiltradas.forEach((d) => {
      Diet.create({
        name: d,
      });
    });
  }

  const allDietsNames = allDiets.map((d) => d.dataValues.name);

  return allDietsNames;
};

module.exports = { getAllDiets };
