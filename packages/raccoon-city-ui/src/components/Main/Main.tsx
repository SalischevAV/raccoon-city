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
import {useStyles} from './drawerStyles';
import {Header} from './Header/Header';
import {HouseCreateForm, HouseEditForm} from './HouseBuilder/HouseForm/HouseForm';
import {Sidebar} from './Sidebar/Sidebar';

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
                        <Route exact={true} path="/developers/:developerUuid/apartmentComplexes">
                            <ApartmentComplexList />
                        </Route>
                        <Route exact={true} path="/developers/:developerUuid/chessgrid">
                            <MainChessGrid />
                        </Route>
                        <Route exact={true} path="/users">
                            <UserList />
                        </Route>
                        <Route exact={true} path="/developers">
                            <DeveloperList />
                        </Route>
                        {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                            <Route exact={true} path="/developer/new">
                                <DeveloperCreateForm />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                            <Route exact={true} path="/developer/:developerUuid/edit">
                                <DeveloperEditForm />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CREATE_DEVELOPER]) && (
                            <Route exact={true} path="/developer/:developerUuid/amo">
                                <AmoIntegration />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CONTACTS]) && (
                            <Route exact={true} path="/developers/:developerUuid/contacts">
                                <Contacts />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.TRADES]) && (
                            <Route exact={true} path="/developers/:developerUuid/trades">
                                <Trades />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CREATE_APARTMENT_COMPLEX]) && (
                            <Route exact={true} path="/developers/:developerUuid/apartmentComplex/new">
                                <ApartmentComplexCreateForm />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CREATE_APARTMENT_COMPLEX]) && (
                            <Route
                                exact={true}
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/edit"
                            >
                                <ApartmentComplexEditForm />
                            </Route>
                        )}
                        <Route path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/overview">
                            <ApartmentComplexInfo />
                        </Route>
                        <Route path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/house/:houseUuid">
                            <HouseInfo />
                        </Route>
                        <Route path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/houseGrid/:houseUuid">
                            <ChessGrid />
                        </Route>
                        {isEnabled(client, [FEATURES.CREATE_HOUSE]) && (
                            <Route
                                exact={true}
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/create/house"
                            >
                                <HouseCreateForm />
                            </Route>
                        )}
                        {isEnabled(client, [FEATURES.CREATE_HOUSE]) && (
                            <Route
                                exact={true}
                                path="/developers/:developerUuid/apartmentComplex/:apartmentComplexUuid/houseEdit/:houseUuid"
                            >
                                <HouseEditForm />
                            </Route>
                        )}
                        <Route path="*">
                            <DeveloperList />
                        </Route>
                    </Switch>
                </Suspense>
            </Content>
        </div>
    );
}

export default Main;
