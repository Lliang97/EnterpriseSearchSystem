import actions from "../constants/actions";

const {
    GET_ENTERPRISE_MESSAGE_SUCCESS,
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
      case GET_ENTERPRISE_MESSAGE_SUCCESS:
        return {
          ...state,
          enterpriseAllDate: action.data
        };
        default:
            return state;
        }
};