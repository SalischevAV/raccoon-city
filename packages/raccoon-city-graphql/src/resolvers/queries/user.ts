import {UserModel} from '../../db/models/user';
import {AuthError} from '../../utils';
import {HistoryEventModel, HistoryEventType} from '../../db/models/historyEvent';
import {FlatModel} from '../../db/models/flat';

export const user = {
    async getUsers() {
        const res = await UserModel.find({})
            .populate({
                path: 'role'
            })
            .populate({
                path: 'developer'
            })
            .exec();
        return res;
    },
    async getUserInfo(parent, args, context) {
        try {
            const res = await UserModel.findById(context.currentUser.id)
                .populate({
                    path: 'role'
                })
                .populate({
                    path: 'developer'
                })
                .exec();
            return res;
        } catch (e) {
            throw new AuthError();
        }
    },
    async getHistoryEvents(_, {developer}) {
        const historyEvents = await HistoryEventModel.find({developer})
            .populate({
                path: 'user',
                populate: {
                    path: 'role'
                }
            })
            .exec();

        const updatedHistoryEvents = historyEvents.map(async (item) => {
            const {eventType, payload, id, user, date} = item;

            if (eventType === HistoryEventType.CHANGE_FLAT_STATUS) {
                const {flatId, newStatus} = JSON.parse(payload);

                const {
                    flatNumber,
                    house: {
                        apartmentComplex: {name, address}
                    },
                    section: {sectionName}
                } = (await FlatModel.findById(flatId)
                    .populate({
                        path: 'house',
                        populate: {
                            path: 'apartmentComplex'
                        }
                    })
                    .populate({
                        path: 'section'
                    })
                    .exec()) as any;

                return {
                    id,
                    user,
                    date,
                    eventType,
                    payload: JSON.stringify({
                        flatNumber,
                        complexName: name,
                        complexAddress: address,
                        sectionName,
                        newStatus
                    })
                };
            }

            return item;
        });

        const historyEventsRes = await Promise.all(updatedHistoryEvents);

        return historyEventsRes;
    }
};
