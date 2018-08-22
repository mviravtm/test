import UsersService from '@plasma-platform/tm-service-users';
import Config from 'Config';
import { Cookie } from 'Utils';

const accessToken = Cookie.getItem('access_token', Config.cookiesRoot);

export const usersService = new UsersService(
  Config.usersServiceURL,
  accessToken,
);

export * from './addNewUser';
export * from './requestUserEmailExistInformation';
export * from './requestForRegistrationEmail';
export * from './signInExternalAuth';
export * from './getUserProfile';
