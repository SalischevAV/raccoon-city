import {useQuery} from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ALL_APARTMENT_COMPLEXES} from '../../../graphql/queries/apartmentComplexQuery';
import {setRouteParams, setTitle} from '../../../redux/actions';
import {ApartmentComplexType, ImageType} from '../../shared/types/apartmentComplex.types';
import {AddProperty} from './AddApartmentComplexList/AddProperty';
import {ApartmentComplex} from './ApartmentComplex/ApartmentComplex';
import {CardSkeleton} from '../../shared/components/skeletons/CardSkeleton';
import {Feature} from '../../shared/components/features/Feature';
import {FEATURES} from '../../../core/constants/features';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    })
);

export const ApartmentComplexList = connect(null, (dispatch) => ({
    applyParams: (params) => dispatch(setRouteParams(params)),
    applyTitle: (title) => dispatch(setTitle(title))
}))(({applyParams, applyTitle}) => {
    const params = useParams();

    useEffect(() => {
        applyParams(params);
        applyTitle('Жилищные комплексы');
    }, [params]); // eslint-disable-line

    const classes = useStyles();
    const {developerUuid} = useParams();
    const {loading, error, data} = useQuery<{getAllApartmentComplexes: ApartmentComplexType[]}>(
        ALL_APARTMENT_COMPLEXES,
        {
            variables: {
                developerUuid
            },
            fetchPolicy: 'cache-and-network'
        }
    );
    if (loading) {
        return <CardSkeleton />;
    }
    if (error) {
        return <p>Error :(</p>;
    }

    return (
        <div className={classes.root}>
            <Grid container={true} spacing={3} alignItems="center">
                <Feature features={[FEATURES.ADD_APARTMENT_COMPLEX]}>
                    <Grid item={true} xs={12} md={3}>
                        <AddProperty />
                    </Grid>
                </Feature>
                {data &&
                    data.getAllApartmentComplexes.map((complex: ApartmentComplexType) => {
                        const chessGridImage = complex.images[ImageType.CHESS_GRID];
                        const imageUrl = chessGridImage ? chessGridImage.downloadUrl : undefined;

                        return (
                            <Grid item={true} xs={12} md={3} key={complex.id}>
                                <Grid container justify="center">
                                    <ApartmentComplex name={complex.name} id={complex.id} imageUrl={imageUrl} />
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
        </div>
    );
});

export default ApartmentComplexList;
