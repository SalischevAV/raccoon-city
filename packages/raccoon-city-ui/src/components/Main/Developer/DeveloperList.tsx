import {useMutation, useQuery} from '@apollo/react-hooks';
import {CardActionArea} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useContext} from 'react';
import {UserInfoContext} from '../Main';
import {connect} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {apartmentComplexDefaultImage} from '../../../core/constants';
import {FEATURES} from '../../../core/constants/features';
import {DELETE_DEVELOPER} from '../../../graphql/mutations/developerMutaion';
import {GET_DEVELOPERS} from '../../../graphql/queries/developerQuery';
import {setRouteParams, setTitle} from '../../../redux/actions';
import {AddButton} from '../../shared/components/buttons/AddButton';
import {Confirmation} from '../../shared/components/dialogs/ConfirmDialog';
import {Feature} from '../../shared/components/features/Feature';
import {CardHeaderNoMenu} from '../../shared/components/menus/CardHeaderNoMenu';
import {CardHeaderWithMenu} from '../../shared/components/menus/CardHeaderWithMenu';
import {CardSkeleton} from '../../shared/components/skeletons/CardSkeleton';
import {StyledCard, StyledCardMedia, StyledLink} from '../../shared/components/styled';

export interface DeveloperCardProps {
    id: string;
    name: string;
    imageUrl?: string;
}

function DeveloperCard(props: DeveloperCardProps) {
    const [deleteMutation] = useMutation(DELETE_DEVELOPER);
    return (
        <StyledCard elevation={3}>
            <Feature features={[FEATURES.CREATE_DEVELOPER]} fallbackComponent={<CardHeaderNoMenu title={props.name} />}>
                <CardHeaderWithMenu title={props.name}>
                    <StyledLink to={`/developer/${props.id}/edit`}>
                        <MenuItem>Редактировать</MenuItem>
                    </StyledLink>
                    <StyledLink to={`/developer/${props.id}/amo`}>
                        <MenuItem>AMO интеграция</MenuItem>
                    </StyledLink>
                    <Confirmation>
                        {(confirmFn: (cb: () => void) => void) => {
                            return (
                                <MenuItem
                                    onClick={() => {
                                        confirmFn(() => async () => {
                                            await deleteMutation({
                                                variables: {
                                                    id: props.id
                                                },
                                                refetchQueries: [
                                                    {
                                                        query: GET_DEVELOPERS
                                                    }
                                                ]
                                            });
                                        });
                                    }}
                                >
                                    Удалить
                                </MenuItem>
                            );
                        }}
                    </Confirmation>
                </CardHeaderWithMenu>
            </Feature>
            <CardActionArea>
                <Link to={`/developers/${props.id}/apartmentComplexes`}>
                    <StyledCardMedia image={props.imageUrl || apartmentComplexDefaultImage} title={props.name} />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" />
                    </CardContent>
                </Link>
            </CardActionArea>
        </StyledCard>
    );
}

const EmptyDevelopersContainer = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    h4 {
        margin-bottom: 32px;
    }
`;

function EmptyDevelopers() {
    return (
        <EmptyDevelopersContainer>
            <Typography component="h4" variant="h4" gutterBottom={true}>
                Вы еще не создали застройщика. Желаете создать?
            </Typography>
            <AddButton url={'/developer/new'} />
        </EmptyDevelopersContainer>
    );
}

export const DeveloperList = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();
    const userInfo = useContext(UserInfoContext);

    useEffect(() => {
        applyParams(params);
        applyTitle('Застройщики');
    }, [params]); // eslint-disable-line
    const {loading, error, data} = useQuery(GET_DEVELOPERS, {
        fetchPolicy: 'cache-and-network'
    });
    if (loading) {
        return <CardSkeleton />;
    }

    if (error || !data) {
        return <span>Error</span>;
    }

    if (data.getDevelopers.length === 0) {
        return <EmptyDevelopers />;
    }

    const developersList =
        userInfo.role.key === 'superAdmin'
            ? data.getDevelopers
            : data.getDevelopers.filter((developer) => developer.id === userInfo.developer?.id);

    return (
        <Grid container={true} spacing={3} alignItems="center">
            <Feature features={[FEATURES.CREATE_DEVELOPER]}>
                <Grid item={true} xs={12} md={3}>
                    <AddButton url={'/developer/new'} />
                </Grid>
            </Feature>

            {developersList.map((developer) => {
                return (
                    <Grid item={true} xs={12} md={3} key={developer.id}>
                        <Grid container justify="center">
                            <DeveloperCard
                                id={developer.id}
                                name={developer.name}
                                imageUrl={developer?.logo?.downloadUrl}
                            />
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
});

export default DeveloperList;
