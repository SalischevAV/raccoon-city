import React, {Fragment, useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {Dialog, DialogTitle, DialogActions, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {defaultPic} from '../../../utils/constants';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {LOGOUT} from '../../../graphql/mutations/authMutation';
import {GET_USER_INFO} from '../../../graphql/queries/userQuery';
import {TOKEN, REFRESH_TOKEN, API_TOKEN} from '../../../core/constants';
import Cookies from 'js-cookie';

function clearCookie() {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(API_TOKEN);
}

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        marginLeft: '15px'
    }
}));

export default function UserAvatar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {data: userData, loading: userLoading, client} = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-only'
    });
    const [logout, {data, error}] = useMutation(LOGOUT);

    const {getUserInfo: userInfo} = userData;

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        await logout({
            variables: {key: Cookies.get(TOKEN)}
        });
        clearCookie();
        client.resetStore();
    };

    if (data) {
        return <Redirect to="/Login" />;
    }

    if (userLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            <Avatar alt={userInfo.name} src={defaultPic} onClick={() => setOpen(true)} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Информация пользователя</DialogTitle>
                <Typography variant="h6" className={classes.title}>
                    Пользователь: {userInfo.name}
                </Typography>
                {userInfo.role.key !== 'superAdmin' && (
                    <Typography variant="h6" className={classes.title}>
                        Застройщик: {userInfo.developer?.name}
                    </Typography>
                )}
                <Typography variant="h6" className={classes.title}>
                    Роль: {userInfo.role.displayName}
                </Typography>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
