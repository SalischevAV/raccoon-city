import {cities} from '../../constants/cities';
import {apartmentComplexTypes} from '../../constants/apartmentComplexTypes';
import {complexClasses} from '../../constants/complexClasses';
import {
    ClientInterests,
    ClientSources,
    ClientStatuses,
    LeadStatuses,
    PaymentProviders,
    PaymentTypes,
    PropertyTypes,
    TradeSources,
    TradeStates
} from '../../constants/tradeConstants';
import {UserRoleModel} from '../../db/models/userRole';

export const constants = {
    cities: () => {
        return cities;
    },
    apartmentComplexTypes: () => {
        return apartmentComplexTypes;
    },
    apartmentComplexClasses: () => {
        return complexClasses;
    },
    userRoles: () => {
        return UserRoleModel.find().exec();
    },
    tradeStates: () => {
        return TradeStates;
    },
    tradeSources: () => {
        return TradeSources;
    },
    leadStatuses: () => {
        return LeadStatuses;
    },
    clientInterests: () => {
        return ClientInterests;
    },
    propertyTypes: () => {
        return PropertyTypes;
    },
    paymentTypes: () => {
        return PaymentTypes;
    },
    paymentProviders: () => {
        return PaymentProviders;
    },
    clientStatuses: () => {
        return ClientStatuses;
    },
    clientSources: () => {
        return ClientSources;
    }
};
