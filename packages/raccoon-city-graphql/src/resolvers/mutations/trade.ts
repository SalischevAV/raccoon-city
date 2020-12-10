import {Context} from '../../utils';
import {Trade, TradeModel} from '../../db/models/trade';
import {ContactModel} from '../../db/models/contact';
import {logger} from '../../aws/logger';
import axios from 'axios';
import {ApolloError} from 'apollo-server';

async function sendUserToAmo(url: string, user: any) {
    try {
        logger.info(`sending flat request to ${url}`)
        const response = await axios.post(url, user);
        return response.status;
    } catch (err) {
        logger.log({
            level: 'error',
            message: err.message
        });
        throw new ApolloError(err.message);
    }
}

export const tradeMutation = {
    async createTrade(parent, args, ctx: Context): Promise<Trade> {
        const {developerUuid, trade} = args;
        let tradeNumber = 1;
        const maxNumberTrade = await TradeModel.findOne({})
            .sort('-tradeNumber')
            .exec();
        if (maxNumberTrade) {
            tradeNumber = maxNumberTrade.tradeNumber + 1;
        }

        let contact;
        if (trade.existingContact) {
            contact = trade.existingContact;
        } else if (trade.newContact) {
            const contacts = await ContactModel.find({
                isDeleted: false,
                phones: {
                    $elemMatch: {$in: trade.newContact.phones}
                }
            }).exec();

            if (contacts.length > 0) {
                const secondaryMatch = contacts.find((c) => {
                    return c?.name === trade.newContact?.name || c?.email === trade.newContact?.email;
                });
                if (secondaryMatch) {
                    contact = secondaryMatch.id;
                } else {
                    contact = contacts[0].id;
                }
            } else {
                const newContact = await ContactModel.create({
                    ...trade.newContact,
                    responsible: trade.responsible,
                    developer: developerUuid
                });
                contact = newContact.id;
            }
        }
        return await TradeModel.create({
            ...trade,
            tradeNumber,
            contact,
            developer: developerUuid
        });
    },
    async updateTrade(parent, args, ctx: Context): Promise<Trade> {
        const {uuid, trade} = args;

        const existingTrade = await TradeModel.findById(uuid).exec();
        let contact;
        if (trade.existingContact) {
            contact = trade.existingContact;
        } else if (trade.newContact) {
            const contacts = await ContactModel.find({
                isDeleted: false,
                phones: {
                    $elemMatch: {$in: trade.newContact.phones}
                }
            }).exec();

            if (contacts.length > 0) {
                const secondaryMatch = contacts.find((c) => {
                    return c?.name === trade.newContact?.name || c?.email === trade.newContact?.email;
                });

                contact = secondaryMatch ? secondaryMatch.id : contacts[0].id;
            } else {
                const newContact = await ContactModel.create({
                    ...trade.newContact,
                    responsible: trade.responsible,
                    developer: existingTrade.developer
                });
                contact = newContact.id;
            }
        }

        trade.contact = contact;

        return await TradeModel.findOneAndUpdate(
            {
                _id: uuid,
                isDeleted: false
            },
            {
                $set: {
                    ...trade
                }
            }
        ).exec();
    },
    async deleteTrade(parent, {uuid}, ctx: Context) {
        await TradeModel.findOneAndUpdate(
            {
                _id: uuid
            },
            {
                $set: {
                    isDeleted: true
                }
            }
        ).exec();
        return true;
    },
    async requestFromPublicForm(parent, args, ctx: Context) {
        const {
            flat,
            userInfo: {name, phone, email, developerUuid}
        } = args;
        let tradeNumber = 1;

        const amoUser = {name: args.userInfo.name, phone: args.userInfo.phone, reason: args.userInfo.reason};

        sendUserToAmo(process.env.ZHILSTROJ2_API_AMO4, amoUser);

        const maxNumberTrade = await TradeModel.findOne({})
            .sort('-tradeNumber')
            .exec();
        if (maxNumberTrade) {
            tradeNumber = maxNumberTrade.tradeNumber + 1;
        }

        const contacts = await ContactModel.find({
            isDeleted: false,
            phones: {
                $elemMatch: {$in: [phone]}
            }
        }).exec();

        const length = contacts.length;
        let contactId: string;
        const newContactInfo = {
            name,
            phones: [phone],
            email: email,
            clientSources: 'site'
        };

        if (length) {
            const secondaryMatch = contacts.find(
                (c) => c.email === email || c.name.toLocaleLowerCase() === name.toLocaleLowerCase()
            );

            contactId = secondaryMatch ? secondaryMatch.id : contacts[0].id;
        } else {
            const newContact = await ContactModel.create({
                ...newContactInfo,
                developer: developerUuid
            });

            contactId = newContact.id;
        }

        const tradeInfo = {
            state: 'initial_contact',
            leadStatus: 'delayed',
            tradeSource: 'site',
            flat: flat,
            existingContact: length ? contacts[0].id : '',
            newContact: length ? null : newContactInfo
        };

        return await TradeModel.create({
            ...tradeInfo,
            tradeNumber,
            contact: contactId,
            developer: developerUuid,
            isNewTrade: true
        });
    }
};
