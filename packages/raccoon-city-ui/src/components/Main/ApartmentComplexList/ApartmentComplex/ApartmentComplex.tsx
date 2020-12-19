import {useMutation} from '@apollo/react-hooks';
import {CardActionArea} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {apartmentComplexDefaultImage} from '../../../../core/constants';
import {FEATURES} from '../../../../core/constants/features';
import {DELETE_APARTMENT_COMPLEX} from '../../../../graphql/mutations/apartmentComplexMutation';
import {ALL_APARTMENT_COMPLEXES} from '../../../../graphql/queries/apartmentComplexQuery';
import {Confirmation} from '../../../shared/components/dialogs/ConfirmDialog';
import {Feature} from '../../../shared/components/features/Feature';
import {CardHeaderWithMenu} from '../../../shared/components/menus/CardHeaderWithMenu';
import {StyledCard, StyledCardMedia, StyledLink} from '../../../shared/components/styled';

export interface ApartmentComplexProps {
    id: string;
    name: string;
    imageUrl?: string;
}

export function ApartmentComplex(props: ApartmentComplexProps) {
    const {developerUuid} = useParams() as any;
    const [deleteMutation] = useMutation(DELETE_APARTMENT_COMPLEX, {
        refetchQueries: [
            {
                query: ALL_APARTMENT_COMPLEXES,
                variables: {
                    developerUuid
                }
            }
        ]
    });

    return (
        <StyledCard>
            <CardHeaderWithMenu title={props.name}>
                <StyledLink to={`/developers/${developerUuid}/apartmentComplex/${props.id}/overview/info`}>
                    <MenuItem>Детали</MenuItem>
                </StyledLink>
                <Feature features={[FEATURES.ADD_APARTMENT_COMPLEX]}>
                    <StyledLink to={`/developers/${developerUuid}/apartmentComplex/${props.id}/edit`}>
                        <MenuItem>Редактировать</MenuItem>
                    </StyledLink>
                    <Confirmation>
                        {(confirmFn: (cb: () => void) => void) => {
                            return (
                                <MenuItem
                                    onClick={() => {
                                        confirmFn(() => async () => {
                                            await deleteMutation({
                                                variables: {
                                                    uuid: props.id
                                                }
                                            });
                                        });
                                    }}
                                >
                                    Удалить
                                </MenuItem>
                            );
                        }}
                    </Confirmation>
                </Feature>
            </CardHeaderWithMenu>
            <CardActionArea>
                <Link to={`/developers/${developerUuid}/apartmentComplex/${props.id}/overview/info`}>
                    <StyledCardMedia image={props.imageUrl || apartmentComplexDefaultImage} title={props.name} />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" />
                    </CardContent>
                </Link>
            </CardActionArea>
        </StyledCard>
    );
}
