import {Grid, TextField} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiPhoneNumber from 'material-ui-phone-number';
import React from 'react';
import {Field, useForm} from 'react-final-form';
import {FieldArray} from 'react-final-form-arrays';
import styled from 'styled-components';
import {isRequired} from '../../../../core/validators/validators';
import {TradeContactList} from './TradeContactList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative'
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        }
    })
);

const ContactFieldsWrapper = styled.div`
    margin-top: 12px;
`;

export function TradeExistingContact(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const formApi = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Выбрать контакт
            </Button>
            <ContactFieldsWrapper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Field name="existingContact.name" validate={isRequired}>
                            {(props) => {
                                return (
                                    <TextField
                                        inputProps={{readOnly: true}}
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth
                                        label="ФИО"
                                        variant="outlined"
                                    />
                                );
                            }}
                        </Field>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="existingContact.position">
                            {(props) => {
                                return (
                                    <TextField
                                        inputProps={{readOnly: true}}
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth
                                        label="Должность"
                                        variant="outlined"
                                    />
                                );
                            }}
                        </Field>
                    </Grid>
                    <Grid item xs={12}>
                        <FieldArray name="existingContact.phones">
                            {({fields}) =>
                                fields.map((name, index) => (
                                    <Grid
                                        container={true}
                                        key={name}
                                        spacing={3}
                                        justify="center"
                                        alignItems="center"
                                        alignContent="center"
                                    >
                                        <Grid item={true} xs={12}>
                                            <Field name={name} validate={isRequired}>
                                                {(props) => (
                                                    <MuiPhoneNumber
                                                        inputProps={{readOnly: true}}
                                                        name={props.input.name}
                                                        value={props.input.value}
                                                        onChange={props.input.onChange}
                                                        fullWidth
                                                        preferredCountries={['ua']}
                                                        regions={'europe'}
                                                        defaultCountry="ua"
                                                        label={`Раб телефон (${index + 1})`}
                                                        variant="outlined"
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </FieldArray>
                    </Grid>
                    <Grid item xs={12}>
                        <Field name="existingContact.email">
                            {(props) => {
                                return (
                                    <TextField
                                        inputProps={{readOnly: true}}
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                    />
                                );
                            }}
                        </Field>
                    </Grid>
                </Grid>
            </ContactFieldsWrapper>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Выберете контакт
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Закрыть
                        </Button>
                    </Toolbar>
                </AppBar>
                <TradeContactList
                    contactSelected={(selectedContact) => {
                        formApi.batch(() => {
                            formApi.change('existingContact', selectedContact);
                        });
                        setOpen(false);
                    }}
                />
            </Dialog>
        </div>
    );
}
