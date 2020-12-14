import React from 'react';
import {ViewModeFilters} from './ChessGridFilters/ViewModeFilters';
import {ViewMode} from './ChessGridFilters/ChessGridFilters';
import {MobileInformation} from './ChessGrid.styled';
import {InfoIcon, InfoMobileViewWrapper} from './ChessGrid.styled';
import {FlatStatusesBar} from './FlatStatusesBar';

export function ViewModeSelectorMobile(props) {
    return (
        <MobileInformation>
            <ViewModeFilters mode={props.filters.mode} dispatch={props.dispatchFn} />
            <ViewMode dispatch={props.dispatchFn} />
        </MobileInformation>
    );
}

export function MobileInfoPanel(props) {
    return (
        <MobileInformation>
            <InfoMobileViewWrapper>
                <FlatStatusesBar houseId={props.houseId} />
            </InfoMobileViewWrapper>
            <InfoMobileViewWrapper>
                <InfoIcon onClick={() => props.setSideBarOpen(true)} />
            </InfoMobileViewWrapper>
        </MobileInformation>
    );
}
