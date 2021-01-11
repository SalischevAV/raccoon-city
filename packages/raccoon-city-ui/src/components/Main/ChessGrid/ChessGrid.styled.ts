import styled from 'styled-components';
import {SwipeableDrawer, Typography} from '@material-ui/core';
import Select from '@material-ui/core/Select';

export const ChessGridWrapper: any = styled.div`
    box-sizing: border-box;
    margin-top: 20px;

    overflow-x: auto;
    overflow-y: auto;
    white-space: nowrap;
    text-align: center;

    @media only screen and (max-width: 600px) {
        overflow-x: auto;
        background-color: #fff;
    }
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Container = styled.div`
    background-color: #fff;
    display: inline-flex;
    vertical-align: top;
    margin: 0 auto;
`;

export const ColumnAndSectionBarWrapper = styled.div<{isPublic: boolean; mode: string}>`
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    width: auto;
    margin: 0 auto;
    padding: 0 20px;

    @media only screen and (max-width: 900px) {
        justify-content: center;
        flex-direction: column;
    }
`;

export const ColumnTitle = styled(Typography)`
    text-align: center;
    padding: 16px 0;
`;

export const SidebarDrawer = styled(SwipeableDrawer)`
    max-width: 100vw;
    .MuiDrawer-paper {
        max-width: 100%;
    }
`;

export const SelectStyled = styled(Select)`
    margin: 0 20px;
`;

export const MobileInformation = styled.div`
    display: none;

    @media only screen and (max-width: 960px) {
        display: flex;
        justify-content: flex-start;
        min-height: 40px;
        margin-bottom: 5px;
    }
`;

export const InfoIcon = styled.div`
    border: 1px solid #e84f1d;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px auto;

    &::before {
        content: 'i';
        font-size: 15px;
        color: #e84f1d;
    }
`;

export const HouseTitle = styled.div`
    font-size: 20px;
    margin: 0;
    align-self: flex-start;
    @media only screen and (max-width: 600px) {
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 0;
    }
`;

export const ScrollWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 85vh;
`;

export const InfoMobileViewWrapper = styled.div`
    width: 50%;
    border: 1px solid #73859f;
`;

export const CustomSidebarDrawer = styled<any>(SidebarDrawer)`
    .MuiPaper-elevation4 {
        box-shadow: none;
    }

    .MuiAppBar-colorPrimary {
        background-color: transparent;
    }

    .PrivateTabIndicator-colorSecondary-42 {
        background-color: #fff;
    }

    .MuiTabs-flexContainer {
        box-shadow: none;
    }

    .MuiAppBar-root {
        margin-top: 10px;
        padding: 0 18px;
    }

    .MuiTab-root {
        width: 40px;
        height: 40px;
        min-height: 40px;
    }

    .MuiAppBar-root .MuiTouchRipple-root {
        border: 1px solid #000;
        border-radius: 10px;
        margin: 0 5px;
    }

    .MuiAppBar-root .MuiTab-wrapper {
        font-size: 12px;
        color: #000;
    }

    .Mui-selected .MuiTab-wrapper {
        color: #e84f1d;

        svg {
            width: 20px;
        }

        path {
            fill: #e84f1d;
        }
    }

    .Mui-selected .MuiTouchRipple-root {
        border-color: #e84f1d;
    }

    .MuiTabs-indicator {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        .MuiTabs-flexContainer {
            justify-content: center;
        }
    }
`;

export const InternalCustomSidebarDrawer = styled<any>(SidebarDrawer)`
    .MuiAppBar-root .MuiTab-wrapper path {
        fill: #fff;
    }
`;
