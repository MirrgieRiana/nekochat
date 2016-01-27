import { debugLoggerMiddleWare } from './DebugLoggerMiddleware';
import { domMiddleware } from './DOMMiddleware';
import { confirmMiddleWare } from './ConfirmMiddleware';
import { characterMiddleWare } from './CharacterMiddleware';
import { notificationMiddleware } from './NotificationMiddleware';
import { routerMiddleware } from './RouterMiddleware';
import { snackMiddleware } from './SnackMiddleware';
import { socketMiddleware } from './SocketMiddleware';
import { timeoutMiddleware } from './TimeoutMiddleware';
import { videoMiddleware } from './VideoMiddleware';

export const middlewares = [
    domMiddleware,
    confirmMiddleWare,
    snackMiddleware,
    characterMiddleWare,
    notificationMiddleware,
    routerMiddleware,
    socketMiddleware,
    timeoutMiddleware,
    videoMiddleware,
    debugLoggerMiddleWare,
];