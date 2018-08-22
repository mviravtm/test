import { schema } from 'normalizr';

const userSchema = new schema.Entity('users');

export default {
  USER: userSchema,
};
