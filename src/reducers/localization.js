import { SET_LANGUAGE } from '../actions/actionTypes';

const initialState = {
  language: 'en',
};

const localizationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LANGUAGE:
      return ({ ...state, language: payload });
    default:
      return state;
  }
};

export default localizationReducer;
