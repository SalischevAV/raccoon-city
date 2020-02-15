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
`;

const StyledEmptyLevel = styled.div`
    width: 100%;
    min-width: 40px;
    height: 40px;
    margin: 8px;
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 20px),
        linear-gradient(to bottom, #eee, #999);
`;

interface ChessGridItem {
    rowName: string;
    flats: Flat[];
}

function EmplyLevel() {
    return <StyledEmptyLevel />;
}
export function ChessGridRow(props: ChessGridItem) {
    return (
        <RowWrapper>
            <RowTitle>{props.rowName}</RowTitle>
            {props.flats.length === 0 && <EmplyLevel />}
            {props.flats.length !== 0 &&
                props.flats.map((flat: Flat) => {
                    return <ChessGridCell key={flat.id} flat={flat} isSelected={flat.belongsToLayout} />;
                })}
        </RowWrapper>
    );
}
