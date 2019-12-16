export const headerKeys = [
    {
        csvKeys: ['Дом'],
        headerValue: 'house'
    },
    {
        csvKeys: ['Номер квартиры'],
        headerValue: 'flatNumber'
    },
    {
        csvKeys: ['Полная стоимость'],
        headerValue: 'price'
    },
    {
        csvKeys: ['Этаж'],
        headerValue: 'level'
    },
    {
        csvKeys: ['Подъезд'],
        headerValue: 'entrance'
    },
    {
        csvKeys: ['Общая площадь, м2'],
        headerValue: 'area'
    },
    {
        csvKeys: ['Статус'],
        headerValue: 'status'
    },
    {
        csvKeys: ['Кол-во комнат'],
        headerValue: 'roomAmount'
    }
];

const headerMap = new Map<string, string>();
headerKeys.forEach((item) => {
    item.csvKeys.forEach((key) => {
        headerMap.set(key, item.headerValue);
    });
});

export function transformHeader(header: string): string {
    return headerMap.get(header.trim()) || header;
}
