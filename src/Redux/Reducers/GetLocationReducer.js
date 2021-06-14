import { GET_GEO_LOCATION_SUCCESS } from '../Types';
  
  const INITIAL_STATE = {
    location : null,
  };
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case  GET_GEO_LOCATION_SUCCESS:
        return {
          ...state,
          location: action.payload,
        };
  
      default:
        return state;
    }
  };