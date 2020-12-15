import styled, {css} from 'styled-components';
import {Badge, Theme, withStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {ChessCellViewMode} from '../ChessEnums';

const TileView = css`
    width: 56px;
    height: 56px;
`;

const TileViewMobile = css`
    width: 35px;
    height: 35px;
`;

const TileViewPlus = css`
    width: 202px;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
`;

const getCellView = (props) => {
    switch (props.viewMode) {
        case ChessCellViewMode.TILE:
            return TileView;
        case ChessCellViewMode.TILE_PLUS:
            return TileViewPlus;
        default:
            return TileView;
    }
};

export const CellInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

// @ts-ignore
export const CellInfoWrapperTop = styled(CellInfoWrapper)`
    margin-bottom: 10px;
`;

export const FirstInfoItem = styled.span`
    padding: 0 2px;
`;

export const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#fff',
        color: '#000',
        padding: '8px',
        boxShadow: theme.shadows[3]
    }
}))(Tooltip);

export const Cell = styled.div<{viewMode?: string}>`
    color: #fff;
    background-color: #3ab71e;
    font-weight: 500;
    border-radius: 5px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    width: 145px;
    height: auto;
    padding: 5px;

    ${getCellView}

    @media (max-width: 889px) {
        width: 72px;
        height: 72px;
    }

    &:hover {
        cursor: pointer;
    }

    @media only screen and (max-width: 960px) {
        ${TileViewMobile}
    }

    &.MUTED {
        background-color: #9e9e9e;
        &:hover {
            background-color: #e0e0e0;
        }
        color: #000;
    }

    &.SOLD_OUT {
        background-color: #e84f1d;
        &:hover {
            background-color: #e57373;
        }
    }

    &.FREE {
        background-color: #4caf50;
        &:hover {
            background-color: #66bb6a;
        }
    }

    &.RESERVED,
    &.BOOKED {
        color: #000;
        background-color: #ffeb3b;
        &:hover {
            background-color: #fff176;
        }
    }

    &.UNAVAILABLE {
        background-color: #9e9e9e;
        &:hover {
            background-color: #bdbdbd;
        }
    }

    &.DOCUMENTS_IN_PROGRESS {
        background-color: #00bcd4;
        &:hover {
            background-color: #26c6da;
        }
    }
`;

export const PreviewCell = styled(Cell)`
    width: 40px;
    height: 40px;
`;

export const TooltipContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-width: 150px;
    .Cell__price {
        font-size: 14px;
    }

    .Cell__flat-status {
        font-weight: 600;
    }
`;

export const AreaContainer = styled.div`
    align-self: flex-end;
`;

export const NumberContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
`;

export const DataContainer = styled.div`
    margin-left: 8px;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
`;

export const PriceAndAmountContainer = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    align-self: stretch;
    padding: 10px 0;
`;

export const StyledBagde = styled(Badge)`
    .MuiBadge-badge {
        top: 10px;
        right: 10px;
        background: #fff;
        color: black;
        border: 1px solid #000;
    }
`;

export const TilePlusFirstSection = styled.div`
    width: 25%;
    padding: 0 5px;
`;

export const TilePlusSecondSection = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #fff;
`;

export const TilePlusAreaInfo = styled.div`
    height: 30%;
    border-bottom: 1px solid #fff;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
`;

export const TilePlusPriceInfo = styled.div`
    height: 70%;
    padding: 5px;
    text-align: center;
`;

export const TilePlusSquarePriceInfo = styled.div`
    margin-bottom: 5px;
`;

export const FontSizeDecorationMedium = styled.div`
    @media only screen and (max-width: 600px) {
        font-size: 0.8em;
    }
`;
