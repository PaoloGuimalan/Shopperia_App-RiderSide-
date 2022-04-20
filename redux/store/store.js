import { createStore, combineReducers } from "redux";
import { setmessages, setriderbranch, setriderid, setserver, settodeliver, settoretrieve } from "../actions/actions";

const combine = combineReducers({
    riderID: setriderid,
    server: setserver,
    toretrieve: settoretrieve,
    todeliver: settodeliver,
    riderbranch: setriderbranch,
    messages: setmessages
});

const store = createStore(combine);

export default store;