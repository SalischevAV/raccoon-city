import {FlatStatus} from '../../types/flat/flat';

const statusMap = new Map();
statusMap.set('Свободно', FlatStatus.FREE);
statusMap.set('Забронировано', FlatStatus.BOOKED);
statusMap.set('Оформление документов', FlatStatus.DOCUMENTS_IN_PROGRESS);
statusMap.set('Резерв', FlatStatus.RESERVED);
statusMap.set('Продано', FlatStatus.SOLD_OUT);
statusMap.set('Недоступно', FlatStatus.UNAVAILABLE);

export function transofrmValue(value: string, field: string | number): any {
    if (field === 'status') {
        return statusMap.get(value) || value;
    }

    return value;
}
