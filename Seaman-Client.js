const ContractConnector = require("./Seaman-Lib.js");

var IsMainnet = false;

//ContractConnector.Invoke_ActivateVoucher_AtSeaman(IsMainnet);
//ContractConnector.Invoke_CentimeterToInchExample_AtSeaman(IsMainnet, "14");
//ContractConnector.Invoke_WolframAlphaExample_AtSeaman(IsMainnet, "Spain");
//ContractConnector.Invoke_CallbackExample_AtSeaman(IsMainnet);
//ContractConnector.Invoke_JSON_Example_AtSeamanROPSTEN();

var Timer = setInterval( () => {
    ContractConnector.ListenToSeaman(IsMainnet, (element) => {
        console.log("--> SEAMAN [" + element.blockNumber + "] " + element.event + ": " + element.returnValues[0]);
    },
    (error) => { 
        console.log(error); 
    },
    (log) => console.log);

}, 15000);
