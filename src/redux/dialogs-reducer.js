const SEND_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
    dialogs: [
        {name: 'Andrey', id: 1},
        {name: 'Max', id: 2},
        {name: 'Igor', id: 3},
        {name: 'Valera', id: 4},
        {name: 'Bot', id: 5}
    ],
    messages: [
        {message: 'Hello', id: 1},
        {message: 'Hi', id: 2},
        {message: 'buy', id: 3}
    ],
    newMessageText: 'New Message'
}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 4,
                message: state.newMessageText
            };
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push(newMessage);
            stateCopy.newMessageText = '';
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT:
            let stateCopy = {...state};
            stateCopy.newMessageText = action.newMesText;
            return stateCopy;
        default:
            return state;
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextAC = (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, newMesText: text});

export default dialogsReducer;