import RefreshToken from '@models/RefreshTokenModel';
import User from '@models/UserModel';
import crypto from 'crypto';
import { DateTime } from 'luxon';
import { getRepository } from 'typeorm';

export default {
  async create(userId: number) {
    const refreshTokenRepository = getRepository(RefreshToken);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    const lastRefreshToken = await refreshTokenRepository.findOne({ user });

    if (lastRefreshToken) {
      refreshTokenRepository.remove(lastRefreshToken);
    }

    const token = crypto.randomBytes(24).toString('hex');
    const expires_in = DateTime.local().plus({ hour: 2 }).toSeconds();

    const newRefreshToken = refreshTokenRepository.create({
      token,
      expires_in,
      user,
    });

    refreshTokenRepository.save(newRefreshToken);

    return token;
  },

  async validate(token: string) {
    const refreshTokenRepository = getRepository(RefreshToken);

    const refreshToken = await refreshTokenRepository.findOne({ relations: ['user'], where: { token } });

    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }

    if (refreshToken.expires_in < DateTime.local().toSeconds()) {
      refreshTokenRepository.remove(refreshToken);

      throw new Error('Token expired');
    }

    return refreshToken;
  },

};
