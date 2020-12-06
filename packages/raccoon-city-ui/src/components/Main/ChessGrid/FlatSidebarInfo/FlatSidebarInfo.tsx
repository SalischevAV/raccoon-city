import {useQuery} from '@apollo/react-hooks';
import {AppBar, Button, Chip, Tab, Tabs, Typography} from '@material-ui/core';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import React from 'react';
import styled from 'styled-components';
import {
    GET_FLAT_SIDEBAR_DATA,
    GET_PUBLIC_FLAT_SIDEBAR_DATA,
    GetFlatSidebarDataQuery
} from '../../../../graphql/queries/flatQuery';
import {TabPanel} from '../../../shared/components/tabs/TabPanel';
import {ImageType} from '../../../shared/types/apartmentComplex.types';
import {Flat} from '../../../shared/types/flat.types';
import {ChessCellViewMode} from '../ChessEnums';
import {FlatSidebarData} from './FlatSidebarData';
import FlatSidebarModal from './FlatSidebarModal';
import {FlatSidebarSkeleton} from './FlatSidebarSkeleton/FlatSidebarSkeleton';
import {ImageViewPhotos} from './ImageViewPhotos';
import {ImageViewVR} from './ImageViewVR';
import {LayoutView} from './LayoutView';
import {SidebarPdfInfo} from './SidebarPdfInfo';
import SentTradeRequestModal from './SentTradeRequestModal';

import {defaultFlatPicture} from './SvgImages';
import {GET_USER_INFO} from '../../../../graphql/queries/userQuery';
import {InformationIcon} from '../../../../icons/InformationIcon';
import {AroundIcon} from '../../../../icons/AroundIcon';
import {PlayIcon} from '../../../../icons/PlayIcon';
import {PrintIсon} from '../../../../icons/PrintIсon';
import {GallaryIcon} from '../../../../icons/GaleryIcon';
import {withTooltip} from '../../../HOC/withTooltip';
interface FlatSidebarInfoProps {
    flat: Flat;
    houseId: string;
    viewMode: ChessCellViewMode;
    isPublic: boolean;
    showRequestButton: boolean;
    onFlatSelected?: (flat: Flat) => void;
    currentLevel?: string;
    setSavedFlat: any;
}

const FlatSidebarWrapper = styled.div`
    padding: 16px;
    width: 420px;
    max-width: 100vw;
`;

const ImageContainer = styled.div`
    max-width: 420px;
    .FlatSidebarInfo__image {
        width: 100%;
    }
`;

const FlatTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SaleChip = styled(Chip)`
    font-weight: bold;
    border-radius: 0 !important;
`;

const SendRequestContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 0px 15px;
`;

const StyledTab = styled(Tab)`
    min-width: 48px !important;
`;

const StyledPrintTab = styled<any>(StyledTab)`
    margin-left: auto !important;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;

    .MuiButton-outlinedPrimary {
        color: #e84f1d;
        border: 1px solid #e84f1d;
    }

    .MuiButton-outlinedPrimary:hover {
        border-color: #e84f1d;
    }

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

// @ts-ignore
export const ButtonsContainerMobile = styled(ButtonsContainer)`
    margin-top: 10px;

    @media only screen and (max-width: 600px) {
        display: block;
    }

    @media only screen and (min-width: 600px) {
        display: none;
    }
`;

