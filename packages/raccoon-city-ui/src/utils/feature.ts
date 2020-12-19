import {ApolloClient} from 'apollo-client';
import intersection from 'ramda/src/intersection';
import {GET_USER_INFO} from '../graphql/queries/userQuery';

export function isEnabled(client: ApolloClient<any> | any, features: string[]) {
    const data = client.readQuery({
        query: GET_USER_INFO
    });

    const {getUserInfo} = data;

    if (getUserInfo.role?.key === 'superAdmin') {
        return true;
    }

    if (intersection(getUserInfo.role?.features || [], features || []).length > 0) {
        return true;
    }

    return false;
}
