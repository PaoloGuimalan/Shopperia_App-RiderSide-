import { URL_TWO } from "../../localvars/localvars";

export const socketer = (riderID) => {

    const io = require("socket.io-client");
    // const navigator = require("react-native-geolocation-service")

    const socket = io.connect(`http://${URL_TWO}/`, {
        withCredentials: true,
        extraHeaders: {
        "my-custom-header": "abcd"
    },
        'sync disconnect on unload': true, transports : ['websocket']
    });

    socket.on("connect", () => {

        socket.emit("connected", riderID);

    })

    // navigator.geolocation.watchPosition((position) => {
    //     // socket.on("trackLocation", data);
    //     console.log(position);
    // })

}