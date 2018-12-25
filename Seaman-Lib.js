module.exports =  {

    Web3ConnectionMAINNET: function() {
        const URL = "https://mainnet.infura.io/v3/<your key>";  
        const Web3 = require('web3');
        var web3 = new Web3();
        web3.setProvider(new Web3.providers.HttpProvider(URL));
        return web3;
    },

    PrivateKey: function() {
        return "<your key>";
    },


    ToGWei: function(Amount) {
        return Amount * 1000000000;
    },


    SeamansExamples_MAINNET_ADDRESS: function() {
        return "0xfcd53089c3de49fa8c6cc8330cd9f49e84b01cd6";        
    },

    Seaman_JSON: function() {
        return [
            {
              "constant": false,
              "inputs": [
                {
                  "name": "VoucherCode",
                  "type": "string"
                }
              ],
              "name": "ActivateVoucher",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "Amount",
                  "type": "uint256"
                }
              ],
              "name": "Payout",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "NewAddress",
                  "type": "address"
                }
              ],
              "name": "SetCaptainsAddress",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "Destruct",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "name": "Text",
                  "type": "string"
                }
              ],
              "name": "ResultLog",
              "type": "event"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "UseVoucher",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "CallbackExample",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "Country",
                  "type": "string"
                }
              ],
              "name": "WolframAlphaExample",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "Centimeter",
                  "type": "string"
                }
              ],
              "name": "CentimeterToInchExample",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "UniqueJobIdentifier",
                  "type": "uint256"
                },
                {
                  "name": "Result",
                  "type": "string"
                }
              ],
              "name": "CaptainsResult",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "UniqueJobIdentifier",
                  "type": "uint256"
                },
                {
                  "name": "Error",
                  "type": "string"
                }
              ],
              "name": "CaptainsError",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "UniqueIdentifier",
                  "type": "uint256"
                }
              ],
              "name": "RingRing",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];
    },

 
    SeamanStartingBlockMAINNET: function() {
        return 6932603;
    },

    Web3WebSocketMAINNET: function () {
        const Web3 = require('web3');
        var Instance = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
        return Instance;
    },

 
    ConnectToContract: function(ContractAddress, ABI, web3) {
        var IContract = new web3.eth.Contract(ABI, ContractAddress);
        return IContract;
    },

    ListenToSeamanMAINNET: function(Callback) {
        const Web3 = this.Web3ConnectionMAINNET();
        const SeamansAddress = this.SeamansExamples_MAINNET_ADDRESS();
        const SeamansJSON = this.Seaman_JSON();
        const Seaman = this.ConnectToContract_1_0_0_beta(SeamansAddress, SeamansJSON, Web3);
        const SeamanEvents = this.ConnectToContract(SeamansAddress, SeamansJSON, this.Web3WebSocketMAINNET());

        console.log("|- listening to Seaman's Example past events...");
        Web3.eth.getBlockNumber().then(MaxBlock => { 
            var StartingBlock = this.SeamanStartingBlockMAINNET();
            var BlockIncrement = 300;
            
            console.log("|- starting block = " + StartingBlock + " // current block = " + MaxBlock + " / block increment = " + BlockIncrement);
            
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
                                    if(element.address == this.SeamanAtMainnet().address)
                                        Callback(element)
                                });
                            }
                    });            
                StartingBlock += BlockIncrement;
            }
            
            console.log("|- now listening to Seaman's Example new events...");
            
            SeamanEvents.events.allEvents({
                fromBlock: MaxBlock + 1,
                to: "latest"
            }, function(error, result){ 
                if(!error) {
                    if(result.address == this.SeamanAtMainnet().address)
                        Callback(result);
                }
                else
                    console.error(console.log("ERROR@ListenToSeamanMAINNET at :260: " + error));
            });
        });
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

    SeamanAtMainnet: function() {
        const Web3 = this.Web3ConnectionMAINNET();
        return Web3.eth.accounts.privateKeyToAccount("0x" + this.PrivateKey());
    },
   
    Invoke: function(Web3, AddressTo, Gas, GasPrice, Wei, MethodABI, OnSuccess, OnError) {
        console.log("|- Invoke @ " + AddressTo);
        console.log("|- Gas: " + Gas + " / GasPrice: " + GasPrice);
        
        var TX = require("ethereumjs-tx");
        var KEY = Buffer.from(this.PrivateKey(), "hex");
        
        var Client = Web3.eth.accounts.privateKeyToAccount("0x" + this.PrivateKey());

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
                        OnSuccess(receipt);
                })
                .on("error", err => {
                    if(!OnError)
                        console.log("ERROR@Invoke: " + err);
                    else
                        OnError(err);
                });
            });
    }
}