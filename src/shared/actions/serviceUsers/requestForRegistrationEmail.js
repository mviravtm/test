import { usersService } from './index';

/**
 * Request for registration users email
 * @param {string} userMail - users email
 * @returns {Function}
 */
export const requestForRegistrationEmail = userMail => async () => {
  try {
    await usersService.requestForRegistrationEmail({ email: userMail });
  } catch (error) {
    throw new Error(error);
  }
};

export default requestForRegistrationEmail;
