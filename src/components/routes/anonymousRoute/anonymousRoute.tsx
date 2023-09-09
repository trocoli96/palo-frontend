import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../../../utils/context/context';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '../../../utils/routes/routes';

/**
 * Renders route only for anonymous users
 *
 * @constructor
 * @category Component
 *
 * @example
 * Example route configuration using `AnonymousRoute` component:
 * ```tsx showLineNumbers
 * <Route path="/" element={<AnonymousRoute />}>
 *   <Route index element={<span>Page accessible only anonymous users</span>} />
 * </Route>
 * ```
 */
export const AnonymousRoute = ({ children }: { children?: ReactElement<any, any> }) => {
  const { getLoggedIn } = useAppContext();
  const isLoggedIn = getLoggedIn();

  if (isLoggedIn) {
    return <Navigate to={PROTECTED_ROUTES.HOME} />;
  }

  return children ? children : <Navigate to={UNPROTECTED_ROUTES.LOGIN} />;
};
