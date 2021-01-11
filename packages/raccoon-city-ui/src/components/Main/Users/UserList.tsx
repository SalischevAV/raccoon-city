import {useQuery} from '@apollo/react-hooks';
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {GET_USERS, GET_USER_INFO} from '../../../graphql/queries/userQuery';
import {setRouteParams, setTitle} from '../../../redux/actions';
import {UserForm} from './UserForm';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        marginTop: 16
    },
    editable: {
        cursor: 'pointer'
    }
});

export const UserList = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Пользователи');
    }, [params]); // eslint-disable-line
    const classes = useStyles();
    const {data, loading, error} = useQuery(GET_USERS);
    const {data: userData, loading: userLoading, error: userError} = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-only'
    });

    const {getUserInfo: userInfo} = userData;
    const [openUserForm, setOpenUserForm] = useState(false);
    const [editUser, setEditUser] = useState({});

    const editClickHandler = (user) => {
        setEditUser({...user, developer: user.developer?.id});
        setOpenUserForm(true);
    };
    const createClickHandler = () => {
        setEditUser({});
        setOpenUserForm(true);
    };

    if (loading || userLoading) {
        return <div>Loading...</div>;
    }

    if (error || userError) {
        return null;
    }

    const userList =
        userInfo.role?.key === 'superAdmin'
            ? data.getUsers
            : data.getUsers.filter((item) => item.developer?.id === userInfo.developer.id);

    return (
        <TableContainer component={Paper}>
            <Button variant="outlined" color="primary" onClick={createClickHandler}>
                Создать пользователя
            </Button>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Активен</TableCell>
                        <TableCell align="left">Имя</TableCell>
                        <TableCell align="left">Почта</TableCell>
                        <TableCell align="left">Застройщики</TableCell>
                        <TableCell align="left">Роль</TableCell>
                        <TableCell align="left">Редактировать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={!user.isDeleted} disabled />
                            </TableCell>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user?.developer?.name}</TableCell>
                            <TableCell align="left">{user?.role?.displayName}</TableCell>
                            <TableCell align="left">
                                {
                                    <EditIcon
                                        className={classes.editable}
                                        color="secondary"
                                        onClick={() =>
                                            editClickHandler({...user, role: user.role.id, isDeleted: user.isDeleted})
                                        }
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <UserForm
                openUserForm={openUserForm}
                setOpenUserForm={setOpenUserForm}
                user={editUser}
                userInfo={userInfo}
            />
        </TableContainer>
    );
});

export default UserList;
