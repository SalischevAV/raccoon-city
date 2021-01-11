export interface HouseFormValues {
    name: string;
    price: number;
    parking: string;
    order: number;
    beginDate: any;
    endDate: any;
    visibleInCarousel: string;
}

export function getHouseDataVariables(houseData: HouseFormValues) {
    const {name, price, parking, order, beginDate, endDate, visibleInCarousel} = houseData;
    return {
        name,
        price: Number(price),
        parking: parking === 'true',
        order: Number(order),
        beginDate,
        endDate,
        visibleInCarousel: visibleInCarousel === 'true'
    };
}
