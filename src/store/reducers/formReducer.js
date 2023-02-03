export const FETCH_FORM = "FETCH_FORM";
export const FETCH_FORM_SUCCESS = "FETCH_FORM_SUCCESS";
export const FETCH_FORM_ERROR = "FETCH_FORM_ERROR";
export const ADD_ITEM_FORM = "ADD_ITEM_FORM";
export const REMOVE_ITEM_FORM = "REMOVE_ITEM_FORM";
export const SET_DATA_FORM = "SET_DATA_FORM";
export const REMOVE_ITEM_DATA_FORM = "REMOVE_ITEM_DATA_FORM";

const initialState = {
    error: null,
    urlArr: [
        {
            name: 'url1'
        }
    ],
    data: []
};

const newArr = (arr) => {
    arr.pop();
    return arr;
};

const newData = (arr) => {
    arr.pop();
    return arr;
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM:
            return {error: null, urlArr: [...state.urlArr], data: [...state.data]};
        case FETCH_FORM_SUCCESS:
            return {error: null, urlArr: [...state.urlArr], data: [...state.data]};
        case FETCH_FORM_ERROR:
            return {error: action.payload, urlArr: [...state.urlArr], data: [...state.data]};
        case ADD_ITEM_FORM:
            return {error: null, urlArr: [...state.urlArr, {name: `url${state.urlArr.length + 1}`}], data: [...state.data]};
        case REMOVE_ITEM_FORM:
            return {error: null, urlArr: [...newArr(state.urlArr)], data: [...state.data]};
        case REMOVE_ITEM_DATA_FORM:
            return {error: null, urlArr: [...state.urlArr], data: [...newData(state.data)]};
        case SET_DATA_FORM:
            return {error: null, urlArr: [...state.urlArr], data: [...state.data, action.payload]};
        default:
            return state;
    }
};