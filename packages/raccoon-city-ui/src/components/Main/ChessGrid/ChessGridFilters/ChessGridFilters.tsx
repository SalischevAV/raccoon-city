import {Avatar, Grid, Slider, Tooltip, useMediaQuery, useTheme} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import ApartmentIcon from '@material-ui/icons/Apartment';
import classNames from 'classnames';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {withTooltip} from '../../../HOC/withTooltip';
import {House} from '../../../shared/types/house.types';
import {ViewModeValues} from '../ChessEnums';
import {CellViewModeContext} from '../ChessGrid';
import {ChessGridHouseSelect} from './ChessGridHouseSelect';
import {ViewModeFilters} from './ViewModeFilters';

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px;
    .HouseSelect {
        width: 90%;

        @media (max-width: 889px) {
            width: 100%;
            padding: 32px 8px 8px;
        }
    }
`;

const StyledAvatar = styled(Avatar)`
    margin: 0 4px;
    cursor: pointer;
    width: 30px;
    height: 30px;

    &.active {
        background-color: #e84f1d;
        border: 1px solid #e84f1d;
        color: #fff;
    }

    &.empty {
        background-color: transparent;
        border: 1px solid #828282;
        color: #828282;

        &:hover {
            background-color: #e84f1d;
            color: #fff;
            border: 1px solid #e84f1d;
            transition: all 200ms linear;
        }
    }

    &.MuiAvatar-root {
        width: 30px;
        height: 30px;
        font-size: 14px;
        font-weight: 300;
        border-radius: 5px;
    }
`;

const ViewModeAvatar = styled(StyledAvatar)`
    &.MuiAvatar-root {
        font-size: 20px;
        font-weight: 400;
    }
`;

const RoomContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const FilterItemContainer = styled.div`
    font-family: 'TTNorms', sans-serif;
    font-weight: 700;
    margin: 0 16px;
`;

const LeftInputGrid = styled(Grid)`
    display: flex;
    justify-content: flex-end;
`;
const RangeContainer = styled(FilterItemContainer)`
    padding: 30px 0;
`;

const CustomSlider = styled(Slider)`
    &.MuiSlider-root {
        color: #e84f1d;
    }

    .MuiSlider-rail {
        height: 5px;
        color: #c4c4c4;
    }

    .MuiSlider-track {
        height: 5px;
    }

    .MuiSlider-thumb {
        width: 15px;
        height: 15px;
        border-radius: 3px;
    }
`;

const DimensionSpan = styled.span`
    font-size: 0.7em;
`;

export const FilterTitle = styled.div`
    text-align: center;
    margin-bottom: 8px;
`;
export const FilterWrapper = styled.div`
    max-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-bottom: 80px;
`;

function ValueLabelComponent(props) {
    const {children, open, value} = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const RangeInput = styled(Input)`
    border: 0.5px solid #828282;
    border-radius: 5px;
    padding-left: 5px;
    text-align: center;
