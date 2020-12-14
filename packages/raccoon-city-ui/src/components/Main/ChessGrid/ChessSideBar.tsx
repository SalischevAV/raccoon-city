import React from 'react';
import {ChessCellViewMode} from './ChessEnums';
import {FlatSidebarInfo} from './FlatSidebarInfo/FlatSidebarInfo';

interface ChessSideBarProps {
    SideBar: any;
    flatCardOpen: boolean;
    isPublic: boolean;
    houseId: string;
    selectedFlat: any;
    showRequestButton: any;
    onFlatSelected: any;
    setFlatCardOpen: any;
    setSelectedFlat: any;
    setSavedFlat: any;
    viewMode: ChessCellViewMode;
    currentLevel?: string;
}

export const ChessSideBar = ({
    SideBar,
    flatCardOpen,
    isPublic,
    selectedFlat,
    showRequestButton,
    onFlatSelected,
    setFlatCardOpen,
    setSelectedFlat,
    houseId,
    viewMode,
    currentLevel,
    setSavedFlat
}: ChessSideBarProps) => {
    return (
        <SideBar
            anchor="right"
            open={flatCardOpen}
            onOpen={() => {
                // silence
            }}
            onClose={() => {
                setFlatCardOpen(false);
                setSelectedFlat(undefined);
            }}
        >
            {selectedFlat && (
                <FlatSidebarInfo
                    // @ts-ignore
                    flat={selectedFlat}
                    isPublic={isPublic}
                    showRequestButton={showRequestButton}
                    onFlatSelected={onFlatSelected}
                    houseId={houseId}
                    setSavedFlat={setSavedFlat}
                    viewMode={viewMode}
                    currentLevel={currentLevel}
                    setFlatCardOpen={setFlatCardOpen}
                />
            )}
        </SideBar>
    );
};