export function FlatSidebarInfo(props: FlatSidebarInfoProps) {
    const {data, loading, error} = useQuery<GetFlatSidebarDataQuery>(
        props.isPublic ? GET_PUBLIC_FLAT_SIDEBAR_DATA : GET_FLAT_SIDEBAR_DATA,
        {
            variables: {
                flatId: props.flat.id
            },
            fetchPolicy: 'cache-and-network'
        }
    );
    const [value, setValue] = React.useState(0);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const {data: user, loading: userLoading} = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-and-network',
        skip: props.isPublic
    });

    const {showRequestButton} = props;
    let isShowButton = showRequestButton;
    if (isShowButton === undefined) {
        isShowButton = true;
    }

    if (loading || !data) {
        return <FlatSidebarSkeleton />;
    }

    if (error) {
        return <span>error</span>;
    }

    if (userLoading) {
        return <span>Loading...</span>;
    }

    const userInfo = !user?.getUserInfo
        ? null
        : {
              name: user.getUserInfo?.name,
              role: user.getUserInfo?.role
          };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const flat = data.getFlatSidebarInfo;
    const hasImages = flat?.layout?.images;
    const hasVR = Boolean(hasImages && hasImages.VR?.length);
    const hasHalfVR = Boolean(hasImages && hasImages.HALF_VR?.length);

    const hasLevelsPhoto = Boolean(flat?.levelLayouts);

    const ButtonView = (
        <SendRequestContainer>
            <Button variant="outlined" color="primary" onClick={() => setModalOpen(!isModalOpen)}>
                Оставить заявку
            </Button>
        </SendRequestContainer>
    );

    return (
        <FlatSidebarWrapper>
            <FlatTitleContainer>
                <Typography variant="h5" gutterBottom>
                    Квартира № {flat.flatNumber}
                </Typography>
                {!!flat.squarePriceSale && <SaleChip label="Акция" color="secondary" />}
            </FlatTitleContainer>
            {props.onFlatSelected && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        // @ts-ignore
                        props.onFlatSelected(flat);
                    }}
                >
                    Выбрать квартиру
                </Button>
            )}
            <ImageContainer>
                {!!flat.layout ? (
                    <img
                        className="FlatSidebarInfo__image"
                        src={flat.layout?.image.previewImageUrl}
                        alt={flat.layout?.name}
                    />
                ) : (
                    defaultFlatPicture
                )}
            </ImageContainer>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable prevent tabs example"
                >
                    {withTooltip(<StyledTab icon={<InformationIcon />} aria-label="phone" />, 'Информация', false)}
                    {withTooltip(
                        <StyledTab disabled={!hasVR} icon={<AroundIcon />} aria-label="3d" />,
                        '3D фото',
                        false
                    )}
                    {withTooltip(
                        <StyledTab disabled={!hasHalfVR} icon={<ThreeSixtyIcon />} aria-label="2d" />,
                        '2D фото',
                        false
                    )}
                    {withTooltip(<StyledTab icon={<GallaryIcon />} aria-label="gallery" />, 'Фото', false)}
                    {withTooltip(
                        <StyledTab disabled={!hasLevelsPhoto} icon={<PlayIcon />} aria-label="layout" />,
                        'Этаж',
                        false
                    )}
                    {withTooltip(
                        <StyledPrintTab disabled={!flat} icon={<PrintIсon />} aria-label="print" />,
                        'Распечатать инофрмацию',
                        false
                    )}
                </Tabs>
            </AppBar>

            {isShowButton && props.isPublic && <ButtonsContainerMobile>{ButtonView}</ButtonsContainerMobile>}

            <TabPanel value={value} index={0}>
                {value === 0 && (
                    <FlatSidebarData
                        houseId={props.houseId}
                        flat={flat}
                        viewMode={props.viewMode}
                        currentLevel={props.currentLevel}
                        setSavedFlat={props.setSavedFlat}
                        isPublic={props.isPublic}
                    />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {value === 1 && <ImageViewVR images={flat.layout?.images?.VR} mode={ImageType.VR} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {value === 2 && <ImageViewVR images={flat.layout?.images?.HALF_VR} mode={ImageType.HALF_VR} />}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {value === 3 && <ImageViewPhotos images={flat.layout?.images?.PHOTO} />}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {value === 4 && <LayoutView levelLayouts={flat.levelLayouts} />}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {value === 5 && <SidebarPdfInfo userInfo={userInfo} flat={flat} />}
            </TabPanel>

            {isModalOpen && <FlatSidebarModal flat={flat} close={setModalOpen} open={setModal} />}
            {modal && <SentTradeRequestModal close={setModal} />}
            {isShowButton && props.isPublic && <ButtonsContainer>{ButtonView}</ButtonsContainer>}
        </FlatSidebarWrapper>
    );
}
