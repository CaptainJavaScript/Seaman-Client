const EthCrypto = require('eth-crypto');

module.exports = {

    CryptPrefix: function() {
        return "crypt:";
    },

    ZipPrefix: function() {
        return "zip:";
    },

    PublicKeyAtRopsten: function() {
        return "c217d67b41e7d7abdaaa57f689145c76439f32ba9e8ec226349452cc3599208cec9966720d76e5f3758718cf8bfaca40504038d2b2cf441a61f2661aca7e09cc";
    },

    PublicKeyAtMainnet: function() {
        return "a28c0208e0ff476ce863a953782f3e1a1a5920408387b741afce70059cac258c1d9fcef1cdb863a7f8bdd3190918eb15eb8849e3c2f601a989552e40d1752eb3";
    },

    Encrypt: async function(IsMainnet, MessageToEncrypt) {
        const X = await EthCrypto.encryptWithPublicKey(
            IsMainnet ? this.PublicKeyAtMainnet() : this.PublicKeyAtRopsten(), 
            MessageToEncrypt
        );
        return this.CryptPrefix() + EthCrypto.cipher.stringify(X);
    },

    EncryptFile: async function(IsMainnet, FileToEncypt, TargetFile, OnSuccess, OnError) {
        try {
            var fs = require("fs");
            var data1 = fs.readFileSync(FileToEncypt);
            var data2 = await this.Encrypt(IsMainnet, data1);
            fs.writeFileSync(TargetFile, data2);
            
            if(OnSuccess)
                OnSuccess();
        } catch(ERROR) {
            if(OnError)
                OnError(ERROR);
        }
    },
    
    Decrypt: async function(PrivateKey, MessageToDecrypt) {
        if(MessageToDecrypt.startsWith(this.CryptPrefix()))
            MessageToDecrypt = MessageToDecrypt.substring(this.CryptPrefix().length);
        var X = EthCrypto.cipher.parse(MessageToDecrypt);
        return await EthCrypto.decryptWithPrivateKey(
            PrivateKey,
            X
        );
    },

    IsZipped: function(Text) {
        return Text.startsWith(this.ZipPrefix());
    },

    IsEncrypted: function(Text) {
        return Text.startsWith(this.CryptPrefix());
    }
}