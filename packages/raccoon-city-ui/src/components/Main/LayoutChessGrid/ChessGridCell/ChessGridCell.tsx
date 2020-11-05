import {Theme, withStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import {createSelectable, TSelectableItemProps} from 'react-selectable-fast/lib';
import styled from 'styled-components';
import {Flat} from '../../../shared/types/flat.types';
import {useSelectedViewMode} from '../../LayoutEditor/ChessGridDialog/ChessGridDialog';

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#fff',
        color: '#000',
        padding: '8px'
    }
}))(Tooltip);

interface Props {
    isSelected?: boolean;
    isSelecting?: boolean;
}

const Cell = styled.div<Props>`
    box-sizing: border-box;
    position: relative;
    color: #fff;
    background-color: #4caf50;
    border-radius: 0;
    padding: 1px;
    margin: ${(p) => (p.isSelected || p.isSelecting ? '4px' : '10px')};
    width: ${(p) => (p.isSelected || p.isSelecting ? '40px' : '32px')};
    height: ${(p) => (p.isSelected || p.isSelecting ? '40px' : '32px')};
    transition: all 100ms linear;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 10px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }

    &.SOLD_OUT {
        background-color: #f44336;
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

const TooltipContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 150px;
    .Cell__price {
        font-size: 14px;
    }
`;

const AreaContainer = styled.div`
    align-self: flex-end;
`;

const NumberContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DataContainer = styled.div`
    margin-left: 8px;
    font-size: 12px;
`;

const StyledIcon = styled.div`
    position: absolute;
    top: -6px;
    right: -6px;
`;

export function ChessGridCellItem({flat, selectableRef, isSelected, isSelecting}: {flat: Flat} & TSelectableItemProps) {
    const selectedViewMode = useSelectedViewMode().selectedViewMode;
    return (
        <HtmlTooltip
            title={
                <TooltipContainer>
                    <PriceContainer>
                        <Cell className={flat.status}>{flat.roomAmount}</Cell>
                        <div className="Cell__price">{flat.price}грн</div>
                    </PriceContainer>
                    <DataContainer>
                        <AreaContainer>{flat.area}м2</AreaContainer>
                        <NumberContainer>
                            <div>{flat.flatNumber}</div>
                            <div>1м2 - {Math.round(flat.price / flat.area)}</div>
                        </NumberContainer>
                    </DataContainer>
                </TooltipContainer>
            }
        >
            <Cell ref={selectableRef} isSelected={isSelected} isSelecting={isSelecting} className={flat.status}>
                {selectedViewMode === 'flatNumber'
                    ? flat.flatNumber
                    : selectedViewMode === 'area'
                    ? flat.area
                    : flat.roomAmount}
                {!flat.belongsToLayout && flat.hasLayout && (
                    <StyledIcon>
                        <HomeIcon style={{fontSize: 14}} color="primary" />
                    </StyledIcon>
                )}
            </Cell>
        </HtmlTooltip>
    );
}

export const ChessGridCell = createSelectable(React.memo(ChessGridCellItem));
