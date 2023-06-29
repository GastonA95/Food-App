import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const RECIPE_DETAIL = "RECIPE_DETAIL";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const DELETE_DETAIL = "DELETE_DETAIL";

export function getRecipes() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/recipe");

      return dispatch({
        type: GET_RECIPES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchRecipe(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/recipe?name=${name}`);

    return dispatch({
      type: SEARCH_RECIPE,
      payload: json.data,
    });
  };
}

export function recipeDetail(id) {
  return async function (dispatch) {
    let info = await axios.get(`http://localhost:3001/recipe/${id}`);
    return dispatch({
      type: RECIPE_DETAIL,
      payload: info.data,
    });
  };
}

export function deleteDetail() {
  return function (dispatch) {
    return dispatch({
      type: DELETE_DETAIL,
    });
  };
}

export function createRecipe(info) {
  return async function (dispatch) {
    let json = await axios.post(`http://localhost:3001/recipe/`, info);
    return dispatch({ type: POST_RECIPE, payload: json.data });
  };
}

export function getDiet() {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/diet`);
    return dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

export function orderByName(order) {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
}

export function orderByScore(order) {
  return {
    type: ORDER_BY_SCORE,
    payload: order,
  };
}

export function filterRecipesByDiet(estado) {
  return {
    type: FILTER_BY_DIET,
    payload: estado,
  };
}
