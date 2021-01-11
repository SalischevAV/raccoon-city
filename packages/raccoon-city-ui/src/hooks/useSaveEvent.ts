import {useMutation} from '@apollo/react-hooks';
import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {UserInfoContext} from '../components/Main/Main';
import {SAVE_HISTORY_EVENT} from '../graphql/mutations/authMutation';
import {GET_HISTORY_EVENTS} from '../graphql/queries/userQuery';

export enum HistoryEventType {
    CHANGE_FLAT_STATUS = 'CHANGE_FLAT_STATUS'
}

export const HistoryTypesLabels = {
    [HistoryEventType.CHANGE_FLAT_STATUS]: 'Изменение статуса'
};
interface HistoryEventInfo {
    user: string;
    eventType: HistoryEventType;
    developer: string;
}

interface HistoryEventPayload {
    payload: string;
    date?: string;
}

function saveHistoryEvent(info: HistoryEventInfo, saveEvent: any) {
    return async function(payload: HistoryEventPayload) {
        const historyEvent = {
            date: new Date().toLocaleDateString(),
            ...info,
            ...payload
        };

        await saveEvent({
            variables: {
                historyEvent
            },
            refetchQueries: [
                {
                    query: GET_HISTORY_EVENTS,
                    variables: {
                        developer: info.developer,
                        page: 1
                    }
                }
            ]
        });
    };
}

export function useSaveHistoryEvent(eventType: HistoryEventType) {
    const {id: user} = useContext(UserInfoContext);
    const {developerUuid: developer} = useParams() as any;
    const [saveEvent] = useMutation(SAVE_HISTORY_EVENT);

    const carriedSaveHistoryEvent = saveHistoryEvent(
        {
            user,
            eventType,
            developer
        },
        saveEvent
    );

    return carriedSaveHistoryEvent;
}
