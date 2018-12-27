module.exports =  {

    PrivateKey: function() {
        return "<your key>";
    },

    PrivateKeyROPSTEN: function() {
        return "<your key>";
    },

    Web3ConnectionMAINNET: function() {
        const URL = "https://mainnet.infura.io/v3/<your key>";  
        //console.log("|- mainnet @ " + URL);
        const Web3 = require('web3');
        var web3 = new Web3();
        web3.setProvider(new Web3.providers.HttpProvider(URL));
        return web3;
    },

    Web3ConnectionROPSTEN: function() {
        const URL = "https://ropsten.infura.io/v3/<your key>"; 
        const Web3 = require('web3');
        var web3 = new Web3();
        web3.setProvider(new Web3.providers.HttpProvider(URL));
        return web3;
    },


    SeamansStartingBlockROPSTEN: function() {
        return 4702540;
    },
    
    ConnectToContract_1_0_0_beta: function(ContractAddress, JSONFile, web3) {
        const fs = require("fs");
        var ABI = JSON.parse(
            fs.readFileSync(JSONFile)
        );
        var IContract = new web3.eth.Contract(ABI.abi, ContractAddress);
        return IContract;
    },
 
    SeamanStartingBlockMAINNET: function() {
        return 6932603;
    },

    Web3WebSocketMAINNET: function () {
        const Web3 = require('web3');
        var Instance = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
        return Instance;
    },


    ListenToSeaman: function(IsMainnet, Callback) {
        if(IsMainnet)
            this.ListenToSeamanMAINNET(Callback);
        else
            this.ListenToSeamanROPSTEN(Callback);
    }, 

    SeamansExamples_JSON: function() {
        return "./SeamansExamples.json";
    },

        ListenToSeamanMAINNET: function(Callback) {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);
        const SeamanEvents = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, this.Web3WebSocketMAINNET());

        console.log("|- listening to Seaman's Example past events...");
        Web3.eth.getBlockNumber().then(MaxBlock => { 
            var StartingBlock = this.LastBlock < this.SeamanStartingBlockMAINNET() ? this.SeamanStartingBlockMAINNET() : this.LastBlock + 1;
            var BlockIncrement = 500;
            
            if(!this.LastBlock)
                this.LastBlock = 0;
          
            console.log("|- last block = " + this.LastBlock + " // starting block = " + StartingBlock + " // current block = " + MaxBlock + " // block increment = " + BlockIncrement);
            
            while(StartingBlock < MaxBlock) { 
                SeamanEvents.getPastEvents({}, {fromBlock: StartingBlock,  toBlock: StartingBlock + BlockIncrement},
                    (error, logs) =>
                    {
                        if (error) 
                            console.error(console.log("ERROR@ListenToSeamanMAINNET at :144: " + error));
                        else
                            if(logs.length > 0) {
                                console.log("length: " + logs.length);
                                (logs).forEach(element => {
                                    if(element.blockNumber > this.LastBlock)
                                        this.LastBlock = element.blockNumber;
                                    Callback(element)
                                });
                            }
                    });            
                StartingBlock += BlockIncrement;
            }

        });
    },

    ListenToSeamanROPSTEN: function(Callback) {
        console.log("|- ListenToSeamanROPSTEN(...)");
        const Web3 = this.Web3ConnectionROPSTEN();
        const SeamansAddress = this.SeamansExamples_ROPSTEN_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);
        const SeamanEvents = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, this.Web3WebSocketROPSTEN());

        if(!this.LastBlock)
            this.LastBlock = 0;

        Web3.eth.getBlockNumber().then(MaxBlock => { 
            var StartingBlock = this.LastBlock < this.SeamansStartingBlockROPSTEN() ? this.SeamansStartingBlockROPSTEN() : this.LastBlock + 1;
            var BlockIncrement = 500;
            
            console.log("|- last block = " + this.LastBlock + " // starting block = " + StartingBlock + " // current block = " + MaxBlock + " // block increment = " + BlockIncrement);
            
            while(StartingBlock < MaxBlock) { 
                SeamanEvents.getPastEvents({}, {fromBlock: StartingBlock,  toBlock: StartingBlock + BlockIncrement},
                    (error, logs) =>
                    {
                        if (error) 
                            console.error(console.log("ERROR@ListenToSeamanROPSTEN at :240: " + error));
                        else
                            if(logs.length > 0) {
                                console.log("length: " + logs.length);
                                (logs).forEach(element => {
                                    if(element.blockNumber > this.LastBlock)
                                        this.LastBlock = element.blockNumber;
                                    Callback(element)
                                });
                            }
                    });            
                StartingBlock += BlockIncrement;
            }
        });
    },
    
    Invoke_WolframAlphaExample_AtSeaman: function(IsMainnet, Country) { 
        if(IsMainnet)
            this.Invoke_WolframAlphaExample_AtSeamanMAINNET(Country);
        else
            this.Invoke_WolframAlphaExample_AtSeamanROPSTEN(Country);
    },

    Invoke_WolframAlphaExample_AtSeamanMAINNET: function(Country) {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_MAINNET_ADDRESS(), 900000, this.ToGWei(20), 0, Seaman.methods.WolframAlphaExample(Country).encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    Invoke_WolframAlphaExample_AtSeamanROPSTEN: function(Country) {
        const Web3 = this.Web3ConnectionROPSTEN();
        const SeamansAddress = this.SeamansExamples_ROPSTEN_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_ROPSTEN_ADDRESS(), 900000, this.ToGWei(20), 0, Seaman.methods.WolframAlphaExample(Country).encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    Invoke_CallbackExample_AtSeaman: function(IsMainnet) {
        if(IsMainnet)
            this.Invoke_CallbackExample_AtSeamanMAINNET();
        else
            this.Invoke_CallbackExample_AtSeamanROPSTEN();
    },

    Invoke_CallbackExample_AtSeamanMAINNET: function() {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_MAINNET_ADDRESS(), 150000, this.ToGWei(20), 0, Seaman.methods.CallbackExample().encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    Invoke_CallbackExample_AtSeamanROPSTEN: function() {
        const Web3 = this.Web3ConnectionROPSTEN();
        const SeamansAddress = this.SeamansExamples_ROPSTEN_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_ROPSTEN_ADDRESS(), 150000, this.ToGWei(20), 0, Seaman.methods.CallbackExample().encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    
    Invoke_ActivateVoucher_AtSeaman: function(IsMainnet) { 
        if(IsMainnet) 
            this.Invoke_ActivateVoucher_AtSeamanMAINNET();
        else
            this.Invoke_ActivateVoucher_AtSeamanROPSTEN();
    },

    Invoke_ActivateVoucher_AtSeamanMAINNET: function() {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_MAINNET_ADDRESS(), 60000, this.ToGWei(20), 0, Seaman.methods.UseVoucher().encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },


    Invoke_ActivateVoucher_AtSeamanROPSTEN: function() {
        const Web3 = this.Web3ConnectionROPSTEN();
        const SeamansAddress = this.SeamansExamples_ROPSTEN_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_ROPSTEN_ADDRESS(), 60000, this.ToGWei(20), 0, Seaman.methods.UseVoucher().encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    Invoke_CentimeterToInchExample_AtSeaman: function(IsMainnet, Centimeter) {
        if(IsMainnet)
            this.Invoke_CentimeterToInchExample_AtSeamanMAINNET(Centimeter);
        else
            this.Invoke_CentimeterToInchExample_AtSeamanROPSTEN(Centimeter);
    },

    Invoke_CentimeterToInchExample_AtSeamanMAINNET: function(Centimeter) {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_MAINNET_ADDRESS(), 300 * 1000, this.ToGWei(20), 0, Seaman.methods.CentimeterToInchExample(Centimeter).encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },

    Invoke_CentimeterToInchExample_AtSeamanROPSTEN: function(Centimeter) {
        const Web3 = this.Web3ConnectionROPSTEN();
        const SeamansAddress = this.SeamansExamples_ROPSTEN_ADDRESS();
        const SeamansJSON = this.SeamansExamples_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);

        this.Invoke(Web3, this.SeamansExamples_ROPSTEN_ADDRESS(), 300 * 1000, this.ToGWei(20), 0, Seaman.methods.CentimeterToInchExample(Centimeter).encodeABI(), (txHash) => {
            console.log("got txHash: " + txHash);
            Web3.eth.getTransactionReceipt(txHash).then((txReceipt) => {
                if(txReceipt)
                    console.log(txReceipt);
            });
        });
    },



    SeamansExamples_MAINNET_ADDRESS: function() {
        return "0xfcd53089c3de49fa8c6cc8330cd9f49e84b01cd6";        
    },

    SeamansExamples_ROPSTEN_ADDRESS: function() {
        return "0x2c53859c18da0e286161f1649e6a5fdabcb9bb98";        
    },

    Web3WebSocketMAINNET: function () {
        const Web3 = require('web3');
        var Instance = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
        return Instance;
    },


    Web3WebSocketROPSTEN: function () {
        const Web3 = require('web3');
        var Instance = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
        return Instance;
    },

    ToGWei: function(Amount) {
        return Amount * 1000000000;
    },
    
    OwnerAtMainnet: function() {
        const Web3 = this.Web3ConnectionMAINNET();
        return Web3.eth.accounts.privateKeyToAccount("0x" + this.PrivateKey());
    },

    OwnerAtRopsten: function() {
        const Web3 = this.Web3ConnectionROPSTEN();
        return Web3.eth.accounts.privateKeyToAccount("0x" + this.PrivateKeyROPSTEN());
    },

    Invoke: function(Web3, AddressTo, Gas, GasPrice, Wei, MethodABI, OnSuccess, OnError, GlobalUniqueJobID) {
        console.log("|- Invoke: " + (GlobalUniqueJobID ? GlobalUniqueJobID : "") + " @ " + AddressTo);
        console.log("|- Gas: " + Gas + " / GasPrice: " + GasPrice);
        
        var IsMainnet = (Web3.currentProvider.host + "").indexOf("mainnet") > 0;
        console.log("|- network: " + (IsMainnet ? "mainnet": "ropsten"));
        var TX = require("ethereumjs-tx");
        var KEY = Buffer.from(IsMainnet ? this.PrivateKey() : this.PrivateKeyROPSTEN(), "hex");
        
        var Client = Web3.eth.accounts.privateKeyToAccount("0x" + (IsMainnet ? this.PrivateKey() : this.PrivateKeyROPSTEN()));

        console.log("|- getting transaction count...");

        Web3.eth.getTransactionCount(Client.address, 'pending').then((lastCountOfTransaction) => {
            console.log("|- lastCountOfTransactions: " + lastCountOfTransaction);
            lastCountOfTransaction = lastCountOfTransaction == this.lastNonce ? lastCountOfTransaction + 1 : lastCountOfTransaction;
            this.lastNonce = lastCountOfTransaction;

            console.log("|- nonce: " + lastCountOfTransaction);
            
            var NONCE = "0x" + lastCountOfTransaction.toString(16);

            const tx = GasPrice != 0 ? {
                nonce: NONCE,
                to: AddressTo,
                from: Client.address,
                gasPrice: Web3.utils.toHex(GasPrice),
                gas: Web3.utils.toHex(Gas),
                value: Web3.utils.toHex(Wei),
                data: MethodABI 
            } : {
                nonce: NONCE,
                to: AddressTo,
                from: Client.address,
                gas: Web3.utils.toHex(Gas),
                value: Web3.utils.toHex(Wei),
                data: MethodABI 
            };
    
            var _TX = new TX(tx);
            _TX.sign(KEY);
            
            var BYTES = _TX.serialize();
            
            console.log("|- sending TX...");
            
            Web3.eth.sendSignedTransaction("0x" + BYTES.toString("hex"))
                .on("transactionHash", receipt => { 
                    if(!OnSuccess)
                        console.log("|- send successful with hash " + receipt ); 
                    else
                        if(GlobalUniqueJobID)
                            OnSuccess(receipt, GlobalUniqueJobID);
                        else
                            OnSuccess(receipt);
                })
                .on("error", err => {
                    if(!OnError)
                        console.log("ERROR@Invoke: " + err);
                    else
                        if(GlobalUniqueJobID)
                            OnError(err, GlobalUniqueJobID);
                        else
                            OnError(err);
                });
            });
    }

}
