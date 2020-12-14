import React from 'react';
import {ViewModeFilters} from './ChessGridFilters/ViewModeFilters';
import {ViewMode} from './ChessGridFilters/ChessGridFilters';
import {MobileInformation} from './ChessGrid.styled';

export function ViewModeSelectorMobile(props) {
    return (
        <MobileInformation>
            <ViewModeFilters mode={props.filters.mode} dispatch={props.dispatchFn} />
            <ViewMode dispatch={props.dispatchFn} />
        </MobileInformation>
    );
}
