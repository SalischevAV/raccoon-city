import {useQuery} from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import {FEATURES} from '../../core/constants/features';
import {GET_USER_INFO} from '../../graphql/queries/userQuery';
import {isEnabled} from '../../utils/feature';
import {
    ApartmentComplexCreateForm,
    ApartmentComplexEditForm
} from './ApartmentComplexBuilder/ApartmentComplexForm/ApartmentComplexForm';
import {AmoIntegration} from './Developer/AmoIntegration';
import {DeveloperCreateForm, DeveloperEditForm} from './Developer/DeveloperForm';
import {PrivateRoute} from './PrivateRoute/PrivateRoute';
import {useStyles} from './drawerStyles';
import {Header} from './Header/Header';
import {HouseCreateForm, HouseEditForm} from './HouseBuilder/HouseForm/HouseForm';
import {Sidebar} from './Sidebar/Sidebar';
import {History} from './History/History';
import {userInfo} from '../shared/types/user.types';

const Content = styled.div`
    position: relative;
    max-width: 100%;
    overflow-y: auto;
    min-height: 100vh;
`;

const ChessGrid = lazy(() => import('./ChessGrid/ChessGrid'));
const UserList = lazy(() => import('./Users/UserList'));
const ApartmentComplexList = lazy(() => import('./ApartmentComplexList/ApartmentComplexList'));
const MainChessGrid = lazy(() => import('./MainChessGrid/MainChessGrid'));
const DeveloperList = lazy(() => import('./Developer/DeveloperList'));
const Contacts = lazy(() => import('./Contacts/Contacts'));
const Trades = lazy(() => import('./Trades/Trades'));
const HouseInfo = lazy(() => import('./HouseBuilder/HouseInfo/HouseInfo'));
const ApartmentComplexInfo = lazy(() => import('./ApartmentComplexBuilder/ApartmentComplexInfo/ApartmentComplexInfo'));

export const UserInfoContext = React.createContext({} as userInfo);

export function Main() {
    const {data, loading, client} = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network'
    });
    const [open, setOpen] = React.useState(false);
    const drawerStyles = useStyles();

    if (loading) {
        return <span>Loading...</span>;
    }

    if (!data || !data.getUserInfo) {
        return <Redirect to="/login" />;
    }

    return (
        <UserInfoContext.Provider value={data.getUserInfo}>
            <div className={drawerStyles.root}>
                <CssBaseline />
                <Header
                    drawerStyles={drawerStyles}
                    open={open}
                    handleDrawerOpen={() => {
                        setOpen(true);
                    }}
                />
                <Sidebar
                    drawerStyles={drawerStyles}
                    open={open}
                    handleDrawerClose={() => {
                        setOpen(false);
                    }}
                />
                <Content className={drawerStyles.content}>
                    <div className={drawerStyles.toolbar} />

                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <PrivateRoute
                                exact={true}
                                path="/developers/:developerUuid/apartmentComplexes"
                                userInfo={data.getUserInfo}
                            >
                                <ApartmentComplexList />
                            </PrivateRoute>
                            <PrivateRoute
                                exact={true}
                                path="/developers/:developerUuid/chessgrid"
                                userInfo={data.getUserInfo}
                            >
                                <MainChessGrid />
                            </PrivateRoute>
                            {isEnabled(client, [FEATURES.VIEW_USER]) && (
                                <Route exact={true} path="/users">
                                    <UserList />
                                </Route>
                            )}
                            <Route exact={true} path="/developers">
                                <DeveloperList />
                            </Route>
                            {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                                <Route exact={true} path="/developer/new">
                                    <DeveloperCreateForm />
                                </Route>
                            )}
                            {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developer/:developerUuid/edit"
                                    userInfo={data.getUserInfo}
                                >
                                    <DeveloperEditForm />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developer/:developerUuid/amo"
                                    userInfo={data.getUserInfo}
                                >
                                    <AmoIntegration />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.CONTACTS]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/contacts"
                                    userInfo={data.getUserInfo}
                                >
                                    <Contacts />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.TRADES]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/trades"
                                    userInfo={data.getUserInfo}
                                >
                                    <Trades />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.CREATE_APARTMENT_COMPLEX]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/apartmentComplex/new"
                                    userInfo={data.getUserInfo}
                                >
                                    <ApartmentComplexCreateForm />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.CREATE_APARTMENT_COMPLEX]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/edit"
                                    userInfo={data.getUserInfo}
                                >
                                    <ApartmentComplexEditForm />
                                </PrivateRoute>
                            )}
                            <PrivateRoute
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/overview"
                                userInfo={data.getUserInfo}
                            >
                                <ApartmentComplexInfo />
                            </PrivateRoute>
                            <PrivateRoute
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/house/:houseUuid"
                                userInfo={data.getUserInfo}
                            >
                                <HouseInfo />
                            </PrivateRoute>
                            <PrivateRoute
                                exact={true}
                                path="/developers/:developerUuid/history"
                                userInfo={data.getUserInfo}
                            >
                                <History />
                            </PrivateRoute>
                            <PrivateRoute
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/houseGrid/:houseUuid"
                                userInfo={data.getUserInfo}
                            >
                                <ChessGrid />
                            </PrivateRoute>
                            {isEnabled(client, [FEATURES.CREATE_HOUSE]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/create/house"
                                    userInfo={data.getUserInfo}
                                >
                                    <HouseCreateForm />
                                </PrivateRoute>
                            )}
                            {isEnabled(client, [FEATURES.CREATE_HOUSE]) && (
                                <PrivateRoute
                                    exact={true}
                                    path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/houseEdit/:houseUuid"
                                    userInfo={data.getUserInfo}
                                >
                                    <HouseEditForm />
                                </PrivateRoute>
                            )}
                            <Route path="*">
                                <DeveloperList />
                            </Route>
                        </Switch>
                    </Suspense>
                </Content>
            </div>
        </UserInfoContext.Provider>
    );
}

export default Main;
