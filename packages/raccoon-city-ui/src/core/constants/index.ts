import {FlatStatus} from '../../components/shared/types/flat.types';

export const apartmentComplexDefaultImage =
    'https://images.all-free-download.com/images/graphicthumb/city_background_buildings_icon_colored_flat_outline_6838998.jpg';

export const houseDefaultImage =
    'https://images.all-free-download.com/images/graphicthumb/city_background_buildings_icon_colored_flat_outline_6838998.jpg';

export const flatDefaultImage =
    'https://images.all-free-download.com/images/graphicthumb/city_background_buildings_icon_colored_flat_outline_6838998.jpg';

export const FLAT_STATUSES = [
    {
        value: FlatStatus.UNAVAILABLE,
        label: 'Недоступно'
    },
    {
        value: FlatStatus.SOLD_OUT,
        label: 'Продано'
    },
    {
        value: FlatStatus.RESERVED,
        label: 'Резерв'
    },
    {
        value: FlatStatus.DOCUMENTS_IN_PROGRESS,
        label: 'Оформление документов'
    },
    {
        value: FlatStatus.BOOKED,
        label: 'Забронировано'
    },
    {
        value: FlatStatus.FREE,
        label: 'Свободно'
    }
];

export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';
export const API_TOKEN = 'apiToken';
