import axios from 'axios';


export const isAuthenticated = (bool) => {
  return {
    type: 'AUTHENTICATED',
    payload: bool
  };
}

export const fetchData = (url, data) => {
  return (dispatch) => {
    dispatch(isAuthenticated(false));

    axios.post(url, data)
      .then(res => res.status)
      .then(status => {
        console.log(status);

        if (status === 200) {
          dispatch(isAuthenticated(true));
        }
      })
      .catch(err => console.error(err));
  };
};