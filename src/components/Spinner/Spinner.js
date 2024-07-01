import React from 'react';
import Spinner from '@atlaskit/spinner';
import "../../assets/css/Spinner.css";

const EvoSpinner = () => {
  return (
    <div className="spinner-hover">
      <Spinner interactionName="load" size={"large"} delay={500}/>
    </div>
  );
};

export default EvoSpinner;