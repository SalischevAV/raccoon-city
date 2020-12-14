import React, {useCallback} from 'react';
import {HOUSE_REMAKE} from '../../../../utils/constants';
import {
    Modal,
    ModalContainer,
    TextWrapper,
    HouseRemakeModalTitle,
    StyledCloseIcon,
    HRLink,
    CloseButton
} from './styledComponents';

export default function SentHouseRemakeRequestModal({close, isFullScreen = false}) {
    const closeModal = useCallback(() => close(false), [close]);

    return (
        <ModalContainer isFullScreen={isFullScreen}>
            <Modal isFullScreen={isFullScreen}>
                <StyledCloseIcon onClick={closeModal} />
                <TextWrapper>
                    <HouseRemakeModalTitle>Спасибо!</HouseRemakeModalTitle>
                    <HouseRemakeModalTitle>Ваша заявка принята</HouseRemakeModalTitle>
                </TextWrapper>
                <TextWrapper>В течение 10 минут с Вами свяжется наш менеджер</TextWrapper>
                <TextWrapper>
                    <span>Перейдите на наш сайт, чтобы узнать больше:</span>
                    <HRLink href={HOUSE_REMAKE} target="blank">
                        https://houseremake.com.ua/
                    </HRLink>
                </TextWrapper>
                <CloseButton onClick={closeModal}>Ок</CloseButton>
            </Modal>
        </ModalContainer>
    );
}
