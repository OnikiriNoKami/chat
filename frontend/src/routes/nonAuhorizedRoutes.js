import { LOGIN_PATH } from '../utils/consts/routerConsts';
import AuthPage from '../pages/AuthPage';

export const nonAuthorizedRoutes = [
    {
        path: LOGIN_PATH,
        component: AuthPage,
    },
];