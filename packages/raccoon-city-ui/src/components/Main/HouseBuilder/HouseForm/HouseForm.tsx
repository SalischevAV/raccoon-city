import {useMutation, useQuery} from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {Fragment, useEffect} from 'react';
import {Field, Form} from 'react-final-form';
import {connect} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {CREATE_HOUSE, UPDATE_HOUSE} from '../../../../graphql/mutations/houseMutation';
import {HOUSE_DATA} from '../../../../graphql/queries/houseQuery';
import {setRouteParams, setTitle} from '../../../../redux/actions';
import {StyledLink} from '../../../shared/components/styled';
import {House} from '../../../shared/types/house.types';
import {getHouseDataVariables, HouseFormValues} from './utils';
import {DatePicker} from '@material-ui/pickers';

const required = (value: any) => (value ? undefined : 'Required');

const StyledButton = styled(Button)`
    &.MuiButtonBase-root {
        margin-left: 4px;
    }
`;

const FormContainer = styled.div`
    border: 1px solid #aaa;
`;

const FormBlock = styled.div`
    padding: 16px;
`;

export const HouseCreateForm = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Создание дома');
    }, [params]); // eslint-disable-line
    const [createHouse, {data, loading}] = useMutation(CREATE_HOUSE);
    //@ts-ignore
    const {apartmentComplexUuid, developerUuid} = useParams();

    if (data) {
        return (
            <Redirect to={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/overview/houses`} />
        );
    }

    return (
        <Container maxWidth="md">
            <FormContainer>
                <FormBlock>
                    <Typography variant="h5" gutterBottom={true}>
                        Создание дома
                    </Typography>
                    <HouseForm
                        loading={loading}
                        //When button 'AddSection' will be added remove 'add section' at back/resolvers/house.ts/createHouse
                        onSubmit={async (values) => {
                            await createHouse({
                                variables: {
                                    apartmentComplexId: apartmentComplexUuid,
                                    houseData: getHouseDataVariables(values as HouseFormValues)
                                }
                            });
                        }}
                    />
                </FormBlock>
            </FormContainer>
        </Container>
    );
});

export const HouseEditForm = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Редактирование дома');
    }, [params]); // eslint-disable-line
    const [updateHouse, {data: result, loading: updating}] = useMutation(UPDATE_HOUSE);
    //@ts-ignore
    const {apartmentComplexUuid, houseUuid, developerUuid} = useParams();

    const {loading, error, data} = useQuery<{getHouse: House}>(HOUSE_DATA, {
        fetchPolicy: 'network-only',
        variables: {
            uuid: houseUuid
        }
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error || !data) {
        return <p>Error :(</p>;
    }

    if (result) {
        return (
            <Redirect to={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/overview/houses`} />
        );
    }

    return (
        <Container maxWidth="md">
            <FormContainer>
                <FormBlock>
                    <Typography variant="h5" gutterBottom={true}>
                        Редактирование дома
                    </Typography>
                    <HouseForm
                        values={data?.getHouse}
                        loading={updating}
                        onSubmit={async (values) => {
                            await updateHouse({
                                variables: {
                                    uuid: houseUuid,
                                    houseData: getHouseDataVariables(values as HouseFormValues)
                                }
                            });
                        }}
                    />
                </FormBlock>
            </FormContainer>
        </Container>
    );
});

interface HouseFormProps {
    onSubmit: (values: any) => void;
    loading: boolean;
    values?: any;
}

export function HouseForm(outerProps: HouseFormProps) {
    //@ts-ignore
    const {apartmentComplexUuid, developerUuid} = useParams();
    return (
        <Fragment>
            <Form
                onSubmit={(e) => {}}
                initialValues={{...outerProps.values, parking: outerProps?.values?.parking ? 'true' : 'false'}}
            >
                {({values, invalid, form}) => {
                    return (
                        <Fragment>
                            <Field name="name" validate={required}>
                                {(props) => (
                                    <TextField
                                        label="Название дома"
                                        margin="normal"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                )}
                            </Field>
                            <Field name="price" validate={required}>
                                {(props) => (
                                    <TextField
                                        label="Стоимость квартир в доме"
                                        margin="normal"
                                        inputProps={{min: '0', step: '1'}}
                                        type="number"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                )}
                            </Field>
                            <Field name="order">
                                {(props) => (
                                    <TextField
                                        label="Порядок сортировки"
                                        margin="normal"
                                        inputProps={{min: '0', step: '1'}}
                                        type="number"
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                )}
                            </Field>
                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={12} md={6}>
                                    <Field name="beginDate" validate={required}>
                                        {(props) => (
                                            <DatePicker
                                                views={['year', 'month']}
                                                name={props.input.name}
                                                label="Начало строительства"
                                                value={props.input.value ? props.input.value : null}
                                                margin="normal"
                                                fullWidth={true}
                                                inputVariant="outlined"
                                                onChange={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item={true} xs={12} md={6}>
                                    <Field name="endDate">
                                        {(props) => (
                                            <DatePicker
                                                views={['year', 'month']}
                                                name={props.input.name}
                                                label="Конец строительства"
                                                value={props.input.value ? props.input.value : null}
                                                margin="normal"
                                                fullWidth={true}
                                                inputVariant="outlined"
                                                onChange={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                            </Grid>
                            <Field name="parking" type="radio" defaultValue={'false'} validate={required}>
                                {(props) => {
                                    return (
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Паркова</FormLabel>
                                            <RadioGroup
                                                defaultValue="false"
                                                aria-label="parking"
                                                row={true}
                                                name={props.input.name}
                                                value={values?.parking}
                                                onChange={props.input.onChange}
                                            >
                                                <FormControlLabel value="true" control={<Radio />} label="Есть" />
                                                <FormControlLabel value="false" control={<Radio />} label="Нет" />
                                            </RadioGroup>
                                        </FormControl>
                                    );
                                }}
                            </Field>
                            <Grid container={true} direction="row" spacing={2} justify="flex-end" alignItems="center">
                                <Grid justify="flex-end" container={true} item={true} xs={6}>
                                    <StyledLink
                                        to={`/developers/${developerUuid}/apartmentComplex/${apartmentComplexUuid}/overview/houses`}
                                    >
                                        <StyledButton variant="outlined" size="large">
                                            Отмена
                                        </StyledButton>
                                    </StyledLink>
                                    <StyledButton
                                        disabled={invalid}
                                        onClick={() => {
                                            outerProps.onSubmit(values);
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        {outerProps.loading && <CircularProgress size={30} thickness={5} />}
                                        Далее
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </Fragment>
                    );
                }}
            </Form>
        </Fragment>
    );
}
