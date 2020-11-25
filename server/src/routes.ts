import uploadsConfig from '@config/uploads';
import { Router } from 'express';
import multer from 'multer';

import UserController from '@controllers/UserController';
import ForgotPasswordController from '@controllers/ForgotPasswordController';
import AuthController from '@controllers/AuthController';
import OrphanagesController from '@controllers/OrphanagesController';

import AccessTokenMiddleware from './middlewares/AccessTokenMiddleware';

const routes = Router();

const upload = multer(uploadsConfig);

routes.post('/users', UserController.create);
routes.post('/login', AuthController.login);
routes.post('/update_refresh_token', AuthController.updateRefreshToken);
routes.post('/forgot_password', ForgotPasswordController.create);
routes.post('/reset_password/:token', UserController.updatePassword);

routes.post(
  '/orphanages',
  AccessTokenMiddleware,
  upload.array('images'),
  OrphanagesController.create,
);

routes.get('/orphanages/list', AccessTokenMiddleware, OrphanagesController.indexByUser);
routes.get('/orphanages/pending', AccessTokenMiddleware, OrphanagesController.indexPendingByUser);
routes.get('/orphanages/pending/:id', AccessTokenMiddleware, OrphanagesController.showPending);
routes.get('/orphanages/list/:id', AccessTokenMiddleware, OrphanagesController.show);
routes.put(
  '/orphanages/:id',
  AccessTokenMiddleware,
  upload.array('images'),
  OrphanagesController.update,
);
routes.delete('/orphanages/:id', AccessTokenMiddleware, OrphanagesController.delete);

routes.get('/public/orphanages', OrphanagesController.indexAll);
routes.get('/public/orphanages/:id', OrphanagesController.show);

export default routes;
