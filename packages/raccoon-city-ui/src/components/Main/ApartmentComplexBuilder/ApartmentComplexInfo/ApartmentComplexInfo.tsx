import {useQuery} from '@apollo/react-hooks';
import {AppBar, Box, Grid, Theme} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, useParams} from 'react-router';
import {useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {FEATURES} from '../../../../core/constants/features';
import {APARTMENT_COMPLEX_INFO} from '../../../../graphql/queries/apartmentComplexQuery';
import {setRouteParams, setTitle} from '../../../../redux/actions';
import {isEnabled} from '../../../../utils/feature';
import {Feature} from '../../../shared/components/features/Feature';
import {TitleWithEditIcon, TitleWithoutEditIcon} from '../../../shared/components/misc/TitleWithEditIcon';
import {StyledNavLink} from '../../../shared/components/styled';
import {ApartmentComplexType, ImageType} from '../../../shared/types/apartmentComplex.types';
import {HouseList} from '../../HouseList/HouseList';
import {ApartmentComplexData} from './ApartmentComplexData/ApartmentComplexData';
import {ApartmentComplexHistory} from './ApartmentComplexHistory/ApartmentComplexHistory';
import {ApartmentComplexImport} from './ApartmentComplexImport/ApartmentComplexImport';
import {ApartmentComplexLayoutEditor} from './ApartmentComplexLayoutEditor/ApartmentComplexLayoutEditor';
import {MainApartmentComplexImages} from './MainApartmentComplexImages/MainApartmentComplexImages';
import {Photos} from './Photos/Photos';
import {VRImages} from './VRImages/VRImages';

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
`;

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: '100%'
    }
}));

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

export const ApartmentComplexInfo = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Жилищный комплекс');
    }, [params]); // eslint-disable-line
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const {path, url} = useRouteMatch();
    const {apartmentComplexUuid, developerUuid} = useParams();
    if (!apartmentComplexUuid) {
        return <Redirect to="/" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loading, error, data, client} = useQuery<{getApartmentComplex: ApartmentComplexType}>(
        APARTMENT_COMPLEX_INFO,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                uuid: apartmentComplexUuid
            }
        }
    );

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error || !data) {
        return <p>Error :(</p>;
    }

    if (!data.getApartmentComplex) {
        return <Redirect to="/" />;
    }

    const {images, name} = data.getApartmentComplex;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                {isEnabled(client, [FEATURES.CREATE_APARTMENT_COMPLEX]) ? (
                    <TitleWithEditIcon
                        title={name}
                        editUrl={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/edit`}
                    />
                ) : (
                    <TitleWithoutEditIcon title={name} />
                )}
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={3}>
                        <StyledPaper>
                            <MainApartmentComplexImages images={images} />
                            <List component="nav" aria-label="main mailbox folders">
                                <StyledNavLink activeClassName="Mui-selected" to={`${url}/info`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Информация" />
                                    </ListItem>
                                </StyledNavLink>
                                <StyledNavLink activeClassName="Mui-selected" to={`${url}/houses`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Дома" />
                                    </ListItem>
                                </StyledNavLink>
                                <StyledNavLink activeClassName="Mui-selected" to={`${url}/layout`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Разметка ЖК" />
                                    </ListItem>
                                </StyledNavLink>
                                <Feature features={[FEATURES.IMPORT_FLATS]}>
                                    <StyledNavLink activeClassName="Mui-selected" to={`${url}/import`}>
                                        <ListItem button={true}>
                                            <ListItemText primary="Импорт помещений" />
                                        </ListItem>
                                    </StyledNavLink>
                                </Feature>
                                <Feature features={[FEATURES.HISTORY]}>
                                    <StyledNavLink activeClassName="Mui-selected" to={`${url}/history`}>
                                        <ListItem button={true}>
                                            <ListItemText primary="История обновлений" />
                                        </ListItem>
                                    </StyledNavLink>
                                </Feature>
                                <ListItem
                                    button
                                    component="a"
                                    href={`${process.env.REACT_APP_URL}/spreadsheets/apartmentComplex/${apartmentComplexUuid}`}
                                >
                                    <ListItemText primary="Скачать в csv" />
                                </ListItem>
                            </List>
                        </StyledPaper>
                    </Grid>
                    <Grid item={true} xs={9}>
                        <div className={classes.root}>
                            <Switch>
                                <Route exact={true} path={`${path}/info`}>
                                    <AppBar position="static" color="default">
                                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                            <Tab label="Информация" />
                                            <Tab label="360" />
                                            <Tab label="Фото" />
                                        </Tabs>
                                    </AppBar>
                                    <TabPanel value={value} index={0}>
                                        <ApartmentComplexData apartmentComplex={data.getApartmentComplex} />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <VRImages
                                            uuid={apartmentComplexUuid}
                                            images={images.VR || []}
                                            mode={ImageType.VR}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Photos
                                            uuid={apartmentComplexUuid}
                                            images={images.PHOTO || []}
                                            mode={ImageType.PHOTO}
                                        />
                                    </TabPanel>
                                </Route>
                                <Route path={`${path}/houses`}>
                                    <HouseList />
                                </Route>
                                {isEnabled(client, [FEATURES.IMPORT_FLATS]) && (
                                    <Route path={`${path}/import`}>
                                        <ApartmentComplexImport />
                                    </Route>
                                )}
                                {isEnabled(client, [FEATURES.HISTORY]) && (
                                    <Route path={`${path}/history`}>
                                        <ApartmentComplexHistory />
                                    </Route>
                                )}
                                <Route path={`${path}/layout`}>
                                    <ApartmentComplexLayoutEditor />
                                </Route>
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
});

export default ApartmentComplexInfo;
