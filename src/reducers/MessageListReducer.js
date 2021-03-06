import * as MESSAGE from '../constants/MessageActions';
import * as ROOM from '../constants/RoomActions';
import { notice } from '../browser/sound';


const push = (state, items) => {
    items.reverse();

    if (items.length === 0) return state;

    const filtered = state.filter((a) => !items.find((b) => a.id === b.id));

    if (filtered.length === 0) return [...items];

    if (items[items.length - 1].id > filtered[0].id) {
        return [
            ...filtered,
            ...items,
        ];
    } else if (items[0].id < filtered[filtered.length - 1].id) {
        return [
            ...items,
            ...filtered,
        ];
    }

    return state;
};

export const messageListReducer = function(state = [], action) {
    switch (action.type) {
        case ROOM.LEAVE:
            return [];
        case MESSAGE.PUSH:
            if (action.items.length > 0) notice();
            return push(state, action.items);
        case MESSAGE.UPDATE: {
            const items = Array.isArray(action.data)
                ? action.data
                : [action.data];

            return state.map((item) => ({
                        item,
                        update: items.find((b) => item.id === b.id),
                }))
                .map(
                    ({item, update}) => update
                        ? Object.assign({}, update)
                        : item
                );
        } default:
            return state;
    }
};