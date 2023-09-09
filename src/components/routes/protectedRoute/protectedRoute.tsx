import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../../../utils/context/context';
import { AUTH_ROUTE, PROTECTED_ROUTES } from '../../../utils/routes/routes';
import { Role } from '../../../utils/types/user';

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
  const { getLoggedIn, getUser } = useAppContext();
  const isLoggedIn = getLoggedIn();
  const user = getUser();
  const isAllowed = isLoggedIn && user?.role?.name && allowedRoles?.includes(user.role.name);

  if (isLoggedIn && !isAllowed) {
    return <Navigate to={`../${PROTECTED_ROUTES.HOME}`} />;
  }

  if (!isAllowed) {
    console.log(
      isLoggedIn ? 'Logged in but not authorized by role' : 'Not logged, returning to auth',
    );
    return <Navigate to={`../${AUTH_ROUTE}`} />;
  }
  return children ? children : <Navigate to={PROTECTED_ROUTES.HOME} />;
};
