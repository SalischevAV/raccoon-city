import {MutationTuple, useMutation} from '@apollo/react-hooks';
import {Fab} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import styled from 'styled-components';
import {ImageType, PreviewImage} from '../../../shared/types/apartmentComplex.types';
import {ImagePreview} from '../../Images/ImagePreview/ImagePreview';
import {VRDialog} from '../../Images/VRDialog/VRDialog';
import {DELETE_IMAGE, UPLOAD_IMAGE} from '../../../../graphql/mutations/layoutMutation';
import {GET_LAYOUT} from '../../../../graphql/queries/layoutQuery';

interface PreviewComponentProps {
    uuid: string;
    images: PreviewImage[];
    mode: ImageType;
}

interface NewVRImageProps {
    uuid: string;
    mutation: MutationTuple<any, any>;
    mode: ImageType;
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

function NewVRImage({uuid, mode, mutation}: NewVRImageProps) {
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
            <VRDialog mutation={mutation} setOpen={setOpen} open={open} params={{uuid, mode}} />
        </ButtonContainer>
    );
}

export function VRImages(props: PreviewComponentProps) {
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
        <Grid container={true} spacing={2} alignItems="center">
            <Grid item={true} xs={12} md={3}>
                <NewVRImage mutation={mutation} uuid={props.uuid} mode={props.mode} />
            </Grid>
            {props.images.map((image) => {
                return (
                    <Grid item={true} xs={12} md={3} key={image.uuid}>
                        <ImagePreview
                            deleteMutation={deleteMutation}
                            uuid={props.uuid}
                            imageUuid={image.uuid}
                            mode={props.mode}
                            url={image.previewImageUrl}
                            title={image.name}
                        >
                            {(toggle: (a: boolean) => void, state: boolean, params: any) => {
                                return (
                                    <VRDialog
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
    );
}
