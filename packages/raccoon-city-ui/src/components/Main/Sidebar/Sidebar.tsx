import {useTheme} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AppsIcon from '@material-ui/icons/Apps';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HistoryIcon from '@material-ui/icons/History';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import clsx from 'clsx';
import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {FEATURES} from '../../../core/constants/features';
import {Feature} from '../../shared/components/features/Feature';
import {StyledLink} from '../../shared/components/styled';
import {withTooltip} from './../../HOC/withTooltip';

interface SidebarProps {
    open: boolean;
    drawerStyles: any;
    handleDrawerClose: () => void;
    params?: any;
}

const StyledDrawer = styled(Drawer)`
    .MuiPaper-root {
        color: #fff;
        background-color: #37485c;
    }

    .MuiListItemIcon-root,
    .MuiSvgIcon-root {
        color: #fff;
    }
`;
export const Sidebar = connect((state) => ({
    params: state.route.params
}))(({open, handleDrawerClose, drawerStyles, params}: SidebarProps) => {
    const theme = useTheme();
    const {developerUuid, houseUuid, apartmentComplexUuid} = params || {};

    return (
        <StyledDrawer
            variant="permanent"
            className={clsx(drawerStyles.drawer, {
                [drawerStyles.drawerOpen]: open,
                [drawerStyles.drawerClose]: !open
            })}
            classes={{
                paper: clsx({
                    [drawerStyles.drawerOpen]: open,
                    [drawerStyles.drawerClose]: !open
                })
            }}
            open={open}
        >
            <div className={drawerStyles.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <StyledLink to="/">
                    <ListItem button>
                        <ListItemIcon>{<BusinessCenterIcon />}</ListItemIcon>
                        <ListItemText primary="Застройщики" />
                    </ListItem>
                </StyledLink>
                {developerUuid && (
                    <StyledLink to={`/developers/${developerUuid}/chessgrid`}>
                        <ListItem button>
                            <ListItemIcon>{<AppsIcon />}</ListItemIcon>
                            <ListItemText primary="Шахматка" />
                        </ListItem>
                    </StyledLink>
                )}
                {houseUuid && apartmentComplexUuid && (
                    <StyledLink
                        to={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/houseGrid/${houseUuid}`}
                    >
                        <ListItem button>
                            <ListItemIcon>{<HomeWorkIcon />}</ListItemIcon>
                            <ListItemText primary="Шахматка дома" />
                        </ListItem>
                    </StyledLink>
                )}
                {developerUuid && (
                    <StyledLink to={`/developers/${developerUuid}/apartmentComplexes`}>
                        <ListItem button>
                            <ListItemIcon>{<ApartmentIcon />}</ListItemIcon>
                            <ListItemText primary="ЖК" />
                        </ListItem>
                    </StyledLink>
                )}
                {developerUuid && (
                    <Feature features={[FEATURES.CONTACTS]}>
                        <StyledLink to={`/developers/${developerUuid}/contacts`}>
                            <ListItem button>
                                <ListItemIcon>{<PeopleAltIcon />}</ListItemIcon>
                                <ListItemText primary="Клиенты" />
                            </ListItem>
                        </StyledLink>
                    </Feature>
                )}
                {developerUuid && (
                    <Feature features={[FEATURES.TRADES]}>
                        <StyledLink to={`/developers/${developerUuid}/trades`}>
                            <ListItem button>
                                <ListItemIcon>{<MonetizationOnIcon />}</ListItemIcon>
                                <ListItemText primary="Сделки" />
                            </ListItem>
                        </StyledLink>
                    </Feature>
                )}
                <Feature features={[FEATURES.VIEW_USER]}>
                    {withTooltip(
                        <StyledLink to="/users">
                            <ListItem button>
                                <ListItemIcon>{<BorderColorIcon />}</ListItemIcon>
                                <ListItemText primary="Управление пользователями" />
                            </ListItem>
                        </StyledLink>,
                        'Управление пользователями'
                    )}
                </Feature>
                {developerUuid && (
                    <Feature features={[FEATURES.HISTORY]}>
                        <StyledLink to={`/developers/${developerUuid}/history`}>
                            <ListItem button>
                                <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
                                <ListItemText primary="История" />
                            </ListItem>
                        </StyledLink>
                    </Feature>
                )}
            </List>
            <Divider />
        </StyledDrawer>
    );
});
