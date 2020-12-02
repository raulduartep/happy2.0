import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Landing} />
      <Route path="/app" exact component={OrphanagesMap} />
      <Route path="/app/orphanages/:id" component={Orphanage} />
      <Route path="/login" component={Login} />
      <Route path="/forgot_password" component={ForgotPassword} />
      <Route path="/reset_password" component={ResetPassword} />
    </>
  );
}

export default AppRoutes;