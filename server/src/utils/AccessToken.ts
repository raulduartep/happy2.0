import jwt from 'jsonwebtoken';

export default {
  create(id: number) {
    const token = jwt.sign(
      { id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' },
    );

    return token;
  },

  validate(token: string) {
    const id = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Token expired');
        }

        throw new Error('Token invalid');
      }

      return (<any>decoded).id;
    });

    return Number(id);
  },
};
