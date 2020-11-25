import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const replaceSpecialCharsAndExtension = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/\.[^/.]+$/, '')
  .replace(/([^\w]+|\s+)/g, '-')
  .replace(/--+/g, '-')
  .replace(/(^-+|-+$)/, '')
  .toLowerCase();

const getFileExtension = (filename: string) => filename.split('.').pop();

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const extension = getFileExtension(file.originalname);
      const fileName = `${crypto.randomBytes(8).toString('hex')}_${replaceSpecialCharsAndExtension(file.originalname)}.${extension}`;

      cb(null, fileName);
    },
  }),
};
