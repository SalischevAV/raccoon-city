import {MutationTuple} from '@apollo/react-hooks';
import {CardActionArea} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {Feature} from '../../../shared/components/features/Feature';
import {CardHeaderNoMenu} from '../../../shared/components/menus/CardHeaderNoMenu';
import {CardHeaderWithMenu} from '../../../shared/components/menus/CardHeaderWithMenu';
import {StyledCard, StyledCardMedia} from '../../../shared/components/styled';
import {ImageType} from '../../../shared/types/apartmentComplex.types';

interface PreviewComponentProps {
    uuid: string;
    imageUuid: string;
    title?: string;
    mode: ImageType;
    removeFeature?: string;
    deleteMutation: MutationTuple<any, any>;
    url: string;
    children: (setOpen: (a: boolean) => void, open: boolean, params: any) => React.ReactNode;
}

export function ImagePreview(props: PreviewComponentProps) {
    const [open, setOpen] = React.useState(false);
    const [deleteImage] = props.deleteMutation;

    const handleRemove = async () => {
        await deleteImage({
            variables: {
                mode: props.mode,
                imageId: props.imageUuid,
                uuid: props.uuid
            }
        });
    };

    return (
        <StyledCard>
            <Feature
                features={props.removeFeature ? [props.removeFeature] : []}
                fallbackComponent={<CardHeaderNoMenu title={props.title} />}
            >
                <CardHeaderWithMenu title={props.title}>
                    <MenuItem onClick={handleRemove}>Удалить</MenuItem>
                </CardHeaderWithMenu>
            </Feature>
            <CardActionArea
                onClick={() => {
                    setOpen(true);
                }}
            >
                <StyledCardMedia image={props.url} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" />
                </CardContent>
            </CardActionArea>
            {props.children(setOpen, open, {uuid: props.uuid, mode: props.mode})}
        </StyledCard>
    );
}
