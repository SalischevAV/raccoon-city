import {useMutation, useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, {Fragment, useCallback} from 'react';
import {Field, Form} from 'react-final-form';
import {isEmail} from '../../../core/validators/validators';
import {UPDATE_USER, CREATE_USER} from '../../../graphql/mutations/authMutation';
import {GET_ROLES, GET_USERS} from '../../../graphql/queries/userQuery';
import {GET_DEVELOPERS} from '../../../graphql/queries/developerQuery';
import {MenuItem} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {UserFormValues, getUserDataVariables, isEmpty} from './utils';
import {
    validateConfirmPassword,
    validatePasswordFinalForm as validatePassword,
    isRequired
} from '../../../core/validators/validators';
import {role} from '../../shared/types/user.types';
import {Developer} from '../../shared/types/developer.type';
import {userInfo} from '../../shared/types/user.types';

export const FormBlock = styled.div`
    padding: 16px;
`;

export interface IUserFormIncomeProps {
    openUserForm: boolean;
    setOpenUserForm: (boolean) => void;
    user: any;
    userInfo: userInfo;
}

export const UserForm = ({openUserForm: open, setOpenUserForm: setOpen, user, userInfo}: IUserFormIncomeProps) => {
    const {data, loading, error} = useQuery(GET_ROLES);
    const {data: developerData, loading: developerLoading, error: developerError} = useQuery(GET_DEVELOPERS);
    const [updateUser] = useMutation(UPDATE_USER);
    const [createUser] = useMutation(CREATE_USER);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    if (loading || developerLoading) {
        return <div>Loading...</div>;
    }

    if (error || developerError) {
        return null;
    }

    const rolesList =
        userInfo.role.key === 'superAdmin'
            ? data.userRoles
            : data.userRoles.filter((role) => role.key !== 'superAdmin');

    const developersList =
        userInfo.role.key === 'superAdmin'
            ? developerData.getDevelopers
            : developerData.getDevelopers.filter((developer) => developer.id === userInfo.developer.id);

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {isEmpty(user) ? 'Создание пользователя' : 'Редактирование пользователя'}
            </DialogTitle>
            <Form
                onSubmit={(e) => {}}
                initialValues={
                    user
                        ? {
                              ...user,
                              isDeleted: user.isDeleted ? 'true' : 'false'
                          }
                        : null
                }
            >
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
                                        {isEmpty(user) && (
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
                                        )}
                                        {isEmpty(user) && (
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
                                        )}
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
                                                            {developersList.map((item: Developer) => {
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
                                                            {rolesList.map((item: role) => {
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
                                    {!isEmpty(user) && (
                                        <Grid item={true} xs={12} md={6}>
                                            <Field name="isDeleted" type="radio" validate={isRequired}>
                                                {(props) => {
                                                    return (
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">
                                                                Пользователь активен
                                                            </FormLabel>
                                                            <RadioGroup
                                                                defaultValue={user.isDeleted ? 'true' : 'false'}
                                                                aria-label="isDeleted"
                                                                row={true}
                                                                name={props.input.name}
                                                                value={values?.isDeleted}
                                                                onChange={props.input.onChange}
                                                            >
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio />}
                                                                    label="Отключен"
                                                                />
                                                                <FormControlLabel
                                                                    value="false"
                                                                    control={<Radio />}
                                                                    label="Активен"
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    );
                                                }}
                                            </Field>
                                        </Grid>
                                    )}
                                </FormBlock>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                {!isEmpty(user) && (
                                    <Button
                                        disabled={invalid}
                                        onClick={async () => {
                                            const {__typename, ...userData} = values;
                                            await updateUser({
                                                variables: {
                                                    userData: getUserDataVariables(userData as UserFormValues)
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
                                        Сохранить
                                    </Button>
                                )}
                                {isEmpty(user) && (
                                    <Button
                                        disabled={invalid}
                                        onClick={async () => {
                                            const {passwordConfirm, isDeleted, ...userData} = values;
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
                                )}
                            </DialogActions>
                        </Fragment>
                    );
                }}
            </Form>
        </Dialog>
    );
};
