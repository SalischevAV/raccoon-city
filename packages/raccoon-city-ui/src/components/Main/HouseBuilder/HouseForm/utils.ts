export interface HouseFormValues {
    name: string;
    price: number;
    parking: string;
    order: number;
    beginDate: any;
    endDate: any;
}

export function getHouseDataVariables(houseData: HouseFormValues) {
    const {name, price, parking, order, beginDate, endDate} = houseData;
    return {
        name,
        price: Number(price),
        parking: parking === 'true',
        order: Number(order),
        beginDate,
        endDate
    };
}
