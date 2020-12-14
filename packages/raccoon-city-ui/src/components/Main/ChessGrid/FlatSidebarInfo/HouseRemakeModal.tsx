import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import {TextField} from '@material-ui/core';
import {Form, Field} from 'react-final-form';
import {required} from '../../../../utils/validation';
import {withRouter} from 'react-router-dom';
import {
    Modal,
    ModalContainer,
    InputError,
    ButtonsContainer,
    CustomInputFullScreen,
    CustomFormFullScreen,
    CustomButton,
    StyledCloseIcon
} from './styledComponents';
import {OrderModalType} from './ImageViewPhotos';
import {FlatSidebarHeader} from './FlatSidebarModal';

const HouseRemakeSidebarModal = ({close, setOrderModalType}) => {
    const modalText = 'на консультацию с главным дизайнером House Remake';

    const onSubmit = async (values) => {
        const houseRemakeCallbackForm = {
            ...values
        };

        await fetch(`${process.env.REACT_APP_URL}/houseremake/handle-form`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(houseRemakeCallbackForm)
        });

        setOrderModalType(OrderModalType.FINALE);
    };

    return (
        <>
            <ModalContainer isFullScreen={true}>
                <Modal isFullScreen={true}>
                    <FlatSidebarHeader isFullScreen={true} modalText={modalText} />
                    <Form
                        subscription={{invalid: true}}
                        onSubmit={onSubmit}
                        render={({handleSubmit, invalid}) => (
                            <CustomFormFullScreen onSubmit={handleSubmit}>
                                <CustomInputFullScreen>
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
                                </CustomInputFullScreen>
                                <CustomInputFullScreen>
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
                                </CustomInputFullScreen>
                                <ButtonsContainer>
                                    <StyledCloseIcon onClick={() => close(false)} />
                                    <CustomButton
                                        type="submit"
                                        variant="outlined"
                                        disabled={invalid}
                                        isFullScreen={true}
                                    >
                                        Отправить
                                    </CustomButton>
                                </ButtonsContainer>
                            </CustomFormFullScreen>
                        )}
                    />
                </Modal>
            </ModalContainer>
        </>
    );
};

// @ts-ignore
export default withRouter(HouseRemakeSidebarModal);
