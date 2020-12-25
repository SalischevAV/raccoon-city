import {useMediaQuery, useTheme, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {AppBreadcrumbs} from '../Breadcrumbs/AppBreadcrumbs';
import UserAvatar from '../UserAvatar/UserAvatar';
import {userInfo} from '../../shared/types/user.types';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));

const StyledAppBar = styled(AppBar)`
    &.MuiAppBar-colorPrimary {
        background-color: #37485c;
    }
`;

const FilterContainer = styled.div`
    margin-left: auto;
`;

interface HeaderProps {
    open: boolean;
    drawerStyles: any;
    userInfo: userInfo;
    handleDrawerOpen: () => void;
}

export const Header = connect((state) => ({
    title: state.route.title
}))(({open, handleDrawerOpen, drawerStyles, userInfo}: HeaderProps & any) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    return (
        <div className={drawerStyles.root}>
            <StyledAppBar
                position="fixed"
                className={clsx(drawerStyles.appBar, {
                    [drawerStyles.appBarShift]: open
                })}
            >
                <Toolbar className={classes.container}>
                    <Box className={classes.container}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(drawerStyles.menuButton, {
                                [drawerStyles.hide]: open
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <AppBreadcrumbs />
                        <FilterContainer id="chessGridFilterContainer" style={{display: matches ? 'block' : 'none'}} />
                    </Box>
                    <UserAvatar userInfo={userInfo} />
                </Toolbar>
            </StyledAppBar>
        </div>
    );
});
