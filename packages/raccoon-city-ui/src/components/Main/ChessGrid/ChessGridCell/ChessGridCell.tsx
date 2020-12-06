import React, {Fragment, useContext} from 'react';
import {FLAT_STATUSES} from '../../../../core/constants';
import {Flat} from '../../../shared/types/flat.types';
import {ChessCellViewMode} from '../ChessEnums';
import {CellViewModeContext, ViewModeContext} from '../ChessGrid';
import {
    AreaContainer,
    Cell,
    DataContainer,
    HtmlTooltip,
    NumberContainer,
    PreviewCell,
    PriceAndAmountContainer,
    PriceContainer,
    StyledBagde,
    TilePlusAreaInfo,
    TilePlusFirstSection,
    TilePlusPriceInfo,
    TilePlusSecondSection,
    TilePlusSquarePriceInfo,
    TooltipContainer
} from './ChessGridCell.styled';

interface Props {
    flat: Flat;
    onSelect: (flat: Flat) => void;
}

function ReducedPrice({flat}) {
    if (!flat.squarePrice) {
        return <span>Цена недоступна</span>;
    }

    const price = flat.area * flat.squarePrice;
    const salePrice = flat.area * (flat.squarePriceSale || -1);

    if (salePrice < 0) {
        return <span>{price.toFixed(2)} грн</span>;
    }

    return (
        <span>
            <del>{price.toFixed(2)}</del> <span>{salePrice.toFixed(2)}</span> грн
        </span>
    );
}
export const ChessGridCell = React.memo(({flat, onSelect}: Props) => {
    const viewContextValue = useContext<any>(ViewModeContext);
    const cellView = useContext<any>(CellViewModeContext);
    const isSoldOut = flat.status === 'SOLD_OUT';

    const CellViewJSX = {
        [ChessCellViewMode.TILE]: <>{flat[viewContextValue.selectedViewMode]}</>,
        [ChessCellViewMode.TILE_PLUS]: (
            <Fragment>
                <TilePlusFirstSection>№{flat.flatNumber}</TilePlusFirstSection>
                <TilePlusSecondSection>
                    <TilePlusAreaInfo>
                        {`${flat.roomAmount}к`} <span>{flat.area}м2</span>
                    </TilePlusAreaInfo>
                    <TilePlusPriceInfo>
                        <TilePlusSquarePriceInfo>
                            {!!flat.squarePrice ? (
                                <span>1м2 - {flat.squarePriceSale || flat.squarePrice} грн</span>
                            ) : (
                                <span>&nbsp;</span>
                            )}
                        </TilePlusSquarePriceInfo>
                        <ReducedPrice flat={flat} />
                    </TilePlusPriceInfo>
                </TilePlusSecondSection>
            </Fragment>
        )
    };

    const priceField = isSoldOut ? null : (
        <div className="Cell__price">
            <ReducedPrice flat={flat} />
        </div>
    );

    return (
        <HtmlTooltip
            title={
                <TooltipContainer>
                    <PriceContainer>
                        <PreviewCell className={flat.status}>{flat.roomAmount}</PreviewCell>
                        {!flat.squarePrice ? (
                            <div className="Cell__flat-status">
                                {FLAT_STATUSES.find(({value}) => value === flat.status)?.label}
                            </div>
                        ) : (
                            <PriceAndAmountContainer>
                                {priceField}
                                <div>1 м2 - {flat.squarePriceSale || flat.squarePrice} грн</div>
                            </PriceAndAmountContainer>
                        )}
                    </PriceContainer>
                    <DataContainer>
                        <NumberContainer>
                            <div>№{flat.flatNumber}</div>
                        </NumberContainer>
                        <AreaContainer>{flat.area}м2</AreaContainer>
                    </DataContainer>
                </TooltipContainer>
            }
        >
            {flat.levelAmount > 1 ? (
                <StyledBagde badgeContent={flat.levelAmount}>
                    <Cell
                        className={flat.isActive ? flat.status : 'MUTED'}
                        onClick={() => {
                            onSelect(flat);
                        }}
                        viewMode={cellView.mode}
                    >
                        {CellViewJSX[cellView.mode] || flat[viewContextValue.selectedViewMode]}
                    </Cell>
                </StyledBagde>
            ) : (
                <Cell
                    className={flat.isActive ? flat.status : 'MUTED'}
                    onClick={() => {
                        onSelect(flat);
                    }}
                    viewMode={cellView.mode}
                >
                    {CellViewJSX[cellView.mode] || flat[viewContextValue.selectedViewMode]}
                </Cell>
            )}
        </HtmlTooltip>
    );
});
