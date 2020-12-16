import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import React, {Fragment} from 'react';
import styled from 'styled-components';
import {StyledLink} from '../styled';

const TitleContainer = styled.div`
    display: inline-flex;
    align-items: center;

    ${StyledLink} {
        display: inline-flex;
        margin-left: 4px;
    }
`;

interface TitleWithEditIconProps {
    editUrl: string;
    title: string;
    children?: any;
}

interface TitleWithoutEditIconProps {
    title: string;
    children?: any;
}

export function TitleWithEditIcon({editUrl, title, children}: TitleWithEditIconProps) {
    return (
        <Fragment>
            <Typography variant="h5" gutterBottom={true}>
                <TitleContainer>
                    <div>{title}</div>
                    <StyledLink to={editUrl}>
                        <EditIcon color="primary" />
                    </StyledLink>
                </TitleContainer>
            </Typography>
            {children}
        </Fragment>
    );
}

export function TitleWithoutEditIcon({title, children}: TitleWithoutEditIconProps) {
    return (
        <Fragment>
            <Typography variant="h5" gutterBottom={true}>
                <TitleContainer>
                    <div>{title}</div>
                </TitleContainer>
            </Typography>
            {children}
        </Fragment>
    );
}
