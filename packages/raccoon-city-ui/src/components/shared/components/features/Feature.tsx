import {useQuery} from '@apollo/react-hooks';
import {GET_USER_INFO} from '../../../../graphql/queries/userQuery';
import intersection from 'ramda/src/intersection';

export function Feature({children, features, fallbackComponent}: any) {
    const {data} = useQuery(GET_USER_INFO, {
        fetchPolicy: 'cache-only'
    });

    const {getUserInfo} = data;

    if (getUserInfo.role?.key === 'superAdmin') {
        return children;
    }

    if (intersection(getUserInfo.role?.features || [], features || []).length > 0) {
        return children;
    }

    if (fallbackComponent) {
        return fallbackComponent;
    }

    return null;
}
