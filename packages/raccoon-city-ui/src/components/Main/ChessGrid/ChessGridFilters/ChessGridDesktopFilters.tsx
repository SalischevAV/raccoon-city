import {Grid} from '@material-ui/core';
import React, {Fragment} from 'react';
import styled from 'styled-components';
import {
    AreaFilter,
    ChessGridFiltersProps,
    otherPremisesFilter,
    PriceFilter,
    RoomAmountFilter,
    SelectContainer,
    ViewMode
} from './ChessGridFilters';
import {ChessGridHouseSelect} from './ChessGridHouseSelect';
import {ViewModeFilters} from './ViewModeFilters';
import {FlatStatusesBar} from '../FlatStatusesBar';
import {ChessCellViewMode} from '../ChessEnums';

const DesktopFilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    position: relative;
`;

const FlatStatusesBarWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

const RangeContainer = styled.div``;

export function ChessGridDesktopFilters(props: ChessGridFiltersProps) {
    const data = props?.data?.getGroupedFlatsBySection;
    const hasPrices = data && data?.houseFlats?.length > 0;
    const {mode} = props.filters;

    return (
        <Grid container spacing={1}>
            {props.onHouseChange && (
                <Grid item xs={12}>
                    <SelectContainer>
                        <ChessGridHouseSelect onChange={props.onHouseChange} isPublic={props.isPublic} />
                    </SelectContainer>
                </Grid>
            )}
            {hasPrices && (
                <DesktopFilterWrapper>
                    <FlatStatusesBarWrapper>
                        <FlatStatusesBar houseId={props.houseId} />
                    </FlatStatusesBarWrapper>
                    {mode !== ChessCellViewMode.FLOOR && (
                        <Fragment>
                            <RoomAmountFilter
                                dispatch={props.dispatchFn}
                                premisses={otherPremisesFilter}
                                title="Другие помещения"
                            />
                            <RoomAmountFilter dispatch={props.dispatchFn} />
                            <RangeContainer>
                                <PriceFilter
                                    data={data}
                                    maxPrice={data.maxPrice}
                                    minPrice={data.minPrice}
                                    dispatch={props.dispatchFn}
                                />
                            </RangeContainer>
                            <RangeContainer>
                                <AreaFilter
                                    maxArea={data.maxArea}
                                    minArea={data.minArea}
                                    dispatch={props.dispatchFn}
                                    data={data}
                                />
                            </RangeContainer>
                            <ViewMode dispatch={props.dispatchFn} />
                        </Fragment>
                    )}
                    <ViewModeFilters mode={props.filters.mode} dispatch={props.dispatchFn} />
                </DesktopFilterWrapper>
            )}
        </Grid>
    );
}
