import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// @ts-ignore
import {Pannellum} from 'pannellum-react';
import React, {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';
import {StyledDropzone} from '../../../shared/components/dropzone/Dropzone';
import {ImageType} from '../../../shared/types/apartmentComplex.types';
import {MutationTuple} from '@apollo/react-hooks/lib/types';

const EditorContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export interface ImageDialogProps {
    setOpen: (state: boolean) => void;
    open: boolean;
    downloadLink?: string;
    params: {
        uuid: string;
        mode: ImageType;
    };
    mutation: MutationTuple<any, any>;
}

const panoramaProps = {
    haov: 180,
    minYaw: -90,
    maxYaw: 90
};

export function VRDialog({setOpen, open, params, downloadLink, mutation}: ImageDialogProps) {
    const [image, setImage] = useState<any>();
    const [name, setName] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState(downloadLink);
    const {uuid, mode} = params;

    useEffect(() => {
        if (open) {
            setPreviewUrl(downloadLink);
        }
    }, [open]);

    const [uploadFile, {loading}] = mutation;

    const handleClose = () => {
        setTimeout(() => {
            setImage(undefined);
            setPreviewUrl(undefined);
            setName(undefined);
        }, 200);
        setOpen(false);
    };

    const handleDrop = (dropped: any) => {
        setImage(dropped);
        const reader = new FileReader();
        reader.readAsDataURL(dropped);

        reader.onloadend = (e) => {
            setPreviewUrl(reader.result as string);
        };
    };

    const onSave = async () => {
        await uploadFile({
            variables: {
                file: image,
                uuid,
                mode,
                name
            }
        });
        handleClose();
    };
    const additionalProps = mode === ImageType.HALF_VR ? panoramaProps : {};
    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'md'}>
            <DialogTitle id="form-dialog-title">Добавить изображение</DialogTitle>
            <DialogContent>
                {!previewUrl && <StyledDropzone onDrop={handleDrop} />}
                {previewUrl && (
                    <Fragment>
                        <EditorContainer>
                            <div>
                                <Pannellum
                                    width="100%"
                                    height="500px"
                                    image={previewUrl}
                                    pitch={10}
                                    yaw={180}
                                    hfov={110}
                                    autoLoad={true}
                                    {...additionalProps}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Название"
                                    margin="normal"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </div>
                        </EditorContainer>
                    </Fragment>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button disabled={!image || loading || !name} onClick={onSave} color="primary">
                    {loading && <CircularProgress size={30} thickness={5} />}
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
