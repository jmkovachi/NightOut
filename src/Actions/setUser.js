export const SET_USER = 'SET_USER';

export function setUser(username) {
  return (dispatch) => {
    dispatch({ type : SET_USER, username : username });
  }
}
