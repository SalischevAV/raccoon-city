import {Button, Grid, Paper} from '@material-ui/core';
import React, {useEffect, useState, useCallback} from 'react';
import {PhotoSwipe} from 'react-photoswipe';
import styled from 'styled-components';
import {SidebarFlat} from '../../../../graphql/queries/flatQuery';
import {LinkIcon} from '../../../../icons/LinkIcon';
import {HOUSE_REMAKE} from '../../../../utils/constants';
import {NamedImage} from '../../../shared/types/apartmentComplex.types';
import FlatSidebarModal from './FlatSidebarModal';
import HouseRemakeSidebarModal from './HouseRemakeModal';
import SentHouseRemakeRequestModal from './SentHouseRemakeRequestModal';
import {HRLink} from './styledComponents';

const StyledPaper = styled(Paper)`
    position: relative;
    background-color: transparent;

    .MuiPaper-elevation1 {
        box-shadow: none;
    }

    img {
        width: 100%;
    }
`;

const StyledLink = styled.a`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const CustomPhotoSwipe = styled(PhotoSwipe)`
    width: 80vw;
    height: 80vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .pswp__img {
        width: 100%;
        height: auto;
    }

    .pswp__bg {
        background: rgba(29, 29, 27, 0.9);
    }

    .pswp__caption,
    .pswp__button--share,
    .pswp__button--fs {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        transform: translate(0, 0);
    }
`;

const ButtonsContainer = styled.div`
    position: fixed;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    z-index: 3000;
    display: flex;

    @media only screen and (max-width: 600px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        text-align: center;
        bottom: 100px;

        a {
            width: 100%;
        }
    }
`;

const CustomButton = styled(Button)`
    width: 380px;
    margin: 0 5px !important;
    background-color: #e84f1d !important;
    color: #fff !important;

    @media only screen and (max-width: 600px) {
        width: 100%;
        font-size: 12px !important;
        margin: 5px 0 0 0 !important;
    }
`;

const CustomButtonHouseRemake = styled<any>(CustomButton)`
    position: fixed !important;
    left: 50%;
    top: 11%;
    transform: translateX(-50%);
    z-index: 3002;
    width: 300px;

    @media only screen and (max-width: 600px) {
        top: 17%;
        margin: 0 !important;
    }
`;

interface ImageViewPhotosProps {
    images?: NamedImage[];
    flat: SidebarFlat;
}

export enum OrderModalType {
    ORDER = 'ORDER',
    HOUSE_REMAKE = 'HOUSE_REMAKE',
    FINALE = 'FINALE'
}

export function ImageViewPhotos(props: ImageViewPhotosProps) {
    const [items, setItems] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    const [orderModalType, setOrderModalType] = useState<OrderModalType>(OrderModalType.ORDER);

    useEffect(() => {
        if (!props.images) {
            return;
        }

        setItems(
            props.images.map((image) => {
                return {
                    src: image.downloadUrl,
                    thumbnail: image.downloadUrl,
                    w: 0,
                    h: 0,
                    title: image.name
                };
            })
        );
        // eslint-disable-next-line
    }, []);

    const modals = {
        [OrderModalType.ORDER]: (
            <FlatSidebarModal open={isOrderModalOpen} close={setOrderModalOpen} flat={props.flat} isFullScreen={true} />
        ),
        [OrderModalType.HOUSE_REMAKE]: (
            <HouseRemakeSidebarModal
                open={isOrderModalOpen}
                close={setOrderModalOpen}
                setOrderModalType={setOrderModalType}
            />
        ),
        [OrderModalType.FINALE]: <SentHouseRemakeRequestModal close={setOrderModalOpen} isFullScreen={true} />
    };

    const openOrderModal = useCallback(() => {
        setIsOpen(false);
        setOrderModalType(OrderModalType.ORDER);
        setOrderModalOpen(true);
    }, [setOrderModalType, setOrderModalType]);

    const openHouseRemakeOrderModal = useCallback(() => {
        setIsOpen(false);
        setOrderModalType(OrderModalType.HOUSE_REMAKE);
        setOrderModalOpen(true);
    }, [setOrderModalType, setOrderModalType]);

    return (
        <Grid container spacing={3}>
            {!props.images?.length ? (
                <div>
                    <p>Фото пока отсутствуют.</p>
                    <p>А пока мы готовим для Вас фото, посмотрите другие дизайн-проекты на сайте партнеров:</p>
                    <HRLink>https://houseremake.com.ua/</HRLink>
                </div>
            ) : (
                props.images.map((image: NamedImage, i) => {
                    return (
                        <Grid item key={image.uuid} xs={12}>
                            <StyledPaper
                                onClick={() => {
                                    setSelected(i);
                                    setIsOpen(true);
                                }}
                            >
                                <img src={image.downloadUrl} alt={image.name} />
                                <StyledLink href={HOUSE_REMAKE} target="blank">
                                    <LinkIcon />
                                </StyledLink>
                            </StyledPaper>
                        </Grid>
                    );
                })
            )}

            {isOpen && (
                <div>
                    <CustomButtonHouseRemake variant="contained" onClick={openOrderModal}>
                        Зaбронировать кваритру
                    </CustomButtonHouseRemake>
                    <ButtonsContainer>
                        <CustomButton variant="contained" onClick={openHouseRemakeOrderModal}>
                            Оставить заявку
                        </CustomButton>
                        <a href={HOUSE_REMAKE} target="blank" style={{textDecoration: 'none'}}>
                            <CustomButton variant="contained">Перейти на дизайн студию House Remake</CustomButton>
                        </a>
                    </ButtonsContainer>

                    <CustomPhotoSwipe
                        isOpen={isOpen}
                        items={items}
                        options={{
                            index: selected
                        }}
                        gettingData={(gallery, index, item) => {
                            if (item.w < 1 || item.h < 1) {
                                const img = new Image();
                                img.onload = () => {
                                    item.w = img.naturalWidth;
                                    item.h = img.naturalHeight;

                                    gallery.invalidateCurrItems();
                                    gallery.updateSize(true);
                                };
                                img.src = item.src;
                            }
                        }}
                        onClose={() => {
                            setOrderModalOpen(false);
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
            {isOrderModalOpen && modals[orderModalType]}
        </Grid>
    );
}