`;

export const roomFilters = [
    {value: '1', title: 'Однокомнатные'},
    {value: '2', title: 'Двухкомнатные'},
    {value: '3', title: 'Трёхкомнатные'},
    {value: '4+', title: 'От четырёх комнат'}
];

export const otherPremisesFilter = [
    {value: 'КН', title: 'Коммерческое помещение'},
    {value: 'П', title: 'Паркинг'}
];

export function RoomAmountFilter({dispatch, premisses = roomFilters, title = 'Количество комнат'}) {
    const [selected, setSelected] = useState({});

    return (
        <FilterItemContainer>
            <FilterTitle>{title}</FilterTitle>
            <RoomContainer>
                {premisses.map((item) => {
                    const filterSelected = selected[item.value];
                    const avatarClasses = classNames({
                        active: filterSelected,
                        empty: !filterSelected
                    });
                    return withTooltip(
                        <StyledAvatar
                            variant="square"
                            key={item.value}
                            className={avatarClasses}
                            onClick={() => {
                                const copy = {...selected};
                                copy[item.value] = !copy[item.value];
                                setSelected(copy);
                                dispatch({
                                    type: 'roomAmount',
                                    payload: copy
                                });
                            }}
                        >
                            {item.value}
                        </StyledAvatar>,
                        item.title
                    );
                })}
            </RoomContainer>
        </FilterItemContainer>
    );
}

export function PriceFilter({minPrice, maxPrice, dispatch, data}) {
    const [min, setMin] = useState(minPrice);
    const [max, setMax] = useState(maxPrice);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch({
            type: 'price',
            payload: {
                minPrice,
                maxPrice
            }
        });

        setMin(minPrice);
        setMax(maxPrice);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minPrice, maxPrice, data]);
    return (
        <RangeContainer>
            <FilterTitle>
                Стоимость <DimensionSpan>грн/м2</DimensionSpan>
            </FilterTitle>
            <Grid container spacing={2} alignItems="center">
                {matches && (
                    <Grid item xs={12}>
                        <CustomSlider
                            value={[min, max]}
                            ValueLabelComponent={ValueLabelComponent}
                            aria-labelledby="discrete-slider-custom"
                            step={10}
                            min={minPrice}
                            max={maxPrice}
                            valueLabelDisplay="auto"
                            onChange={(e, value) => {
                                const [minPriceRes, maxPriceRes] = Array.isArray(value) ? value : [];
                                setMin(minPriceRes);
                                setMax(maxPriceRes);
                            }}
                            onChangeCommitted={(e, value) => {
                                const [minPriceRes, maxPriceRes] = Array.isArray(value) ? value : [];
                                dispatch({
                                    type: 'price',
                                    payload: {
                                        minPrice: minPriceRes,
                                        maxPrice: maxPriceRes
                                    }
                                });
                            }}
                        />
                    </Grid>
                )}
                <Grid container justify="center" spacing={2} item>
                    <LeftInputGrid item xs={3} md={6}>
                        <RangeInput
                            className="LeftInput"
                            value={min}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const val = event.target.value === '' ? '' : Number(event.target.value);
                                setMin(val);
                            }}
                            onBlur={() => {
                                dispatch({
                                    type: 'price',
                                    payload: {
                                        minPrice: min,
                                        maxPrice: max
                                    }
                                });
                            }}
                            inputProps={{
                                step: 10,
                                min: minPrice,
                                max: maxPrice,
                                type: 'number',
                                'aria-labelledby': 'input-slider'
                            }}
                        />
                    </LeftInputGrid>
                    <Grid item xs={3} md={6}>
                        <RangeInput
                            value={max}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const val = event.target.value === '' ? '' : Number(event.target.value);
                                setMax(val);
                            }}
                            onBlur={() => {
                                dispatch({
                                    type: 'price',
                                    payload: {
                                        minPrice: min,
                                        maxPrice: max
                                    }
                                });
                            }}
                            inputProps={{
                                step: 10,
                                min: minPrice,
                                max: maxPrice,
                                type: 'number',
                                'aria-labelledby': 'input-slider'
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </RangeContainer>
    );
}

export function AreaFilter({maxArea, minArea, dispatch, data}) {
    const [min, setMin] = useState(minArea);
    const [max, setMax] = useState(maxArea);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch({
            type: 'area',
            payload: {
                minArea,
                maxArea
            }
        });
        setMin(minArea);
        setMax(maxArea);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxArea, minArea, data]);
    return (
        <RangeContainer>
            <FilterTitle>
                Площадь <DimensionSpan>м2</DimensionSpan>
            </FilterTitle>
            <Grid container spacing={2} alignItems="center" justify="center">
                {matches && (
                    <Grid item xs={12}>
                        <CustomSlider
                            value={[min, max]}
                            ValueLabelComponent={ValueLabelComponent}
                            aria-labelledby="discrete-slider-custom"
                            step={10}
                            min={minArea}
                            max={maxArea}
                            valueLabelDisplay="auto"
                            onChange={(e, value) => {
                                const [minPriceRes, maxPriceRes] = Array.isArray(value) ? value : [];
                                setMin(minPriceRes);
                                setMax(maxPriceRes);
                            }}
                            onChangeCommitted={(e, value) => {
                                const [minAreaRes, maxAreaRes] = Array.isArray(value) ? value : [];
                                dispatch({
                                    type: 'area',
                                    payload: {
                                        minArea: minAreaRes,
                                        maxArea: maxAreaRes
                                    }
                                });
                            }}
                        />
                    </Grid>
                )}
                <Grid container justify="center" spacing={2} item>
                    <LeftInputGrid item xs={3} md={6}>
                        <RangeInput
                            className="LeftInput"
                            value={min}
                            onBlur={() => {
                                dispatch({
                                    type: 'area',
                                    payload: {
                                        minArea: min,
                                        maxArea: max
                                    }
                                });
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const val = event.target.value === '' ? '' : Number(event.target.value);
                                setMin(val);
                            }}
                            inputProps={{
                                step: 10,
                                min: minArea,
                                max: maxArea,
                                type: 'number',
                                'aria-labelledby': 'input-slider'
                            }}
                        />
                    </LeftInputGrid>
                    <Grid item xs={3} md={6}>
                        <RangeInput
                            value={max}
                            onBlur={() => {
                                dispatch({
                                    type: 'area',
                                    payload: {
                                        minArea: min,
                                        maxArea: max
                                    }
                                });
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const val = event.target.value === '' ? '' : Number(event.target.value);
                                setMax(val);
                            }}
                            inputProps={{
                                step: 10,
                                min: minArea,
                                max: maxArea,
                                type: 'number',
                                'aria-labelledby': 'input-slider'
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </RangeContainer>
    );
}

export function ViewMode({dispatch}) {
    const initialView = 'area';
    const [selected, setSelected] = useState(initialView);
    const cellView = useContext<any>(CellViewModeContext);

    const isSelected = (value) => {
        return {
            active: selected === value,
            empty: selected !== value
        };
    };

    if (cellView.mode !== 'tile') {
        return null;
    }

    return (
        <FilterItemContainer>
            <FilterTitle>Режим просмотра</FilterTitle>
            <RoomContainer>
                {withTooltip(
                    <ViewModeAvatar
                        className={classNames({...isSelected(ViewModeValues.ROOM)})}
                        onClick={() => {
                            setSelected(ViewModeValues.ROOM);
                            dispatch({
                                type: 'mode',
                                payload: ViewModeValues.ROOM
                            });
                        }}
                    >
                        <ApartmentIcon />
                    </ViewModeAvatar>,
                    'Кол-во комнат'
                )}
                {withTooltip(
                    <ViewModeAvatar
                        className={classNames({...isSelected(ViewModeValues.AREA)})}
                        onClick={() => {
                            setSelected(ViewModeValues.AREA);
                            dispatch({
                                type: 'mode',
                                payload: ViewModeValues.AREA
                            });
                        }}
                    >
                        М²
                    </ViewModeAvatar>,
                    'Площадь квартиры'
                )}
                {withTooltip(
                    <ViewModeAvatar
                        className={classNames({...isSelected(ViewModeValues.NUMBER)})}
                        onClick={() => {
                            setSelected(ViewModeValues.NUMBER);
                            dispatch({
                                type: 'mode',
                                payload: ViewModeValues.NUMBER
                            });
                        }}
                    >
                        №
                    </ViewModeAvatar>,
                    'Номер квартиры'
                )}
            </RoomContainer>
        </FilterItemContainer>
    );
}

export interface ChessGridFiltersProps {
    dispatchFn: (param: {type: string; payload: any}) => void;
    onHouseChange?: (house: House[]) => void;
    filters: any;
    data: any;
    isPublic: boolean;
    houseId: string[];
}

export function ChessGridFilters(props: ChessGridFiltersProps) {
    const data = props?.data?.getGroupedFlatsBySection;
    const hasPrices = data && data?.houseFlats?.length > 0;
    return (
        <FilterWrapper>
            <Grid container spacing={1}>
                {props.onHouseChange && (
                    <Grid item xs={12}>
                        <SelectContainer>
                            <ChessGridHouseSelect onChange={props.onHouseChange} isPublic={props.isPublic} />
                        </SelectContainer>
                    </Grid>
                )}
                {hasPrices && (
                    <Fragment>
                        <Grid item xs={12} md={4}>
                            <Grid container justify="center">
                                <RoomAmountFilter
                                    dispatch={props.dispatchFn}
                                    premisses={otherPremisesFilter}
                                    title="Другие помещения"
                                />
                                <RoomAmountFilter dispatch={props.dispatchFn} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Grid container justify="center" direction="row">
                                <Grid item xs={12} md={6}>
                                    <PriceFilter
                                        data={data}
                                        maxPrice={data.maxPrice}
                                        minPrice={data.minPrice}
                                        dispatch={props.dispatchFn}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <AreaFilter
                                        maxArea={data.maxArea}
                                        minArea={data.minArea}
                                        dispatch={props.dispatchFn}
                                        data={data}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Grid container justify="center">
                                <ViewMode dispatch={props.dispatchFn} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Grid container justify="center">
                                <ViewModeFilters mode={props.filters.mode} dispatch={props.dispatchFn} />
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
        </FilterWrapper>
    );
}
