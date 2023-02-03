import {takeEvery, put, call, fork, all} from "redux-saga/effects";
import {FETCH_FORM, FETCH_FORM_SUCCESS, FETCH_FORM_ERROR} from "../reducers/formReducer.js";

import axios from "axios";
import {SET_DATA_FORM} from "../reducers/formReducer";
import React from "react";

const sendForm = async(value) => {
    const request = await axios.get(`${value}`);
    return request;
};

export function* workerSagaSend(action) {
    for (let key in action.payload) {
        try {
            yield put({
                type: FETCH_FORM,
                payload: true
            });
            const data = yield call(sendForm, action.payload[key]);
            yield put({
                type: FETCH_FORM_SUCCESS,
                payload: true
            });
            if (typeof data.data === 'string') {
                yield put({
                    type: SET_DATA_FORM,
                    payload: "Кривой url, он не возвращает данные."
                });
            } else {
                yield put({
                    type: SET_DATA_FORM,
                    payload: data
                });
            }
        } catch (e) {
            console.log('ошибка', e);
            yield put({
                type: FETCH_FORM_ERROR,
                payload: `Error: Произошла ошибка. ${e}`
            });
            yield put({
                type: SET_DATA_FORM,
                payload: e.message
            });
        }
    }
}

export function* watchSendSaga() {
    yield takeEvery("SEND_FORM", workerSagaSend);
}
export default function* rootSaga() {
    yield all([
        fork(watchSendSaga)
    ])
}