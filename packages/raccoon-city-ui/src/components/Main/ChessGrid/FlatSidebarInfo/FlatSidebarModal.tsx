import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import Select from '@appgeist/react-select-material-ui';
import {Typography, TextField} from '@material-ui/core';
import {Form, Field} from 'react-final-form';
import {required} from '../../../../utils/validation';
import {FORM_REQUEST_TRADE} from '../../../../graphql/mutations/tradeMutation';
import {useMutation} from '@apollo/react-hooks';
import {withRouter, BrowserRouterProps} from 'react-router-dom';
import {
    Modal,
    ModalContainer,
    InputError,
    ButtonsContainer,
    ModalTitle,
    CustomInput,
    CustomButton,
    StyledCloseIcon
} from './styledComponents';

const optionsValue = [
    {value: 1, label: 'Купить квартиру'},
    {value: 2, label: 'Купить КН'},
    {value: 3, label: 'Документы'},
    {value: 4, label: 'Консультация'}
];

interface FlatModalProps extends BrowserRouterProps {
    open: any;
    close: any;
    flat: any;
    match: any;
}

const FlatSidebarModal = ({open, close, flat, match}: FlatModalProps) => {
    const [makeRequest] = useMutation(FORM_REQUEST_TRADE);

    const onSubmit = async (values) => {
        const flatUpdated = {
            sale: flat.sale,
            price: flat.price,
            squarePrice: flat.squarePrice,
            squarePriceSale: flat.squarePriceSale,
            flatId: flat.id,
            flatNumber: flat.flatNumber,
            section: flat.section,
            level: String(flat.level),
            apartmentComplexId: flat.apartmentComplex.id,
            apartmentComplex: flat.apartmentComplex.name,
            house: flat.house.name,
            houseId: flat.house.id
        };
        await makeRequest({
            variables: {
                flat: flatUpdated,
                userInfo: {...values, developerUuid: match.params.developerUuid}
            }
        });

        open(true);
        close(false);
    };

    return (
        <>
            <ModalContainer>
                <Modal>
                    <Typography>
                        <ModalTitle>оставить заявку</ModalTitle>
                    </Typography>
                    <Form
                        subscription={{invalid: true}}
                        onSubmit={onSubmit}
                        render={({handleSubmit, invalid}) => (
                            <form onSubmit={handleSubmit}>
                                <CustomInput>
                                    <Field name="name" validate={required}>
                                        {({input, meta}) => (
                                            <div>
                                                <TextField
                                                    label="Имя"
                                                    margin="normal"
                                                    fullWidth={true}
                                                    variant="outlined"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <InputError>{meta.error}</InputError>}
                                            </div>
                                        )}
                                    </Field>
                                </CustomInput>
                                <CustomInput>
                                    <Field name="phone" validate={required}>
                                        {({input, meta}) => (
                                            <div>
                                                <MuiPhoneNumber
                                                    fullWidth
                                                    preferredCountries={['ua']}
                                                    regions={'europe'}
                                                    defaultCountry="ua"
                                                    label={'Телефон'}
                                                    variant="outlined"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <InputError>{meta.error}</InputError>}
                                            </div>
                                        )}
                                    </Field>
                                </CustomInput>
                                <CustomInput>
                                    <Field name="type" validate={required}>
                                        {({input, meta}) => (
                                            <div>
                                                <Select
                                                    {...input}
                                                    id="type"
                                                    label="Причина обращения"
                                                    options={optionsValue}
                                                    name={input.name}
                                                    value={input.value}
                                                    onChange={(e) => {
                                                        input.onChange(e); //final-form's onChange
                                                    }}
                                                    isClearable={true}
                                                />
                                                {meta.error && meta.touched && <InputError>{meta.error}</InputError>}
                                            </div>
                                        )}
                                    </Field>
                                </CustomInput>
                                <ButtonsContainer>
                                    <StyledCloseIcon onClick={() => close(false)} />
                                    <CustomButton type="submit" variant="outlined" disabled={invalid}>
                                        Отправить
                                    </CustomButton>
                                </ButtonsContainer>
                            </form>
                        )}
                    />
                </Modal>
            </ModalContainer>
        </>
    );
};

// @ts-ignore
export default withRouter(FlatSidebarModal);
