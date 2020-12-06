import React from 'react';
import styled from 'styled-components';
import {Flat} from '../../../shared/types/flat.types';
import {ChessGridCell} from '../ChessGridCell/ChessGridCell';

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RowTitle = styled.div`
    width: 16px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledEmptyLevel = styled.div`
    width: 100%;
    min-width: 56px;
    height: 56px;
    margin: 8px;
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px),
        linear-gradient(to bottom, #eee, #999);
`;

interface ChessGridItem {
    rowName: string;
    flats: Flat[];
    onSelect: (flat: Flat) => void;
}

function EmplyLevel() {
    return <StyledEmptyLevel />;
}

export const ChessGridRow = React.memo((props: ChessGridItem) => (
    <RowWrapper>
        <RowTitle>
            <div>{props.rowName}</div>
            <div>этаж</div>
        </RowTitle>
        {props.flats.length === 0 && <EmplyLevel />}
        {props.flats.length !== 0 &&
            props.flats
                .sort((flat1, flat2) => parseInt(flat1.flatNumber) - parseInt(flat2.flatNumber))
                .map((flat: Flat) => {
                    return <ChessGridCell key={flat.id} flat={flat} onSelect={props.onSelect} />;
                })}
    </RowWrapper>
));
