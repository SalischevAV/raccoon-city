import {MutationTuple, useMutation, useQuery} from '@apollo/react-hooks';
import {createStyles, Fab, makeStyles, TableBody, Theme} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import {useParams} from 'react-router';
import styled from 'styled-components';
import {CREATE_LAYOUT} from '../../../graphql/mutations/layoutMutation';
import {GET_LAYOUTS} from '../../../graphql/queries/layoutQuery';
import {HouseLayout} from '../../shared/types/layout.types';
import {LayoutDialog} from '../Images/LayoutDialog/LayoutDialog';
import {ChessGridDialog} from './ChessGridDialog/ChessGridDialog';

const ButtonContainer = styled.div`
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

interface NewLayoutProps {
    uuid: string;
    mutation: MutationTuple<any, any>;
}

function CreateLayout({uuid, mutation}: NewLayoutProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <ButtonContainer>
            <StyledFab
                color="secondary"
                aria-label="add"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <AddIcon />
            </StyledFab>
            <LayoutDialog mutation={mutation} setOpen={setOpen} open={open} params={{uuid}} />
        </ButtonContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 345
        },
        media: {
            height: 0,
            paddingTop: '56.25%' // 16:9
        }
    })
);

const LayoutImage = styled.img`
    max-height: 120px;
`;

function HouseLayouts() {
    const {houseUuid} = useParams();
    const {loading, error, data} = useQuery(GET_LAYOUTS, {
        variables: {
            houseId: houseUuid
        }
    });

    if (loading || error) {
        return null;
    }

    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Планировка</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Помещения</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.getLayouts.map((layout: HouseLayout) => {
                        return (
                            <TableRow hover tabIndex={-1} key={layout.id}>
                                <TableCell>
                                    <LayoutImage src={layout.image.previewImageUrl} />
                                </TableCell>
                                <TableCell>{layout.name}</TableCell>
                                <TableCell>
                                    <span>Flats</span>
                                    <ChessGridDialog />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function LayoutEditor() {
    const {houseUuid: uuid} = useParams();
    const mutation = useMutation(CREATE_LAYOUT, {
        refetchQueries: [
            {
                query: GET_LAYOUTS,
                variables: {
                    houseId: uuid
                }
            }
        ]
    });

    if (!uuid) {
        return null;
    }

    return (
        <div>
            <CreateLayout mutation={mutation} uuid={uuid} />
            <HouseLayouts />
        </div>
    );
}
