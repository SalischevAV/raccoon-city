import {Fab} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import {Fragment} from 'react';
import styled from 'styled-components';
import {MutationTuple, useMutation} from '@apollo/react-hooks';
import {PhotoDialog} from '../../Images/PhotoDialog/PhotoDialog';
import {ImagePreview} from '../../Images/ImagePreview/ImagePreview';
import {ImageType, NamedImage} from '../../../shared/types/apartmentComplex.types';
import {DELETE_IMAGE, UPLOAD_IMAGE} from '../../../../graphql/mutations/layoutMutation';
import {GET_LAYOUT} from '../../../../graphql/queries/layoutQuery';

interface PreviewComponentProps {
    uuid: string;
    images: NamedImage[];
    mode: ImageType;
}

interface NewVRImageProps {
    uuid: string;
    mode: ImageType;
    mutation: MutationTuple<any, any>;
}

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

function NewPhoto({uuid, mode, mutation}: NewVRImageProps) {
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
            <PhotoDialog mutation={mutation} setOpen={setOpen} open={open} params={{uuid, mode}} />
        </ButtonContainer>
    );
}

export function Photos(props: PreviewComponentProps) {
    const mutation = useMutation(UPLOAD_IMAGE, {
        refetchQueries: [
            {
                query: GET_LAYOUT,
                variables: {
                    layoutId: props.uuid
                }
            }
        ]
    });

    const deleteMutation = useMutation(DELETE_IMAGE, {
        refetchQueries: [
            {
                query: GET_LAYOUT,
                variables: {
                    layoutId: props.uuid
                }
            }
        ]
    });

    return (
        <Fragment>
            <Grid container={true} spacing={3} alignItems="center">
                <Grid item={true} xs={12} md={3}>
                    <NewPhoto mutation={mutation} uuid={props.uuid} mode={props.mode} />
                </Grid>
                {props.images.map((image) => {
                    return (
                        <Grid item={true} xs={12} md={3} key={image.uuid}>
                            <ImagePreview
                                deleteMutation={deleteMutation}
                                uuid={props.uuid}
                                imageUuid={image.uuid}
                                mode={props.mode}
                                url={image.downloadUrl}
                                title={image.name}
                            >
                                {(toggle: (a: boolean) => void, state: boolean, params: any) => {
                                    return (
                                        <PhotoDialog
                                            mutation={mutation}
                                            setOpen={toggle}
                                            open={state}
                                            params={params}
                                            downloadLink={image.downloadUrl}
                                        />
                                    );
                                }}
                            </ImagePreview>
                        </Grid>
                    );
                })}
            </Grid>
        </Fragment>
    );
}
