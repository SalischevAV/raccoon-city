import styled from 'styled-components';
import {Select} from '@material-ui/core';

export const FloorViewContainer = styled.div`
    margin-top: 10px;
    min-height: 75vh;
    border-radius: 4px;
    overflow: hidden;
`;

export const FloorsListContainer = styled.div`
    width: 10%;
    max-height: 70vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    @media only screen and (max-width: 500px) {
        display: none;
    }
`;

export const FloorsListItem = styled.p<{isPublic: boolean; currentLevel: boolean}>`
    width: 100%;
    padding: 5px 0;
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    font-family: 'TTNorms', sans-serif;
    font-weight: 500;

    color: ${({currentLevel}) => (currentLevel ? '#E84F1D' : '#1D1D1B')};

    &:hover {
        color: ${({isPublic}) => (isPublic ? '#E84F1D' : '#3f51b5')};
    }
`;

export const FloorContentContainer = styled.div`
    width: 87%;
    padding: 10px;
    position: relative;

    img {
        width: 100%;
    }

    @media only screen and (max-width: 500px) {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const FloorLegendInfo = styled.div<{isPublic: boolean}>`
    display: flex;
    padding: 10px 35px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    justify-content: ${({isPublic}) => (isPublic ? 'center' : 'space-between')};
    font-family: 'TTNorms', sans-serif;

    @media only screen and (max-width: 500px) {
        flex-direction: column;
        padding: 10px 0;
    }
`;

export const FloorLegendItem = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-family: 'TTNorms', sans-serif;

    span {
        color: #000;
        font-weight: 600;
        padding-left: 5px;
    }
`;

export const FloorLegendIcon = styled.div<{color: string}>`
    width: 15px;
    height: 15px;
    background-color: ${({color}) => color};
    border-radius: 3px;
`;

export const FlatInfo = styled.div`
    padding: 5px 10px;
    border-radius: 10px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    border: 1px solid #000;

    span {
        font-size: 15px;
    }

    @media only screen and (max-width: 1000px) {
        max-width: none;
        width: 100%;

        span {
            font-size: 11px;
        }
    }

    @media only screen and (max-width: 500px) {
        display: none;
    }
`;

export const LevelSelectMobile = styled.div`
    display: none;
    width: 100%;

    @media only screen and (max-width: 500px) {
        display: block;
    }
`;

export const CustomSelect = styled(Select)<{isPublic: boolean}>`
    min-width: 100%;
    border: 2px solid ${({isPublic}) => (isPublic ? '#e84f1d' : '#3f51b5')};
    border-radius: 10px;
`;

export const SelectWrapper = styled.div<{isPublic: boolean}>`
    margin: 5px 0;

    .MuiSelect-root {
        padding: 5px 10px;
    }

    .MuiInput-underline::after {
        content: none !important;
        border-bottom: none !important;
    }

    .MuiInput-underline::before {
        content: none !important;
        border-bottom: none !important;
    }

    svg {
        fill: ${({isPublic}) => (isPublic ? '#e84f1d' : '#3f51b5')};
    }
`;

export const WarningContainer: any = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    text-align: center;
`;

export const WarningContainerColumn = styled(WarningContainer)`
    flex-direction: column;

    img {
        width: auto;
        max-height: 60vh;

        @media (max-width: 750px) {
            width: 100%;
        }
    }
`;

export const FloorContainer = styled.div`
    display: flex;
`;

export const FlatStatusesBarContainer = styled.div`
    position: relative;
    width: 30px;
    margin: 5px auto !important;

    @media (max-width: 750px) {
        margin-right: 10px;
    }
`;

export const StatusesIcon = styled.div`
    position: relative;
    width: 30px;
    height: 30px;

    span {
        position: absolute;
        bottom: -5px;
        right: -5px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1002;
        border-radius: 50%;
        border: 1px solid #e84f1d;
        color: #e84f1d;
        font-size: 10px;
        width: 15px;
        height: 15px;
    }

    &:before,
    &:after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 2px;
    }

    &:before {
        top: 0;
        left: 0;
        z-index: 1001;
        background-color: #4caf50;
    }

    &:after {
        bottom: 0;
        right: 0;
        z-index: 1000;
        background-color: #ffeb3b;
    }
`;

export const StatusesTooltip = styled.div`
    position: absolute;
    top: 15px;
    left: calc(100% + 20px);
    background-color: #fafafa;
    width: 400px;
    padding: 15px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    z-index: 1000;
    visibility: hidden;

    p {
        font-family: 'TTNorms', sans-serif;
        font-size: 14px;
        font-weight: bold;
    }

    ${StatusesIcon}:hover + & {
        visibility: visible;
    }

    @media (max-width: 750px) {
        width: 300px;
        left: 0;
        right: 0;
        top: 40px;
        padding: 15px 8px;
    }
`;
