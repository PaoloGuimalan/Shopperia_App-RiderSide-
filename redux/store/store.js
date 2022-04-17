import { createStore, combineReducers } from "redux";
import { setriderid } from "../actions/actions";

const combine = combineReducers({
    riderID: setriderid
});

const store = createStore(combine);

export default store;