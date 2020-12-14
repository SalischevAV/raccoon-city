import styled, {css} from 'styled-components';
import {Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const StyledCloseIcon = styled(CloseIcon)`
    position: absolute;
    top: 15px;
    right: 15px;
    color: #e84f1d;
`;

const FullScreenModal = css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    z-index: 3002;
`;

const DefaultModal = css`
    top: 50%;
    right: 3.5%;
    transform: translateY(-50%);
    z-index: 1001;
`;

function getModalStyles(props) {
    return props.isFullScreen ? FullScreenModal : DefaultModal;
}

export const ModalContainer = styled.div<{isFullScreen?: boolean}>`
    position: fixed;
    box-shadow: 2px 2px 10px rgba(1, 1, 1, 0.5);

    ${getModalStyles}

    @media only screen and (max-width: 500px) {
        width: 90%;
    }
`;

export const Modal = styled.div<{isFullScreen?: boolean}>`
    padding: 30px;
    background-color: #fff;
    width: ${({isFullScreen}) => (isFullScreen ? '100%' : '320px')};

    display: flex;
    flex-direction: column;
`;

export const Input = styled.div`
    margin: 30px 0px;
`;

export const InputError = styled.div`
    margin-bottom: -10px;
    padding-top: 5px;
    font-size: 12px;
    color: #e84f1d;
    text-align: center;
`;

export const ButtonsContainer = styled.div`
    display: flex;

    .MuiButton-outlinedPrimary {
        color: #e84f1d;
        border: 1px solid #e84f1d;
    }
`;

export const RecaptchaContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px 0px;
    display: none;
`;

export const ModalTitle = styled.span`
    text-transform: capitalize;
    margin-top: 20px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
`;

// @ts-ignore
export const CustomInput = styled(Input)`
    padding-bottom: 15px;

    .MuiInputBase-root {
        height: 35px;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #e84f1d;
    }

    .MuiOutlinedInput.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #e84f1d;
    }

    .MuiFormLabel-root {
        font-size: 15px;
        color: #000;
    }
    .MuiFormLabel-root.Mui-focused {
        color: #e84f1d;
    }

    .MuiOutlinedInput-notchedOutline {
        border-color: #e84f1d;
    }

    .MuiInputBase-root {
        border-radius: 10px;
        padding: 0;
        border-color: #e84f1d;
    }

    .MuiFormControl-marginNormal {
        margin-top: 0;
        margin-bottom: 0;
    }

    .MuiOutlinedInput-input {
        padding: 8px 15px;
    }

    .MuiInputLabel-formControl {
        top: -25px;
    }

    legend {
        display: none;
    }

    .MuiInputLabel-outlined {
        transform: none;
    }

    .MuiInputLabel-outlined.MuiInputLabel-shrink {
        transform: none;
    }
`;

export const CustomInputFullScreen = styled(CustomInput)`
    width: 40%;
    margin: 20px 0;

    &:first-child {
        margin-right: 20%;
    }

    @media only screen and (max-width: 600px) {
        width: 100%;
        margin: 10px 0;

        &:first-child {
            margin-right: 0;
        }
    }
`;

export const CustomFormFullScreen = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 80%;
    margin: 0 auto;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const SimpleForm = styled.form``;
export const CustomSelectFull = styled(CustomInput)`
    width: 100%;
    margin: 20px 0;
`;

export const CustomButton = styled(Button)<{isFullScreen?: boolean}>`
    width: 100%;
    padding: 5px 0;

    &.MuiButton-root:hover {
        background: #e84f1d;
        color: #fff;
    }
`;
export const TextWrapper = styled.div`
    text-align: center;
    font-weight: 600;
    margin: 10px;
`;

export const MainColorPainter = styled.span`
    color: #e84f1d;
`;

export const HouseRemakeModalTitle = styled.p`
    font-size: 30px;
    text-align: center;
    margin: 0;
    padding: 0;
`;

export const HRLink = styled.a`
    color: #e84f1d;
    padding-left: '5px';
`;

export const CloseButton = styled(Button)`
    display: flex;
    justify-content: center;
    padding-top: 20px;

    .MuiButton-root {
        border: 1px solid #e84f1d;
    }
`;

export const FlatSidebarHeaderContainer = styled.div`
    padding: 0 10%;
    padding-bottom: 30px;

    h3 {
        color: #e84f1d;
        font-size: 30px;
        padding: 0;
        margin: 0;
    }

    p {
        color: #646363;
        font-size: 14px;
        padding: 0;
        margin: 0;
    }
`;
