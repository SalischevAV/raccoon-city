import {Avatar, SvgIcon} from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import {withTooltip} from '../../../HOC/withTooltip';
import {ChessCellViewMode} from '../ChessEnums';
import {FilterItemContainer, FilterTitle} from './ChessGridFilters';

const ViewModeContainer = styled.div`
    display: flex;
    flex-direction: row;

    .MuiAvatar-root {
        margin-right: 10px;
    }
`;

const DesktopsView = styled.div`
    @media only screen and (max-width: 960px) {
        display: none;
    }
`;

const ViewModeIcon = styled(Avatar)`
    &.MuiAvatar-root {
        background-color: transparent;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #4f4f4f;
        cursor: pointer;

        .MuiSvgIcon-root {
            width: 18px;
            height: 18px;
        }

        &.active,
        &:hover {
            background-color: #e84f1d;
            border: 1px solid #e84f1d;
            svg,
            path {
                fill: white;
            }
        }
    }
`;

function LevelIcon({value, onClick}) {
    return (
        <ViewModeIcon
            variant="rounded"
            className={classNames({
                active: value === ChessCellViewMode.FLOOR
            })}
            onClick={() => {
                onClick(ChessCellViewMode.FLOOR);
            }}
        >
            <SvgIcon width="18" height="18" viewBox="0 0 18 18">
                <path
                    d="M17.0854 3.06836H13.7972C13.292 3.06836 12.8826 3.51354 12.8826 4.06343V6.64656H10.5086C10.0033 6.64656 9.59382 7.09157 9.59382 7.64151V10.2248H7.21985C6.71447 10.2248 6.3052 10.6705 6.3052 11.2198V13.9275H3.81728C3.57452 13.9275 3.34188 14.0322 3.17043 14.2186C2.99883 14.4051 2.90259 14.6594 2.90259 14.9225L2.90288 17.0044C2.90288 17.5548 3.31246 18 3.81754 18H17.0854C17.5908 18 18.0001 17.5548 18.0001 17.0044V4.06339C18.0001 3.51354 17.5908 3.06836 17.0854 3.06836Z"
                    fill="#4F4F4F"
                />
                <path
                    d="M12.2719 0.200397C12.0365 -0.0621791 11.651 -0.0672254 11.4098 0.188245C7.49833 4.33423 3.77719 8.38369 0.178686 12.2989C0.0641875 12.4235 0 12.5927 0 12.7683V17.3089C0 17.6748 0.27289 17.9725 0.609744 17.9725C0.946265 17.9725 1.21964 17.675 1.21964 17.3089V13.0429C4.75975 9.19075 8.41973 5.21037 12.2606 1.13855C12.5016 0.883118 12.5066 0.462811 12.2719 0.200397Z"
                    fill="#4F4F4F"
                />
            </SvgIcon>
        </ViewModeIcon>
    );
}

function ChessGridPlusIcon({value, onClick}) {
    return (
        <ViewModeIcon
            variant="rounded"
            className={classNames({
                active: value === ChessCellViewMode.TILE_PLUS
            })}
            onClick={() => {
                onClick(ChessCellViewMode.TILE_PLUS);
            }}
        >
            <SvgIcon width="24" height="18" viewBox="0 0 24 18">
                <path d="M10 0V6H18V0H10ZM10 18H18V8H10V18ZM0 18H8V12H0V18ZM0 10H8V0H0V10Z" fill="#4F4F4F" />
                <path
                    d="M23.5536 15.0536H22.0357C21.9864 15.0536 21.9464 15.0136 21.9464 14.9643V13.4464C21.9464 13.1999 21.7465 13 21.5 13C21.2535 13 21.0536 13.1999 21.0536 13.4464V14.9643C21.0536 15.0136 21.0136 15.0536 20.9643 15.0536H19.4464C19.1999 15.0536 19 15.2535 19 15.5C19 15.7465 19.1999 15.9464 19.4464 15.9464H20.9643C21.0136 15.9464 21.0536 15.9864 21.0536 16.0357V17.5536C21.0536 17.8001 21.2535 18 21.5 18C21.7465 18 21.9464 17.8001 21.9464 17.5536V16.0357C21.9464 15.9864 21.9864 15.9464 22.0357 15.9464H23.5536C23.8001 15.9464 24 15.7465 24 15.5C24 15.2535 23.8001 15.0536 23.5536 15.0536Z"
                    fill="#4F4F4F"
                />
            </SvgIcon>
        </ViewModeIcon>
    );
}

