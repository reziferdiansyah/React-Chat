import { all, takeEvery, put, call } from 'redux-saga/effects';
import request from '../actions/connect';
import * as actions from '../actions/message';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const read = async (path) =>
    await request.get(path)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const add = async (path, params) =>
    await request.post(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const remove = async (path, params) =>
    await request.delete(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });


const PATH = '/message'

//add
function* loadChat() {
    try {
        const data = yield call(read, PATH);
        yield put(actions.loadChatSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadChatFailure());
    }
}

function* postChat(payload) {
    const { sender, message } = payload;
    const id = Date.now();
    yield put(actions.addChatView(id, sender, message));
    try {
        const data = yield call(add, PATH, { id, sender, message })
        socket.emit('chat', data)
        yield put(actions.addChatSuccess(data))
    } catch (error) {
        yield put(actions.addChatFailure(id))
    }
}

function* deleteChat(payload) {
    const { id } = payload;
    yield put(actions.deleteChatView(id));
    try {
        const data = yield call(remove, `${PATH}/${id}`)
        socket.emit('chat', data)
        yield put(actions.deleteChatSuccess())
    } catch (error) {
        yield put(actions.deleteChatFailure())
    }
}

function* resendChat(payload) {
    const { id, sender, message } = payload;
    try {
        const data = yield call(add, PATH, { id, sender, message })
        socket.emit('chat', data)
        // console.log('mengirim emit chat')
        yield put(actions.addChatSuccess(data))
    } catch (error) {
        yield put(actions.addChatFailure(id))
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery('LOAD_CHAT', loadChat),
        takeEvery('POST_CHAT', postChat),
        takeEvery('RESEND_CHAT', resendChat),
        takeEvery('TRASH_CHAT', deleteChat)
    ])
}