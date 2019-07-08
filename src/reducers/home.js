import actions from "../constants/actions";

const {
  GET_ENTERPRISE_SEARCH_SUCCESS,
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
      case GET_ENTERPRISE_SEARCH_SUCCESS:
        return {
          ...state,
          EnSearchData: action.data
        };
        default:
            return state;
        }
};