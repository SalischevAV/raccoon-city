import React from 'react';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const ButtonContainer = styled.div`
    width: 345px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledFab = styled(Fab)`
    &.MuiFab-root {
        width: 140px;
        height: 140px;
        .MuiSvgIcon-root {
            width: 3em;
            height: 3em;
        }
    }
`;

export function AddButton({url}) {
    return (
        <ButtonContainer>
            <Link to={url}>
                <StyledFab color="secondary" aria-label="add">
                    <AddIcon />
                </StyledFab>
            </Link>
        </ButtonContainer>
    );
}
