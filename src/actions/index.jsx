export const isAuthenticated = (bool) => {
  return {
    type: 'AUTHENTICATED',
    payload: bool
  };
}

