import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import {StyledNavLink} from '../../../shared/components/styled';

export const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
`;

export const StyledLink = styled(StyledNavLink)`
    &.Mui-selected > div {
        color: white;
        background-color: #37485c;
        &:hover {
            background-color: #5d7a9c;
        }
    }
`;
