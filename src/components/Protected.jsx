import React from "react";
import { withRouter } from 'react-router-dom';

const Protected = () => {
  return (
    <div>
      <h1>Protected page, you are logged in!</h1>
    </div>
  )
};


export default withRouter(Protected);