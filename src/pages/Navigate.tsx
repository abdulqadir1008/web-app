import React from 'react';
import { useNavigate } from 'react-router-dom';

export const withNavigateHook = (Component:any) => {
  return (props:any) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigateHook;
