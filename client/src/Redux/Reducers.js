import {
  FILTER_BY_DIET,
  GET_DIETS,
  GET_RECIPES,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  POST_RECIPE,
  RECIPE_DETAIL,
  SEARCH_RECIPE,
  DELETE_DETAIL,
} from "./Action";

const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  newRecipe: [],
  diets: [],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case RECIPE_DETAIL:
      if (action.payload.length) {
        const obj = action.payload[0];
        return {
          ...state,
          details: obj,
        };
      } else {
        const obj = action.payload;
        return {
          ...state,
          details: obj,
        };
      }

    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
        newRecipe: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case DELETE_DETAIL:
      return {
        ...state,
        details: [],
      };
    case ORDER_BY_NAME:
      let all = state.recipes;
      let sort =
        action.payload === "asc"
          ? all.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : all.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sort,
      };
    case ORDER_BY_SCORE:
      let todas = state.recipes;
      let order =
        action.payload === "asc"
          ? todas.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : todas.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: order,
      };
    case FILTER_BY_DIET:
      const loadRecipes = state.allRecipes;
      const mp = loadRecipes.map((d) => {
        if (typeof d.diets[0] === "object") {
          return {
            ...d,
            diets: d.diets.map((r) => r.name),
          };
        }
        return d;
      });

      const filter =
        action.payload === "All"
          ? mp
          : mp.filter((r) => r.diets.includes(action.payload));
      return {
        ...state,
        recipes: filter,
      };

    default:
      return state;
  }
};

export default reducer;
