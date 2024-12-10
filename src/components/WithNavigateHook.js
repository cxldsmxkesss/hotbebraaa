import React from 'react';
import { useNavigate } from 'react-router-dom';

function WithNavigateHook(Component) {
  return function(props) {
    const navigation = useNavigate();
    return <Component navigation={navigation} {...props} />
  }
}

export default WithNavigateHook;