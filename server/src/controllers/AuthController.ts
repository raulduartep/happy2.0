import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import AccessToken from '@utils/AccessToken';
import RefreshToken from '@utils/RefreshToken';
import User from '@models/UserModel';

export default class AuthController {
  static async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        error: 'Email or Password not informed',
      });
    }

    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        return response.status(401).json({
          message: 'User not found',
        });
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(401).json({
          message: 'Password does not match',
        });
      }

      const accessToken = AccessToken.create(user.id);
      const refreshToken = await RefreshToken.create(user.id);

      return response.status(200).json({
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      return response.status(401).json({
        message: error.message,
      });
    }
  }

  static async updateRefreshToken(request: Request, response: Response) {
    try {
      const { refresh_token: refreshToken } = request.body;

      if (!refreshToken) {
        return response.status(401).json({ error: 'No token provided' });
      }

      const refreshTokenValidated = await RefreshToken.validate(refreshToken);

      const newRefreshToken = await RefreshToken.create(refreshTokenValidated.user.id);
      const newAccessToken = AccessToken.create(refreshTokenValidated.user.id);

      return response.status(200).json({
        refresh_token: newRefreshToken,
        access_token: newAccessToken,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
