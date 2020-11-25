import User from '@models/UserModel';

export default {
  render(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  },
};
