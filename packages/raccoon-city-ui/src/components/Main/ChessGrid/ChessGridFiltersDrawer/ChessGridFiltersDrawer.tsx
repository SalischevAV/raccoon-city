import {IconButton, SvgIcon, SwipeableDrawer, useMediaQuery, useTheme} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {ChessGridFilters} from '../ChessGridFilters/ChessGridFilters';
import {ChessGridDesktopFilters} from '../ChessGridFilters/ChessGridDesktopFilters';

const StyledDrawer = styled(SwipeableDrawer)`
    .MuiDrawer-paper {
        padding: 24px;
        position: relative;
        overflow: visible;
    }
    .MuiDrawer-paperAnchorRight {
        width: 100%;
    }
`;

const StyledIcon = styled(IconButton)``;

const IconContainer = styled.div`
    position: absolute;
    right: 24px;
    top: 24px;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 889px) {
        margin-top: 32px;
    }
`;

export function ShowFilter({setShownFilters}) {
    return (
        <StyledIcon
            onClick={() => {
                setShownFilters(true);
            }}
        >
            <SvgIcon>
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.5406 14.8077C11.0628 15.4899 10.9067 14.9214 10.9067 28.5185C10.9067 29.7352 12.4446 30.4316 13.5286 29.7038C18.1604 26.5517 19.0859 26.2787 19.0859 24.8043C19.0859 14.8958 18.9579 15.4531 19.452 14.8077L26.9736 5.56641H3.01904L10.5406 14.8077Z"
                        fill="#E84F1D"
                    />
                    <path
                        d="M29.8149 0.753516C29.5461 0.288867 29.019 0 28.4388 0H1.55399C0.300814 0 -0.436551 1.276 0.282314 2.20313C0.288221 2.21203 0.200716 2.10393 1.5884 3.8086H28.4043C29.5868 2.35588 30.3773 1.72822 29.8149 0.753516Z"
                        fill="#E84F1D"
                    />
                </svg>
            </SvgIcon>
        </StyledIcon>
    );
}

export function HideFilter({setShownFilters}) {
    return (
        <StyledIcon
            onClick={() => {
                setShownFilters(false);
            }}
        >
            <SvgIcon>
                <svg width="21" height="20" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.5406 14.8077C11.0628 15.4899 10.9067 14.9214 10.9067 28.5185C10.9067 29.7352 12.4446 30.4316 13.5286 29.7038C18.1604 26.5517 19.0859 26.2787 19.0859 24.8043C19.0859 14.8958 18.9579 15.4531 19.452 14.8077L26.9736 5.56641H3.01904L10.5406 14.8077Z"
                        fill="#E84F1D"
                    />
                    <path
                        d="M29.8149 0.753516C29.5461 0.288867 29.019 0 28.4388 0H1.55399C0.300814 0 -0.436551 1.276 0.282314 2.20313C0.288221 2.21203 0.200716 2.10393 1.5884 3.8086H28.4043C29.5868 2.35588 30.3773 1.72822 29.8149 0.753516Z"
                        fill="#E84F1D"
                    />
                    <path
                        d="M27.65 25.0003L30.7436 21.9067C31.0855 21.5649 31.0855 21.0107 30.7436 20.6694L30.3312 20.257C29.9893 19.9151 29.4351 19.9151 29.0939 20.257L26.0003 23.3505L22.9067 20.2564C22.5649 19.9145 22.0107 19.9145 21.6694 20.2564L21.2564 20.6688C20.9145 21.0107 20.9145 21.5649 21.2564 21.9062L24.3505 25.0003L21.257 28.0939C20.9151 28.4358 20.9151 28.9899 21.257 29.3312L21.6694 29.7436C22.0112 30.0855 22.5654 30.0855 22.9067 29.7436L26.0003 26.65L29.0939 29.7436C29.4358 30.0855 29.9899 30.0855 30.3312 29.7436L30.7436 29.3312C31.0855 28.9893 31.0855 28.4351 30.7436 28.0939L27.65 25.0003Z"
                        fill="#E84F1D"
                    />
                </svg>
            </SvgIcon>
        </StyledIcon>
    );
}

export function ChessGridFiltersDrawer({setShownFilters, filterShown, ...props}: any) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    if (!matches) {
        return <ChessGridDesktopFilters {...props} />;
    }
    return (
        <StyledDrawer
            onOpen={() => {
                // silence
            }}
            ModalProps={{
                keepMounted: true
            }}
            anchor={matches ? 'right' : 'top'}
            open={filterShown}
            onClose={() => {
                setShownFilters(false);
            }}
        >
            <FilterContainer>
                <IconContainer>
                    <HideFilter setShownFilters={setShownFilters} />
                </IconContainer>
                <ChessGridFilters {...props} setShownFilters={setShownFilters} />
            </FilterContainer>
        </StyledDrawer>
    );
}
