import {useMutation, useQuery} from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, {Fragment} from 'react';
import {Field, Form} from 'react-final-form';
import styled from 'styled-components';
import {isEmail} from '../../../core/validators/validators';
import {CREATE_USER} from '../../../graphql/mutations/authMutation';
import {GET_ROLES, GET_USERS} from '../../../graphql/queries/userQuery';
import {MenuItem} from '@material-ui/core';
import {
    validateConfirmPassword,
    validatePasswordFinalForm as validatePassword,
    isRequired
} from '../../../core/validators/validators';
import {GET_DEVELOPERS} from '../../../graphql/queries/developerQuery';
import {role} from '../../shared/types/user.types';
import {Developer} from '../../shared/types/developer.type';

export const FormBlock = styled.div`
    padding: 16px;
`;
// export const required = (value: any) => (value ? undefined : 'Required');

export const UserCreateForm = ({openUserCreateForm: open, setOpenUserCreateForm: setOpen}) => {
    const {data, loading, error} = useQuery(GET_ROLES);
    const {data: developerData, loading: developerLoading, error: developerError} = useQuery(GET_DEVELOPERS);
    const [createUser] = useMutation(CREATE_USER);

    if (loading || error || developerLoading || developerError) {
        return null;
    }

    //TO DO useCallback
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Создание пользователя</DialogTitle>
            <Form onSubmit={(e) => {}}>
                {({values, invalid, form, errors}) => {
                    return (
                        <Fragment>
                            <DialogContent>
                                <FormBlock>
                                    <Grid container={true} spacing={3}>
                                        <Grid item={true} xs={12} md={6}>
                                            <Field name="name" validate={isRequired}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            label="Имя"
                                                            margin="normal"
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <Field name="email" validate={isEmail}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            label="Почта"
                                                            margin="normal"
                                                            type="email"
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <Field name="password" validate={validatePassword}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            label="Пароль"
                                                            margin="normal"
                                                            type="password"
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <Field name="passwordConfirm" validate={validateConfirmPassword}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            label="Подтвердите пароль"
                                                            margin="normal"
                                                            type="password"
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Field name="developer" validate={isRequired}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            select
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            label="Застройщики"
                                                            margin="normal"
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        >
                                                            {developerData.getDevelopers.map((item: Developer) => {
                                                                return (
                                                                    <MenuItem key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </TextField>
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Field name="role" validate={isRequired}>
                                                {(props) => {
                                                    return (
                                                        <TextField
                                                            select
                                                            name={props.input.name}
                                                            value={props.input.value}
                                                            onChange={props.input.onChange}
                                                            label="Роль"
                                                            margin="normal"
                                                            fullWidth={true}
                                                            variant="outlined"
                                                        >
                                                            {data.userRoles.map((item: role) => {
                                                                return (
                                                                    <MenuItem key={item.key} value={item.id}>
                                                                        {item.displayName}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                        </TextField>
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </FormBlock>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    disabled={invalid}
                                    onClick={async () => {
                                        const {passwordConfirm, ...userData} = values;
                                        await createUser({
                                            variables: {
                                                userData
                                            },
                                            refetchQueries: [
                                                {
                                                    query: GET_USERS
                                                }
                                            ]
                                        });
                                        handleClose();
                                    }}
                                    color="primary"
                                >
                                    Создать
                                </Button>
                            </DialogActions>
                        </Fragment>
                    );
                }}
            </Form>
        </Dialog>
    );
};
