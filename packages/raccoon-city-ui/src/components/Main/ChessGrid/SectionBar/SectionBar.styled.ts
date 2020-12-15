import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

export const SectionBarContainer = styled.div<{isSideBarOpen: boolean}>`
    max-height: 80vh;
    width: 487px;
    margin-left: 30px;

    .MuiBox-root-20 {
        padding: 0 !important;
    }

    @media only screen and (max-width: 960px) {
        display: ${({isSideBarOpen}) => (isSideBarOpen ? 'block' : 'none')};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 10px;
        background-color: #fff;
        width: 100vw;
        z-index: 2000;
        max-height: none;
        height: 100vh;
        overflow-y: auto;
        margin-left: 0;
    }

    .MuiTab-textColorInherit {
        padding: 0 23px;
    }

    .MuiTab-root {
        width: auto;
    }
`;

export const SliderContainer = styled.div`
    position: relative;

    .MuiSvgIcon-root {
        fill: #fff;
    }
`;

export const CustomSlider = styled(Carousel)<{isEmptyOrSingle: boolean}>`
    display: flex;
    width: 487px;
    margin-bottom: 10px;
    position: relative;
    border: none;
    outline: none;

    img {
        width: 487px;
        height: 364px;
        border-radius: 10px;
    }

    .rec-slider-container {
        margin: 0;
    }

    .rec-arrow {
        background-color: #e84f1d;
        color: #fff;
        height: 35px;
        width: 35px;
        min-width: 35px;
        line-height: 35px;
        position: absolute;
        bottom: 0;
        z-index: 1000;
        border-radius: 0;
        display: ${({isEmptyOrSingle}) => (isEmptyOrSingle ? 'none' : 'block')};
    }

    .rec-arrow:disabled:hover {
        background-color: #e84f1d;
    }

    .rec-arrow:enabled {
        background-color: #e84f1d;
    }

    .rec-arrow:enabled:hover {
        background-color: #e84f1d;
    }

    .rec-arrow-right {
        right: 0;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
    }

    .rec-arrow-left {
        left: 0;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    @media only screen and (max-width: 600px) {
        margin-bottom: 10px;
        width: 100%;

        img {
            width: 100%;
            height: 200px;
        }
    }
`;

export const SideBarImage = styled.img`
    width: 100%;
    height: 297px;
    border-radius: 10px;
    margin: 5px 0;

    @media only screen and (max-width: 600px) {
        height: 247px;
    }
`;

export const SideBarVRImage = styled<any>(SideBarImage)`
    cursor: pointer;
`;

export const TabPanelContainer = styled.div`
    .MuiBox-root {
        padding: 0;
    }

    .MuiTypography-root {
        max-height: 75%;
        overflow-y: auto;
    }

    .MuiTableCell-root {
        padding: 16px 0;
    }

    @media only screen and (max-width: 600px) {
        margin-top: 5px;

        .MuiBox-root {
            width: 100%;
        }

        .MuiTableCell-root {
            padding: 5px 0;
        }
    }
`;

export const AppBarContainer = styled.div`
    margin: 10px 0;

    .MuiAppBar-root {
        border-radius: 10px;
    }

    .MuiTabs-indicator {
        display: none;
    }

    .Mui-selected {
        color: #e84f1d;
        border-right: 1px solid rgba(100, 99, 99, 0.2);
    }

    .MuiTab-root {
        border-right: 1px solid rgba(100, 99, 99, 0.2);
    }

    .MuiTab-root:last-child {
        border-right: none;
    }

    .MuiTab-textColorInherit {
        opacity: 1;
    }
`;

export const CloseBarContainer = styled.div`
    display: none;
    justify-content: flex-end;
    margin-top: 10px;

    .MuiSvgIcon-root {
        fill: #e84f1d;
        font-size: 30px;
    }

    @media only screen and (max-width: 600px) {
        display: flex;
    }
`;
