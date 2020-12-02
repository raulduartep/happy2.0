import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import User from '@models/UserModel';
import ForgotPassword from '@models/ForgotPasswordModel';
import UserView from '@views/UserView';
import dataValidation from '@utils/dataValidation';

export default class UserController {
  static async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const errors = dataValidation(schema, { email, password });

    if (errors) {
      return response.status(400).json({ message: 'Validation fails', errors });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userRepository = getRepository(User);

      const user = userRepository.create({
        email,
        password: hashedPassword,
      });

      await userRepository.save(user);

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }

  static async updatePassword(request: Request, response: Response) {
    const { password } = request.body;
    const { token } = request.params;

    try {
      const forgotPasswordRepository = getRepository(ForgotPassword);
      const userRepository = getRepository(User);

      const forgotPassword = await forgotPasswordRepository.findOne({ relations: ['user'], where: { token } });

      if (!forgotPassword) {
        return response.status(400).json({
          message: 'Forgot token not found',
        });
      }

      if (forgotPassword.expires_in < DateTime.local().toSeconds()) {
        forgotPasswordRepository.remove(forgotPassword);

        return response.status(400).json({
          message: 'Token expired',
        });
      }

      const newHash = await bcrypt.hash(password, 10);

      userRepository.update(forgotPassword.user, { password: newHash });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }

  static async autenticate(email: string, password: string) {
    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new Error('Password does not match');
      }

      return UserView.render(user);
    } catch (error) {
      throw new Error('Unexpected error');
    }
  }
}
