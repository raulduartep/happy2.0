import crypto from 'crypto';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { getRepository } from 'typeorm';

import ForgotPassword from '@models/ForgotPasswordModel';
import User from '@models/UserModel';

export default class ForgotPasswordController {
  static async create(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const forgotPasswordRepository = getRepository(ForgotPassword);
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        return response.status(400).json({
          message: 'User not found',
        });
      }

      const lastForgotPassword = await forgotPasswordRepository.findOne({ user });

      if (lastForgotPassword) {
        forgotPasswordRepository.remove(lastForgotPassword);
      }

      const token = crypto.randomBytes(24).toString('hex');
      const expires_in = DateTime.local().plus({ hour: 1 }).toSeconds();

      const newRefreshToken = forgotPasswordRepository.create({
        token,
        expires_in,
        user,
      });

      forgotPasswordRepository.save(newRefreshToken);

      return response.status(201).json({ token });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}
