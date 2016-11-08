var mongoose = require('mongoose');
var connection;
var connect = function(url,done){
    if(connection) return done()
    mongoose.connect(url,function(err, db){
        if(err) {
            return done(err);
        }
        connection = db;
        done();
    });
}

var getCon = function(){
    return connection;
}
var closeCon = function(done){
    if(connection){
        connection.close(function(err, result){
            connection = null;
            done(err, result);
        });
    }
}
module.exports.connect = connect;
module.exports.getCon = getCon;
module.exports.closeCon = closeCon;