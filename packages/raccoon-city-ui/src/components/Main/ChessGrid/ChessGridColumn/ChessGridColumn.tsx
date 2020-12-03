import {Typography} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {Flat} from '../../../shared/types/flat.types';
import {ChessGridRow} from '../ChessGridRow/ChessGridRow';

const ColumnWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    padding: 12px;

    @media (max-width: 889px) {
        flex-direction: column-reverse;
    }
`;

const ColumnTitle = styled.div`
    align-self: center;
    margin-top: 8px;
`;

const CellContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

interface ChessGridColumnProps {
    columnName: string;
    levels: Array<{
        id: string;
        level: number;
        flats: Flat[];
    }>;
    onSelect: (flat: Flat) => void;
    savedFlat: any;
}

function getFlatStatus(levels, levelToFind, flatNumberToFind) {
    return levels
        .find(({level}) => level === levelToFind)
        ?.flats.find(({flatNumber}) => flatNumber === flatNumberToFind);
}

export class ChessGridColumn extends React.Component<ChessGridColumnProps> {
    public shouldComponentUpdate(
        nextProps: Readonly<ChessGridColumnProps>,
        nextState: Readonly<{}>,
        nextContext: any
    ): boolean {
        const {savedFlat, columnName, levels} = this.props;

        if (!savedFlat || !columnName || !levels) {
            return false;
        }

        const {section, level, flatNumber} = savedFlat;
        const {columnName: nextColumnName, levels: nextLevels} = nextProps;

        if (!section || !level || !flatNumber) {
            return false;
        }

        if (nextColumnName !== section && columnName !== section) {
            return false;
        }

        const flats = getFlatStatus(levels, level, flatNumber);
        const nextFlats = getFlatStatus(nextLevels, level, flatNumber);

        if (!nextFlats?.status || !flats?.status) {
            return false;
        }

        return nextFlats?.status === flats?.status;
    }

    public render() {
        const sortedLevels = this.props.levels.sort((level1, level2) => {
            return level2.level - level1.level;
        });

        const EntranceTitle = () => (
            <ColumnTitle>
                <Typography variant="subtitle1" gutterBottom={true}>
                    Подъезд №{this.props.columnName}
                </Typography>
            </ColumnTitle>
        );

        return (
            <ColumnWrapper className="ChessGridColumn">
                <EntranceTitle />

                <CellContainer className="ChessGridColumn__cell">
                    {sortedLevels.map((level) => {
                        return (
                            <ChessGridRow
                                key={level.id}
                                rowName={String(level.level)}
                                flats={level.flats}
                                onSelect={this.props.onSelect}
                            />
                        );
                    })}
                </CellContainer>

                <EntranceTitle />
            </ColumnWrapper>
        );
    }
}
