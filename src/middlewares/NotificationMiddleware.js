import { transform } from 'lodash';
import { getCharacter } from '../browser/character';
import { notify } from '../browser/notification';
import { format } from '../utility/format';

export const notificationMiddleware = ({getState}) => (next) => (action) => {
    if (action.notify && !getState().dom.focused) {
        const item = action.items[0];

        (
            item.character_url
                ? getCharacter(item.character_url)
                    .then(
                        (data) => new URL(
                            data.icon || data.portrait || data.image,
                            item.character_url
                        )
                        .toString()
                    )
                : Promise.resolve()
        )
        .then((icon) => {
            const msg = transform(
                action.notify,
                (result, value, key) => {
                    result[key] = format(value, item, false);
                },
            {}
            );

            notify({
                ...msg,
                icon: icon || msg.icon,
            }).then((n) => {
                setTimeout(() => n.close(), 5000);
            });
        });
    }

    return next(action);
};