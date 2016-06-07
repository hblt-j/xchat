    var app = require('express')();  
    var http = require('http').Server(app);  
    var io = require('socket.io')(http);  
    var history = new Array();  
     
    app.get('/', function(req, res){  
      res.sendfile('chat.html');  
    });  
      
    io.on('connection', function(socket){  
      socket.on('chat message', function(msg){  
        io.emit('chat message', msg);  
        addMsg(msg);  
      });  
      
      socket.on('login message', function(msg){  
        socket.join('history room');  
        for(var i=0;i<history.length;i++){  
          io.in('history room').emit('chat message', history[i]);  
       }  
          io.in('history room').emit('chat message', 'lyd__上面是最近的一些信息');  
        socket.leave('history room');  
        socket.join('chat room');   
       
        io.emit('chat message',msg);  
        addMsg(msg);  
      });  
    });  
      
    http.listen(3001, function(){  
      console.log('listening on *:3001');  
    });  
      
    function addMsg(msg){  
     history.push(msg);  
     if(history.length>100)  
        history.shift();  
    };  
