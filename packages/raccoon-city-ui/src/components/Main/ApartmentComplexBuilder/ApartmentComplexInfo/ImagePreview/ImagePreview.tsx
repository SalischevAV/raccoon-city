import {CardActionArea, createStyles, makeStyles, Theme} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {ImageType} from '../../../../shared/types/apartmentComplex.types';
import {useMutation} from '@apollo/react-hooks';
import {APARTMENT_COMPLEX_IMAGES} from '../../../../../graphql/queries/apartmentComplexQuery';
import {DELETE_IMAGE} from '../../../../../graphql/mutations/apartmentComplexMutation';
import {CardHeaderWithMenu} from '../../../../shared/components/menus/CardHeaderWithMenu';

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

interface PreviewComponentProps {
    uuid: string;
    imageUuid: string;
    title?: string;
    mode: ImageType;
    url: string;
    children: (setOpen: (a: boolean) => void, open: boolean, params: any) => React.ReactNode;
}

export function ImagePreview(props: PreviewComponentProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [deleteImage] = useMutation(DELETE_IMAGE, {
        refetchQueries: [
            {
                query: APARTMENT_COMPLEX_IMAGES,
                variables: {
                    uuid: props.uuid
                }
            }
        ]
    });

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
        <Card className={classes.card}>
            <CardHeaderWithMenu title={props.title}>
                <MenuItem onClick={handleRemove}>Удалить</MenuItem>
            </CardHeaderWithMenu>
            <CardActionArea
                onClick={() => {
                    setOpen(true);
                }}
            >
                <CardMedia className={classes.media} image={props.url} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" />
                </CardContent>
            </CardActionArea>
            {props.children(setOpen, open, {uuid: props.uuid, mode: props.mode})}
        </Card>
    );
}
