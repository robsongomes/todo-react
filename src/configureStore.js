import { loadState, saveState } from "./localStorage";
import { createStore } from 'redux';
import todoApp from './reducers/index';

const configureStore = () => {
    const persistedData = loadState();
    const store = createStore(todoApp, persistedData);
    
    store.subscribe(() => {
        saveState({
            todos: store.getState().todos
        })
    })

    return store;
}

export default configureStore;