import {useMutation, useQuery} from '@apollo/react-hooks';
import {AppBar, Grid, Theme} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {format, parseISO} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, useParams} from 'react-router';
import {useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {PUBLISH_HOUSE} from '../../../../graphql/mutations/houseMutation';
import {HOUSE_INFO} from '../../../../graphql/queries/houseQuery';
import {setRouteParams, setTitle} from '../../../../redux/actions';
import {TitleWithEditIcon} from '../../../shared/components/misc/TitleWithEditIcon';
import {StyledNavLink} from '../../../shared/components/styled';
import {TabPanel} from '../../../shared/components/tabs/TabPanel';
import {ImageType} from '../../../shared/types/apartmentComplex.types';
import {House} from '../../../shared/types/house.types';
import {FlatLayouInfo} from '../../LayoutEditor/FlatLayoutInfo/FlatLayoutInfo';
import {LayoutEditor} from '../../LayoutEditor/LayoutEditor';
import {LevelLayoutEditor} from '../../LevelEditor';
import {HouseEditor} from '../HouseEditor/HouseEditor';
import {MainHouseImages} from './MainHouseImages/MainHouseImages';
import {Photos} from './Photos/Photos';
import {VRImages} from './VRImages/VRImages';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: '100%'
    }
}));

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
`;

const StyledLink = styled(StyledNavLink)`
    &.Mui-selected > div {
        color: white;
        background-color: #37485c;
        &:hover {
            background-color: #5d7a9c;
        }
    }
`;
export const getDateFromFullString = (date: any) => {
    if (date) {
        try {
            return format(parseISO(date), 'MM yyyy', {locale: ruLocale});
        } catch (e) {
            return 'Не определено';
        }
    } else {
        return 'Не определено';
    }
};

function PublishHouse({uuid}) {
    const [mutation] = useMutation(PUBLISH_HOUSE);

    return (
        <ListItem
            button={true}
            onClick={async () => {
                await mutation({
                    variables: {
                        uuid
                    },
                    refetchQueries: [
                        {
                            query: HOUSE_INFO,
                            variables: {
                                uuid
                            }
                        }
                    ]
                });
            }}
        >
            <ListItemText primary="Опубликовать" />
        </ListItem>
    );
}

export const HouseInfo = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Информация о доме');
    }, [params]); // eslint-disable-line
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const {path, url} = useRouteMatch();
    const {houseUuid: uuid, apartmentComplexUuid, developerUuid} = useParams();
    if (!uuid) {
        return <Redirect to="/" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loading, error, data} = useQuery<{getHouse: House}>(HOUSE_INFO, {
        fetchPolicy: 'network-only',
        variables: {
            uuid
        }
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error || !data) {
        return <p>Error :(</p>;
    }

    if (!data.getHouse) {
        return <Redirect to="/" />;
    }

    const {name, images, parking, price, publishedDate, beginDate, endDate} = data.getHouse;

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const publishedText = publishedDate ? `Опубликовано: ${format(parseISO(publishedDate), 'dd.MM.yyyy HH:mm')}` : '';
    return (
        <Fragment>
            <Container maxWidth="lg">
                <TitleWithEditIcon
                    title={`${name}`}
                    editUrl={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/houseEdit/${uuid}`}
                    children={<span>{publishedText}</span>}
                />
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={3}>
                        <StyledPaper>
                            <MainHouseImages images={images} />
                            <List component="nav" aria-label="main mailbox folders">
                                <StyledLink activeClassName="Mui-selected" to={`${url}/info`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Информация" />
                                    </ListItem>
                                </StyledLink>
                                <StyledLink
                                    activeClassName="Mui-selected"
                                    to={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/houseGrid/${uuid}`}
                                >
                                    <ListItem button={true}>
                                        <ListItemText primary="Просмотр шахматки" />
                                    </ListItem>
                                </StyledLink>
                                <StyledLink activeClassName="Mui-selected" to={`${url}/editor`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Редактор помещений" />
                                    </ListItem>
                                </StyledLink>
                                <StyledLink activeClassName="Mui-selected" to={`${url}/levels`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Планировка этажей" />
                                    </ListItem>
                                </StyledLink>
                                <StyledLink activeClassName="Mui-selected" to={`${url}/layout`}>
                                    <ListItem button={true}>
                                        <ListItemText primary="Планировка квартир" />
                                    </ListItem>
                                </StyledLink>
                                <ListItem
                                    button
                                    component="a"
                                    href={`${process.env.REACT_APP_URL}/spreadsheets/house/${uuid}`}
                                >
                                    <ListItemText primary="Скачать в csv" />
                                </ListItem>
                                <PublishHouse uuid={uuid} />
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
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant="body2" component="p">
                                                            Название дома
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" component="p">
                                                            {name}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant="body2" component="p">
                                                            Стоимость квартир в доме
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" component="p">
                                                            {price}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant="body2" component="p">
                                                            Парковка
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" component="p">
                                                            {parking ? 'Есть' : 'Нет'}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant="body2" component="p">
                                                            Начало строительства
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" component="p">
                                                            {getDateFromFullString(beginDate)}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <Typography variant="body2" component="p">
                                                            Окончание строительства
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" component="p">
                                                            {getDateFromFullString(endDate)}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <VRImages uuid={uuid} images={images.VR || []} mode={ImageType.VR} />
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Photos uuid={uuid} images={images.PHOTO || []} mode={ImageType.PHOTO} />
                                    </TabPanel>
                                </Route>
                                <Route exact path={`${path}/editor`}>
                                    <HouseEditor />
                                </Route>
                                <Route exact path={`${path}/levels`}>
                                    <LevelLayoutEditor />
                                </Route>
                                <Route exact path={`${path}/layout`}>
                                    <LayoutEditor />
                                </Route>
                                <Route exact path={`${path}/layout/:layoutId/info`}>
                                    <FlatLayouInfo />
                                </Route>
                            </Switch>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
});

export default HouseInfo;
