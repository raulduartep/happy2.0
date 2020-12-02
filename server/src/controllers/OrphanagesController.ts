import { Request, Response } from 'express';
import * as Yup from 'yup';

import Images from '@models/ImageModel';
import Orphanage from '@models/OrphanageModel';
import OrphanagesView from '@views/OrphanagesView';
import { getRepository, getConnection, Not } from 'typeorm';
import fs from 'fs';
import path from 'path';
import User from '@models/UserModel';
import dataValidation from '@utils/dataValidation';

export default {
  async create(request: Request, response: Response) {
    // eslint-disable-next-line no-undef
    const images = request.files as Express.Multer.File[];

    const { user_id: userId } = request;

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      pending,
      whatsapp,
    } = request.body;

    const imagesWiilBeAdd = images.map((image) => ({ path: image.filename }));

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      pending: pending === 'true',
      userId,
      whatsapp,
      open_on_weekends: open_on_weekends === 'true',
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required().min(-90).max(90),
      longitude: Yup.number().required().min(-180).max(180),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      whatsapp: Yup.string().matches(/^[0-9]{2}[0-9]?[0-9]{4}[0-9]{4}$/, 'Phone not valid'),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    const errors = await dataValidation(schema, data);

    if (errors) {
      return response.status(400).json({ message: 'Validation fails', errors });
    }

    try {
      const orphanagesRepository = getRepository(Orphanage);
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id: userId },
      });

      const orphanage = orphanagesRepository.create({ images: imagesWiilBeAdd, user, ...data });

      await orphanagesRepository.save(orphanage);

      return response.status(201).json(OrphanagesView.render(orphanage));
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = await orphanagesRepository.findOne({
        relations: ['images'],
        where: {
          id,
          pending: false,
        },
      });

      return response.status(200).json(OrphanagesView.render(orphanage));
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async showPending(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = await orphanagesRepository.findOne({
        relations: ['images'],
        where: {
          id,
          pending: true,
        },
      });

      return response.status(200).json(OrphanagesView.render(orphanage));
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async indexAll(request: Request, response: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanages = await orphanagesRepository.find({
        relations: ['images'],
        where: { pending: Not(true) },
      });

      return response.status(200).json(OrphanagesView.renderMany(orphanages));
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async indexByUser(request: Request, response: Response) {
    const { user_id: userId } = request;

    try {
      const orphanagesRepository = getRepository(Orphanage);
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id: userId },
      });

      const orphanages = await orphanagesRepository.find({
        where: { user, pending: false },
        relations: ['images'],
      });

      return response.status(200).json(OrphanagesView.renderMany(orphanages));
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async indexPendingByUser(request: Request, response: Response) {
    const { user_id: userId } = request;

    try {
      const orphanagesRepository = getRepository(Orphanage);
      const userRepository = getRepository(User);

      const user = await userRepository.findOne(userId);

      const orphanages = await orphanagesRepository.find({
        where: { user, pending: true },
        relations: ['images'],
      });

      return response.status(200).json(OrphanagesView.renderMany(orphanages));
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async update(request: Request, response: Response) {
    // eslint-disable-next-line no-undef
    const images = request.files as Express.Multer.File[];

    const { id: orphanageId } = request.params;

    const { user_id: userId } = request;

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      pending,
    } = request.body;

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      pending,
      open_on_weekends: open_on_weekends === 'true',
    };

    try {
      const orphanagesRepository = getRepository(Orphanage);
      const imagesRepository = getRepository(Images);

      const orphanage = await orphanagesRepository.findOne({ where: { id: orphanageId }, relations: ['user'] });

      if (!orphanage) {
        return response.status(400).json({
          message: 'Orphanage not found',
        });
      }

      if (orphanage.user.id !== userId) {
        return response.status(400).json({
          message: 'User not permitted update this orphanage',
        });
      }

      const imagesWillBeAdd = images.map((image) => ({ path: image.filename, orphanage }));

      const oldImages = await imagesRepository.find({ orphanage });

      await getConnection().transaction(async (manager) => {
        await manager.update(Orphanage, orphanage, data);
        await manager.delete(Images, { orphanage });
        await manager.insert(Images, imagesWillBeAdd);
      });

      oldImages.forEach((image) => {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', image.path));
      });

      return response.status(200).send();
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },

  async delete(request: Request, response: Response) {
    const { id: orphanageId } = request.params;

    const { user_id: userId } = request;

    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = await orphanagesRepository.findOne({ where: { id: orphanageId }, relations: ['user'] });

      if (!orphanage) {
        throw new Error('Orphanage not found.');
      }

      if (orphanage.user.id !== userId) {
        throw new Error('User not permitted delete this orphanage.');
      }

      await orphanagesRepository.remove(orphanage);

      return response.status(200).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  },
};
