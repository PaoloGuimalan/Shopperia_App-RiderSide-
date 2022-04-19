import { createStore, combineReducers } from "redux";
import { setriderid, setserver, settodeliver, settoretrieve } from "../actions/actions";

const combine = combineReducers({
    riderID: setriderid,
    server: setserver,
    toretrieve: settoretrieve,
    todeliver: settodeliver
});

const store = createStore(combine);

export default store;