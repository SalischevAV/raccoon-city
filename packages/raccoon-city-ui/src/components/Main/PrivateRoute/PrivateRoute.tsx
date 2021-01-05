import React, {ReactNode} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {userInfo} from '../../shared/types/user.types';
import {useRouteMatch} from 'react-router-dom';

interface IPrivateRouteProps {
    children: ReactNode;
    path: string;
    exact?: boolean;
    userInfo: userInfo;
}

function isHasPermission(userInfo: userInfo, match: any): boolean {
    if (userInfo.role.key === 'superAdmin') return true;

    if (userInfo.developer.id === match.params.developerUuid) return true;

    return false;
}

export function PrivateRoute({children, userInfo, ...rest}: IPrivateRouteProps) {
    return (
        <Route
            {...rest}
            render={({match}) => {
                return isHasPermission(userInfo, match) ? children : <Redirect to="/" />;
            }}
        />
    );
}
