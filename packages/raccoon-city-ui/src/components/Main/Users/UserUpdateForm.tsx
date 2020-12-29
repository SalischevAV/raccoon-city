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
import {isEmail} from '../../../core/validators/validators';
import {UPDATE_USER} from '../../../graphql/mutations/authMutation';
import {GET_ROLES, GET_USERS} from '../../../graphql/queries/userQuery';
import {MenuItem} from '@material-ui/core';
import {FormBlock} from './UserCreateForm';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {UserFormValues, getUserDataVariables} from './utils';
import {isRequired} from '../../../core/validators/validators';

export const UserUpdateForm = ({openUserEditForm: open, setOpenUserEditForm: setOpen, user}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const {data, loading, error} = useQuery(GET_ROLES);
    const [updateUser] = useMutation(UPDATE_USER);

    if (loading || error) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Редактирование пользователя</DialogTitle>
            <Form onSubmit={(e) => {}} initialValues={{...user}}>
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
                                                            {data.userRoles.map((item: any) => {
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
                                    <Grid item={true} xs={12} md={6}>
                                        <Field name="isDeleted" type="radio" validate={isRequired}>
                                            {(props) => {
                                                return (
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">Пользователь активен</FormLabel>
                                                        <RadioGroup
                                                            defaultValue={user.isDeleted}
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
                                </FormBlock>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
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
                            </DialogActions>
                        </Fragment>
                    );
                }}
            </Form>
        </Dialog>
    );
};
