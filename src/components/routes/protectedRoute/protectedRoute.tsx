import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { LoaderScreen } from '@layouts/loader/loader';
import { AUTH_ROUTE, PROTECTED_ROUTES } from '@types';
import { Role } from '@types';
import { useAppContext } from '@utils/context/context';

export type AuthRouteProps = {
  allowedRoles?: Role | Role[];
  children?: ReactElement<any, any>;
};

/**
 * Renders route only for authenticated users
 *
 * @param allowedRoles
 * @param children
 * @constructor
 *
 * @category Component
 *
 * @example
 * Example route configuration using `AuthRoute` component:
 * ```tsx showLineNumbers
 * <Route path="/" element={<AuthRoute allowedRoles={Role.ADMIN} />}>
 *   <Route index element={<span>Page accessible only by admins</span>} />
 * </Route>
 * ```
 */
export const ProtectedRoute = ({
  allowedRoles = [Role.ADMIN, Role.USER],
  children,
}: AuthRouteProps) => {
  const { getUser, getLoading } = useAppContext();
  const user = getUser();
  const loading = getLoading();
  const isAllowed = user && user?.role?.name && allowedRoles?.includes(user.role.name);

  if (loading) {
    return <LoaderScreen />;
  }
  if (user && !isAllowed) {
    console.log("Throwing back to Home as you don't have enough permissions");
    return <Navigate to={`../${PROTECTED_ROUTES.HOME}`} />;
  }

  if (!isAllowed) {
    console.log(user ? 'Logged in but not authorized by role' : 'Not logged, returning to auth');
    return <Navigate to={`../${AUTH_ROUTE}`} />;
  }
  return children ? children : <Navigate to={PROTECTED_ROUTES.HOME} />;
};
