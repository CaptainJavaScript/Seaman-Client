const ContractConnector = require("./Seaman-Lib.js");

ContractConnector.Invoke_ActivateVoucher_AtSeamanMAINNET();
ContractConnector.Invoke_CallbackExample_AtSeamanMAINNET();
ContractConnector.Invoke_CentimeterToInchExample_AtSeamanMAINNET("19");
ContractConnector.Invoke_WolframAlphaExample_AtSeamanMAINNET("France");

ContractConnector.ListenToSeamanMAINNET((element) => {
    console.log("--> SEMAN [" + element.blockNumber + "] " + element.event + ": " + element.returnValues[0]);
});
