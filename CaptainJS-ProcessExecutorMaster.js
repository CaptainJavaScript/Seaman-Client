var net = require('net');

module.exports =  {

    HOST: "localhost",
    PORT: 1234,
    
    Write: function(ContractAddress, obj) {
        const fs = require("fs");
        const FileName = this.ConvertToFilename(ContractAddress);
        var json = JSON.stringify(obj); 
        fs.writeFileSync(FileName, json); 
    },

    StartNewClientProcess: function(cmd, onFinish) {
        var exec = require('child_process').exec;
        console.log("|-StartNewClientProcess: " + cmd);
        exec(cmd, function(error, stdout, stderr) {
            onFinish(error, stdout);
        });
    },

    NewServer: function(OnData, OnClose) {
        net.createServer(
            function(sock) 
            {
                sock.on('data', function(data) {
                    OnData(sock, data);
                });
        
                // Add a 'close' event handler to this instance of socket
                sock.on('close', function(data) {
                    OnClose();
                });
            }
        ).listen(this.PORT, this.HOST);
    },

    NewClient: function(onConnect, onData, onClose) {

        var client = new net.Socket();
        client.connect(this.PORT, this.HOST, () => onConnect(client));
    
        // Add a 'data' event handler for the client socket
        // data is what the server sent to this socket
        client.on('data', function(data) {
            onData(client, data);
        });

        // Add a 'close' event handler for the client socket
        client.on('close', () => onClose());
    }
}