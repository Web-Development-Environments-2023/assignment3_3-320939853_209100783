const state = {

    server_domain: "http://127.0.0.1:3000/",
    temp:"",
    // server_domain: "http://132.72.65.211/",
    

};

const actions = {
    cwts:(item) => {
        state.temp = item;
        console.log("hey");
    },

};

export {state,actions};