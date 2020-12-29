import React, {Fragment, useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import {Dialog, DialogTitle, DialogActions, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {defaultPic} from './defaultPic';
import {useMutation} from '@apollo/react-hooks';
import {LOGOUT} from '../../../graphql/mutations/authMutation';
import {TOKEN, REFRESH_TOKEN, API_TOKEN} from '../../../core/constants';
import Cookies from 'js-cookie';
import {UserInfoContext} from '../Main';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        marginLeft: '15px'
    }
}));

export default function UserAvatar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const userInfo = useContext(UserInfoContext);
    const [logout, {data, error}] = useMutation(LOGOUT);

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        await logout({
            variables: {key: Cookies.get(TOKEN)}
        });
        Cookies.remove(TOKEN);
        Cookies.remove(REFRESH_TOKEN);
        Cookies.remove(API_TOKEN);
        handleClose();
    };

    if (data) {
        return <Redirect to="/Login" />;
    }

    return (
        <Fragment>
            <Avatar alt={userInfo.name} src={defaultPic} onClick={() => setOpen(true)} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Информация пользователя</DialogTitle>
                <Typography variant="h6" className={classes.title}>
                    Пользователь: {userInfo.name}
                </Typography>
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
