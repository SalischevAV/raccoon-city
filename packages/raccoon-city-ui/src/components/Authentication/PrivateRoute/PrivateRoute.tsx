import React, {ReactNode} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userInfo} from '../../shared/types/user.types';
interface IPrivateRouteProps {
    children: ReactNode;
    path: string;
    exact?: boolean;
    userInfo: userInfo;
}

function isUserPermitted(userInfo: userInfo, match: any): boolean {
    if (userInfo.role.key === 'superAdmin') {
        return true;
    }

    if (userInfo.developer.id === match.params.developerUuid) {
        return true;
    }

    return false;
}

export function PrivateRoute({children, userInfo, ...rest}: IPrivateRouteProps) {
    return (
        <Route
            {...rest}
            render={({match}) => {
                return isUserPermitted(userInfo, match) ? children : <Redirect to="/" />;
            }}
        />
    );
}
