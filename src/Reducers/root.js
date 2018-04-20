import { SET_USER } from '../Actions/';

let initState = { username : null };

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case SET_USER:
      Object.assign({}, state, { username : action.username });
      return state;
    default:
      return state;

  }
};
