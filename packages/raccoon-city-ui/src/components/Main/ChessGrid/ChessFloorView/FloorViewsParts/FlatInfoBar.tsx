import React from 'react';
import {FLAT_STATUSES} from '../../../../../core/constants';
import {FlatInfo} from '../ChessFloorView.styled';
import {ValueWrapper} from './FlatInfoBar.styled';

interface Props {
    info: any;
}

export function getPrice(flat) {
    const {squarePrice, squarePriceSale, area} = flat;

    if (!squarePrice) {
        return null;
    }

    const square = squarePriceSale ? squarePriceSale : squarePrice;
    const price = area * square;

    return price.toFixed(2);
}

export const FlatInfoBar = ({info}: Props) => {
    const NO_DATA = 'Нет данных';

    return (
        <FlatInfo>
            {info ? (
                <>
                    <ValueWrapper>{`№${info.flatNumber || NO_DATA}`}</ValueWrapper>
                    <ValueWrapper>{`Статус: ${FLAT_STATUSES.find((statuses) => statuses.value === info.status)?.label ||
                        NO_DATA}`}</ValueWrapper>
                    <ValueWrapper>
                        {`Цена: ${info.status === 'SOLD_OUT' ? 'Продано' : getPrice(info) || NO_DATA}`}
                    </ValueWrapper>
                    <ValueWrapper>{`М2: ${info.area || NO_DATA}`}</ValueWrapper>
                    <ValueWrapper>
                        {`Цена м2: ${
                            info.status === 'SOLD_OUT' ? 'Продано' : info.squarePriceSale || info.squarePrice || NO_DATA
                        }`}
                    </ValueWrapper>
                    <ValueWrapper>{`Комнат: ${info.roomAmount}`}</ValueWrapper>
                    <ValueWrapper>{`Кол-во уровней: ${info.levelAmount || NO_DATA}`}</ValueWrapper>
                </>
            ) : (
                <ValueWrapper>Выберите квартиру</ValueWrapper>
            )}
        </FlatInfo>
    );
};
