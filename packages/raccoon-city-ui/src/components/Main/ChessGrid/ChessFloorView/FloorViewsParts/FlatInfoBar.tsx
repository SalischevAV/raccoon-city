import React from 'react';
import {FLAT_STATUSES} from '../../../../../core/constants';
import {FlatInfo} from '../ChessFloorView.styled';

interface Props {
    info: any;
}

function getPrice(flat) {
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
                    <span>{`№${info.flatNumber || NO_DATA}`}</span>
                    <span>{`Статус: ${FLAT_STATUSES.find((statuses) => statuses.value === info.status)?.label ||
                        NO_DATA}`}</span>
                    {info.status !== 'SOLD_OUT' && info.price && <span>{`Цена: ${getPrice(info) || NO_DATA}`}</span>}
                    <span>{`М2: ${info.area || NO_DATA}`}</span>
                    {(info.squarePriceSale || info.squarePrice) && (
                        <span>{`Цена м2: ${info.squarePriceSale || info.squarePrice || NO_DATA}`}</span>
                    )}
                    <span>{`Комнат: ${info.roomAmount}`}</span>
                    <span>{`Кол-во уровней: ${info.levelAmount || NO_DATA}`}</span>
                </>
            ) : (
                <span>Выберите квартиру</span>
            )}
        </FlatInfo>
    );
};
