import {Flat} from '../../shared/types/flat.types';
import {GroupedFlats} from '../../../graphql/queries/houseQuery';

function checkRoomAmount(flat, selectedRoomAmount) {
    if (!!selectedRoomAmount && Object.values(selectedRoomAmount).some((value) => !!value)) {
        return (
            selectedRoomAmount[flat.roomAmount] === true || (selectedRoomAmount['4+'] && Number(flat.roomAmount) >= 4)
        );
    }

    return true;
}

function checkPrice(flat: Flat, price) {
    return price.minPrice <= flat.squarePrice && flat.squarePrice <= price.maxPrice;
}

function checkArea(flat: Flat, price) {
    return price.minArea <= flat.area && flat.area <= price.maxArea;
}

export function isActive(flat: Flat, filters) {
    return (
        checkRoomAmount(flat, filters.selectedRoomAmount) &&
        checkPrice(flat, filters.price) &&
        checkArea(flat, filters.area)
    );
}

export function showMutedFlats(items, filters) {
    items.forEach((section: GroupedFlats) => {
        section.levels.forEach((level) => {
            level.flats.forEach((flat) => {
                flat.isActive = isActive(flat, filters);
            });
        });
    });
    return items;
}
