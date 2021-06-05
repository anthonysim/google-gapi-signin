import React from "react";
import { withRouter } from 'react-router-dom';

const Protected = () => {
  return (
    <div>
      <h1>Logged in, here is are your posts!</h1>
    </div>
  )
};


export default withRouter(Protected);