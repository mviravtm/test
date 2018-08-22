import { usersService } from './index';

/**
 * Add new user
 * @param {string} userMail - users email
 * @returns {Function}
 */
export const addNewUser = userMail => async () => {
  try {
    await usersService.addNewUser({ login: userMail });
  } catch (error) {
    throw new Error(error);
  }
};

export default addNewUser;
