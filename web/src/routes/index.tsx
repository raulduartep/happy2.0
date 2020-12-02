import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

const routes: React.FC = () => {
  return (
    <BrowserRouter>
        <AppRoutes />
        <AuthRoutes />
    </BrowserRouter>
  );
}

export default routes;