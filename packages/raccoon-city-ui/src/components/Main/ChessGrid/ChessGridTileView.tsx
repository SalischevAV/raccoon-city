import React from 'react';
import {ChessGridColumn} from './ChessGridColumn/ChessGridColumn';
import {showMutedFlats} from './ChessGrid.utils';
import {ChessGridWrapper, ColumnAndSectionBarWrapper, ColumnWrapper, Container} from './ChessGrid.styled';
import {ChessCellViewMode} from './ChessEnums';
import {SectionBar} from './SectionBar/SectionBar';
import {FlatsInHouse, GroupedFlats} from '../../../graphql/queries/houseQuery';
import {useQuery} from '@apollo/react-hooks';
import {GET_APARTMENT_COMPLEX_NAME} from '../../../graphql/queries/apartmentComplexQuery';

interface ChessGridTileViewProps {
    houseFlats: FlatsInHouse[];
    hasSelect: boolean;
    isPublic: boolean;
    filters: any;
    selectFlat: any;
    savedFlat: any;
    isSideBarOpen: boolean;
    setSideBarOpen: any;
}

const ColumnContainer = (props: any) => {
    const {houseFlats, mutedFlats, onSelect, savedFlat, index, houseId} = props;

    const {loading: apartmentComplexLoading, error: apartmentComplexError, data: apartmentComplexData} = useQuery(
        GET_APARTMENT_COMPLEX_NAME,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                uuid: houseId
            }
        }
    );

    if (apartmentComplexLoading) {
        return <div>Loading</div>;
    }

    const developerName = apartmentComplexData?.getApartmentComplexName?.name || '';

    return (
        <ColumnWrapper>
            {mutedFlats.map((item: GroupedFlats) => {
                return (
                    <ChessGridColumn
                        key={item.id}
                        columnName={item.section}
                        sectionName={houseFlats[index].name}
                        developerName={developerName}
                        levels={item.levels}
                        onSelect={onSelect}
                        savedFlat={savedFlat}
                    />
                );
            })}
        </ColumnWrapper>
    );
};

export const ChessGridTileView = (props: ChessGridTileViewProps) => {
    const {houseFlats, hasSelect, isPublic, filters, selectFlat, savedFlat, isSideBarOpen, setSideBarOpen} = props;

    return (
        <ChessGridWrapper hasSelect={hasSelect}>
            {houseFlats.map((group: FlatsInHouse, index: number) => {
                const {groupedFlats, id} = group;

                if (!groupedFlats || (groupedFlats && groupedFlats.length === 0)) {
                    return null;
                }

                const mutedFlats = showMutedFlats(groupedFlats, filters, isPublic);

                return (
                    <Container key={group.id}>
                        <ColumnAndSectionBarWrapper isPublic={isPublic} mode={filters.mode}>
                            <ColumnContainer
                                houseFlats={houseFlats}
                                mutedFlats={mutedFlats}
                                onSelect={selectFlat}
                                savedFlat={savedFlat}
                                index={index}
                                houseId={id}
                            />
                        </ColumnAndSectionBarWrapper>

                        {isPublic && filters.mode === ChessCellViewMode.TILE && (
                            <SectionBar
                                isSideBarOpen={isSideBarOpen}
                                setSideBarOpen={setSideBarOpen}
                                isPublic={isPublic}
                            />
                        )}
                    </Container>
                );
            })}
        </ChessGridWrapper>
    );
};
