import React, {Fragment} from 'react';
import {FlatsInHouse} from '../../../graphql/queries/houseQuery';
import {ChessFloorView} from './ChessFloorView/ChessFloorView';
import {MobileInformation} from './ChessGrid.styled';
import {SectionBar} from './SectionBar/SectionBar';

interface ChessGridFloorViewProps {
    houseFlats: FlatsInHouse[];
    filters: any;
    isPublic: boolean;
    isSideBarOpen: boolean;
    onSelect: any;
    setCurrentLevel: any;
    setSideBarOpen: any;
}

export const ChessGridFloorView = (props: ChessGridFloorViewProps) => {
    const {houseFlats, filters, onSelect, isPublic, setCurrentLevel, isSideBarOpen, setSideBarOpen} = props;

    return (
        <Fragment>
            {!houseFlats.length ? (
                <div>Дома не найдены</div>
            ) : (
                <Fragment>
                    <ChessFloorView
                        setCurrentLevel={setCurrentLevel}
                        filters={filters}
                        onSelect={onSelect}
                        houseFlats={houseFlats}
                        isPublic={isPublic}
                    />

                    <MobileInformation>
                        {isPublic && <SectionBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />}
                    </MobileInformation>
                </Fragment>
            )}
        </Fragment>
    );
};