function ChessGridIcon({value, onClick}) {
    return (
        <ViewModeIcon
            variant="rounded"
            className={classNames({
                active: value === ChessCellViewMode.TILE
            })}
            onClick={() => {
                onClick(ChessCellViewMode.TILE);
            }}
        >
            <SvgIcon width="18" height="18" viewBox="0 0 18 18">
                <path d="M10 0V6H18V0H10ZM10 18H18V8H10V18ZM0 18H8V12H0V18ZM0 10H8V0H0V10Z" fill="#4F4F4F" />
                <path
                    d="M23.5536 15.0536H22.0357C21.9864 15.0536 21.9464 15.0136 21.9464 14.9643V13.4464C21.9464 13.1999 21.7465 13 21.5 13C21.2535 13 21.0536 13.1999 21.0536 13.4464V14.9643C21.0536 15.0136 21.0136 15.0536 20.9643 15.0536H19.4464C19.1999 15.0536 19 15.2535 19 15.5C19 15.7465 19.1999 15.9464 19.4464 15.9464H20.9643C21.0136 15.9464 21.0536 15.9864 21.0536 16.0357V17.5536C21.0536 17.8001 21.2535 18 21.5 18C21.7465 18 21.9464 17.8001 21.9464 17.5536V16.0357C21.9464 15.9864 21.9864 15.9464 22.0357 15.9464H23.5536C23.8001 15.9464 24 15.7465 24 15.5C24 15.2535 23.8001 15.0536 23.5536 15.0536Z"
                    fill="#4F4F4F"
                />
            </SvgIcon>
        </ViewModeIcon>
    );
}

function ListIcon({value, onClick}) {
    return (
        <ViewModeIcon
            variant="rounded"
            className={classNames({
                active: value === ChessCellViewMode.LIST
            })}
            onClick={() => {
                onClick(ChessCellViewMode.LIST);
            }}
        >
            <SvgIcon width="18" height="18" viewBox="0 0 18 18">
                <path d="M0 0H3.98296V5.0067H0V0Z" fill="#4F4F4F" />
                <path d="M5.24878 0H18.0001V5.0067H5.24878V0Z" fill="#4F4F4F" />
                <path d="M0 6.49664H3.98296V11.5033H0V6.49664Z" fill="#4F4F4F" />
                <path d="M5.24878 6.49664H18.0001V11.5033H5.24878V6.49664Z" fill="#4F4F4F" />
                <path d="M0 12.9931H3.98296V18H0V12.9931Z" fill="#4F4F4F" />
                <path d="M5.24878 12.9931H18.0001V18H5.24878V12.9931Z" fill="#4F4F4F" />
            </SvgIcon>
        </ViewModeIcon>
    );
}

export function ViewModeFilters({mode, dispatch}) {
    const onClick = (e) => {
        dispatch({type: 'cellViewMode', payload: e});
    };

    return (
        <FilterItemContainer>
            <FilterTitle>Отображение</FilterTitle>
            <ViewModeContainer>
                {withTooltip(<ChessGridIcon value={mode} onClick={onClick} />, 'Плитка')}
                {withTooltip(
                    <DesktopsView>
                        <ChessGridPlusIcon value={mode} onClick={onClick} />
                    </DesktopsView>,
                    'Плитка+'
                )}
                {withTooltip(
                    <DesktopsView>
                        <ListIcon value={mode} onClick={onClick} />
                    </DesktopsView>,
                    'Список'
                )}
                {withTooltip(<LevelIcon value={mode} onClick={onClick} />, 'План этажа')}
            </ViewModeContainer>
        </FilterItemContainer>
    );
}
