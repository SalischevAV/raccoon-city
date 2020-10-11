import React, {useState} from 'react';
import styled from 'styled-components';
import MuiPhoneNumber from 'material-ui-phone-number';
import Recaptcha from 'react-recaptcha';
import {Typography, TextField, Button} from '@material-ui/core';
import {Form, Field} from 'react-final-form';
import {required} from '../../../../utils/validation';
import {FORM_REQUEST_TRADE} from '../../../../graphql/mutations/tradeMutation';
import {useMutation} from '@apollo/react-hooks';
import {withRouter, BrowserRouterProps} from 'react-router-dom';

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001px;
`;

const Modal = styled.div`
    padding: 30px;
    background-color: #fff;
    width: 450px;
`;

export const Input = styled.div`
    margin: 30px 0px;
`;

export const InputError = styled.div`
    margin-bottom: -10px;
    padding-top: 5px;
    font-size: 12px;
    color: #d73c2a;
    text-align: center;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    button {
        margin-left: 20px;
    }
`;

export const RecaptchaContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0px;
`;

export const ModalTitle = styled.span`
    text-transform: capitalize;
`;

interface FlatModalProps extends BrowserRouterProps {
    close: any;
    flat: any;
    match: any;
}

const FlatSidebarModal = ({close, flat, match}: FlatModalProps) => {
    const [isVerify, setVerify] = useState(false);

    const [makeRequest] = useMutation(FORM_REQUEST_TRADE);

    const onSubmit = async (values) => {
        const flatUpdated = {
            sale: flat.sale,
            price: flat.price,
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

        close(false);
    };

    const verifyCallback = () => {
        setVerify(true);
    };

    return (
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
                            <Input>
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
                            </Input>
                            <Input>
                                <Field name="email" validate={required}>
                                    {({input, meta}) => (
                                        <div>
                                            <TextField
                                                label="Email"
                                                margin="normal"
                                                fullWidth={true}
                                                variant="outlined"
                                                {...input}
                                            />
                                            {meta.error && meta.touched && <InputError>{meta.error}</InputError>}
                                        </div>
                                    )}
                                </Field>
                            </Input>
                            <Input>
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
                            </Input>
                            <RecaptchaContainer>
                                <Recaptcha
                                    sitekey={`${process.env.REACT_APP_SITE_KEY}`}
                                    render="explicit"
                                    verifyCallback={verifyCallback}
                                />
                            </RecaptchaContainer>
                            <ButtonsContainer>
                                <Button variant="outlined" color="primary" onClick={() => close(false)}>
                                    Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    disabled={invalid || !isVerify}
                                >
                                    Отправить
                                </Button>
                            </ButtonsContainer>
                        </form>
                    )}
                />
            </Modal>
        </ModalContainer>
    );
};

// @ts-ignore
export default withRouter(FlatSidebarModal);