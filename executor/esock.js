/**
 * Created by alexa on 04/12/2016.
 */
var controller = require('../modules/dataController');


module.exports = function(io){
    io.on('connection', function(socket){
        console.log('a user connected');
        
        socket.on('joinEvent', function (joincode) {
            socket.joincode = joincode;
            socket.join(joincode);

            socket.on('start', function (event) {
                socket.event = event;
            })

        });
        
        socket.on('hostEvent', function (eventID) {
            var hostedevent = controller.getSEvent(eventID);
            socket.joincode = hostedevent.joinCode;
            socket.join(socket.joincode);

            socket.on('startEvent', function () {
                socket.broadcast.to(socket.joincode).emit('start',{event});
            })
        });
        
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};