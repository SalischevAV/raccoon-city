export interface City {
    key: string;
    displayName: string;
    districts: District[];
    undergroundStations: UndergroundStation[];
}

export interface District {
    key: string;
    displayName: string;
}

export interface UndergroundStation {
    key: string;
    displayName: string;
}