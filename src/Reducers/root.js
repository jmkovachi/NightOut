import { SET_USER } from '../Actions/setUser.js';

let initState = { username : null };

const rootReducer = (state = initState, action) => {
  switch(action.type) {

    case SET_USER:
      console.log(action);
      Object.assign(state, { username : action.username });
      console.log(state);
      return state;
    default:
      return state;

  }
};

export default rootReducer;
