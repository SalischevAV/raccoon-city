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
import {GET_USERS} from '../../../graphql/queries/userQuery';
import {setRouteParams, setTitle} from '../../../redux/actions';
import {UserCreateForm} from './UserCreateForm';
import {UserUpdateForm} from './UserUpdateForm';
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
    const [openUserCreateForm, setOpenUserCreateForm] = useState(false);
    const [openUserEditForm, setOpenUserEditForm] = useState(false);
    const [editUser, setEditUser] = useState({});

    const editClickHandler = (user) => {
        setEditUser(user);
        setOpenUserEditForm(true);
    };

    if (loading || error) {
        return null;
    }

    return (
        <TableContainer component={Paper}>
            <Button variant="outlined" color="primary" onClick={() => setOpenUserCreateForm(true)}>
                Создать пользователя
            </Button>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Активен</TableCell>
                        <TableCell align="left">Имя</TableCell>
                        <TableCell align="left">Почта</TableCell>
                        <TableCell align="left">Роль</TableCell>
                        <TableCell align="left">Редактировать</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.getUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={!user.isDeleted} disabled />
                            </TableCell>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user?.role?.displayName}</TableCell>
                            <TableCell align="left">
                                {
                                    <EditIcon
                                        className={classes.editable}
                                        color="secondary"
                                        onClick={() =>
                                            editClickHandler({...user, role: user.role.id, isDeleted: user.isDeletedd})
                                        }
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <UserCreateForm openUserCreateForm={openUserCreateForm} setOpenUserCreateForm={setOpenUserCreateForm} />
            <UserUpdateForm
                openUserEditForm={openUserEditForm}
                setOpenUserEditForm={setOpenUserEditForm}
                user={editUser}
            />
        </TableContainer>
    );
});

export default UserList;
