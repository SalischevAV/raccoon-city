import React, {useEffect} from 'react';
import {Modal, ModalContainer, TextWrapper, MainColorPainter, StyledCloseIcon} from './styledComponents';

export default function SentTradeRequestModal({close, isFullScreen = false}) {
    useEffect(() => {
        setTimeout(() => close(false), 2500);
    }, [close]);

    return (
        <ModalContainer isFullScreen={isFullScreen}>
            <Modal isFullScreen={isFullScreen}>
                <StyledCloseIcon onClick={() => close(false)} />
                <TextWrapper>
                    <MainColorPainter>Спасибо!</MainColorPainter>
                </TextWrapper>
                <TextWrapper>Ваша заявка принята!</TextWrapper>
                <TextWrapper>В течение 10 минут с Вами свяжется наш менеджер</TextWrapper>
            </Modal>
        </ModalContainer>
    );
}
