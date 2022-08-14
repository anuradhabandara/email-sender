import { createStore, compose, combineReducers } from 'redux';
import ImageFileUploadReducer from './ImageFileUploadReducer';
export const init = () => {
    const rootReducer = combineReducers({
        form: ImageFileUploadReducer,
    });
    const store = createStore(rootReducer);
    return store;
}