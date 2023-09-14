import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { LoaderScreen } from '@layouts/loader/loader';
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from '@types/routes';
import { useAppContext } from '@utils/context/context';

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
  const { getUser, getLoading } = useAppContext();
  const loading = getLoading();
  const user = getUser();

  if (loading) {
    return <LoaderScreen />;
  }

  if (user) {
    return <Navigate to={PROTECTED_ROUTES.HOME} />;
  }

  return children ? children : <Navigate to={UNPROTECTED_ROUTES.LOGIN} />;
};
