import React, { useContext, useEffect } from 'react';
import { browserRoutes } from '@/constants/routes';
import { useAppSelector } from '@/redux/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Storage_Keys } from '@/config/app.config';
import { useLazyGetUserRoleQuery, useRefreshAccessTokenMutation } from '@/redux/apiSlice/authSlice';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '@/redux/authSlice';
import { AbilityBuilder } from '@casl/ability';
import { AbilityContext } from '@/utils/providers/CanAbilityProvider';

const PrivateRoute: React.FC = () => {
    const location = useLocation();
    const storageLoggedIn = localStorage.getItem(Storage_Keys.loggedIn);
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    const [refreshToken, { isLoading }] = useRefreshAccessTokenMutation();
    const [getUerRole, { isLoading: isRoleLoading }] = useLazyGetUserRoleQuery();
    const ability = useContext(AbilityContext);
    
    useEffect(() => {
        if (!token) {
            (async () => {
                try {
                    const response = await refreshToken().unwrap();
                    dispatch(setAuthToken({ accessToken: response.accessToken }));
                } catch (err) {
                    localStorage.removeItem(Storage_Keys.loggedIn);
                    console.log(err);
                }
            })()
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const role = await getUerRole().unwrap();
                    const { can, rules } = new AbilityBuilder(() => ability);
                    if (role) {
                        if (role.superAdmin) {
                            can('manage', 'all');
                        } else {
                            role.permissions.forEach((permission) => {
                                can(permission.action, permission.module);
                            })
                        }
                        ability.update(rules);
                    }
                    

                } catch (err) {
                    console.log(err);
                }
            })()
        }
    }, [token]);

    if (isLoading  || isRoleLoading || (storageLoggedIn && storageLoggedIn === "true" && !token)) {
        return <h1>Loading...</h1>
    }
    
    return token ? <Outlet /> : <Navigate to={browserRoutes.signIn} state={{ from: location }} replace />;
    // const location = useLocation();

    // const { isLoading, isValid } = useTokenValidate();

    // if (isLoading) return <Progress />;

    // // if has been sat token and organization, then go to panel
    // if (authToken && isValid) return <Outlet />;

    // // if has been sat token but not organization, it is need to select an organization
    // if (tempToken) return <Navigate to={browserRoutes.signInOrganization} state={{ from: location }} />;

    // // if do not find token redirect to login page
    // return <Navigate to={browserRoutes.signIn} state={{ from: location }} />;
}

export default PrivateRoute;
