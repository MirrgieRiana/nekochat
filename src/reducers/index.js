import { combineReducers } from 'redux';
import { confirmListReducer } from './ConfirmListReducer';
import { dialogReducer } from './DialogReducer';
import { domReducer } from './DOMReducer';
import { iconListReducer } from './IconListReducer';
import { inputReducer } from './InputReducer';
import { messageFormReducer } from './MessageFormReducer';
import { messageListReducer } from './MessageListReducer';
import { roomListReducer } from './RoomListReducer';
import { roomReducer } from './RoomReducer';
import { routeReducer } from './RouteReducer';
import { snackListReducer as snackList } from './SnackListReducer';
import { userReducer } from './UserReducer';
import { videoReducer } from './VideoReducer';
import { videoListReducer } from './VideoListReducer';

export const rootReducer = combineReducers({
    confirmList: confirmListReducer,
    dialog: dialogReducer,
    dom: domReducer,
    iconList: iconListReducer,
    input: inputReducer,
    messageForm: messageFormReducer,
    messageList: messageListReducer,
    roomList: roomListReducer,
    room: roomReducer,
    route: routeReducer,
    snackList,
    user: userReducer,
    video: videoReducer,
    videoList: videoListReducer,
});