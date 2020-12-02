import React from 'react';
import { Redirect } from 'react-router-dom';

import OrphanagesList from '../pages/OrphanagesList'
import OrphanagesPending from '../pages/OrphanagesPending';
import PrivateRoute from '../components/PrivateRoute';
import OrphanageForm from '../pages/OrphanageForm';

function AuthRoutes() {
  return (
    <>
      <PrivateRoute path="/orphanages/create">
        <OrphanageForm variant='create' />
      </PrivateRoute>
      <PrivateRoute path='/dashboard' exact>
        <Redirect to={`/dashboard/orphanages/list`} />
      </PrivateRoute>
      <PrivateRoute path={`/dashboard/orphanages/list`} exact component={OrphanagesList} />
      <PrivateRoute path={`/dashboard/orphanages/pending`} exact component={OrphanagesPending} />
      <PrivateRoute path={`/dashboard/orphanages/pending/edit/:id`}>
        <OrphanageForm variant='pending' />
      </PrivateRoute>
      <PrivateRoute path={`/dashboard/orphanages/list/edit/:id`} >
        <OrphanageForm variant='edit' />
      </PrivateRoute>
    </>
  );
}

export default AuthRoutes;