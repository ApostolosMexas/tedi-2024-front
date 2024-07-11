import React from 'react';
import Spinner from '@atlaskit/spinner';
import "../assets/css/components/spinner.css";

const SpinnerWrapper = () => {
  return (
    <div className="spinner-hover">
      <Spinner interactionName="load" size={"large"} delay={500}/>
    </div>
  );
};

export default SpinnerWrapper;