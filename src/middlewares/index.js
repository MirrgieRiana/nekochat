import { debugLoggerMiddleWare } from './DebugLoggerMiddleware';
import { domMiddleware } from './DOMMiddleware';
import { confirmMiddleWare } from './ConfirmMiddleware';
import { characterMiddleWare } from './CharacterMiddleware';
import { notificationMiddleware } from './NotificationMiddleware';
import { routerMiddleware } from './RouterMiddleware';
import { snackMiddleware } from './SnackMiddleware';
import { socketMiddleware } from './SocketMiddleware';
import { timeoutMiddleware } from './TimeoutMiddleware';

export const middlewares = [
    domMiddleware,
    confirmMiddleWare,
    snackMiddleware,
    characterMiddleWare,
    notificationMiddleware,
    routerMiddleware,
    socketMiddleware,
    timeoutMiddleware,
    debugLoggerMiddleWare,
];