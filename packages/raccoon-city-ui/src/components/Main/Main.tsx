import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ApartmentComplexInfo} from './ApartmentComplexBuilder/ApartmentComplexInfo/ApartmentComplexInfo';
import {ApartmentComplexList} from './ApartmentComplexList/ApartmentComplexList';
import {ChessGrid} from './ChessGrid/ChessGrid';
import {useStyles} from './drawerStyles';
import {Header} from './Header/Header';
import {HouseInfo} from './HouseBuilder/HouseInfo/HouseInfo';
import {Sidebar} from './Sidebar/Sidebar';
import {
    ApartmentComplexCreateForm,
    ApartmentComplexEditForm
} from './ApartmentComplexBuilder/ApartmentComplexForm/ApartmentComplexForm';
import {HouseCreateForm, HouseEditForm} from './HouseBuilder/HouseForm/HouseForm';

export function Main() {
    const [open, setOpen] = React.useState(false);
    const drawerStyles = useStyles();

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
            <main className={drawerStyles.content}>
                <div className={drawerStyles.toolbar} />
                <Switch>
                    <Route exact={true} path="/">
                        <ApartmentComplexList />
                    </Route>
                    <Route exact={true} path="/apartmentComplex/new">
                        <ApartmentComplexCreateForm />
                    </Route>
                    <Route exact={true} path="/apartmentComplex/:uuid/edit">
                        <ApartmentComplexEditForm />
                    </Route>
                    <Route path="/apartmentComplex/:uuid/overview">
                        <ApartmentComplexInfo />
                    </Route>
                    <Route path="/apartmentComplex/:uuid/house/:houseUuid">
                        <HouseInfo />
                    </Route>
                    <Route path="/houseGrid/:houseUuid">
                        <ChessGrid />
                    </Route>
                    <Route exact={true} path="/apartmentComplex/:uuid/create/house">
                        <HouseCreateForm />
                    </Route>
                    <Route exact={true} path="/apartmentComplex/:uuid/houseEdit/:houseUuid">
                        <HouseEditForm />
                    </Route>
                    <Route path="*">
                        <ApartmentComplexList />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}
