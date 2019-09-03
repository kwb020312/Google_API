const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports = function() {
    const connect = function() {
        if(NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'nodeplace',
        },function(error){
            if(error) {
                console.log('------------------------------------');
                console.log('몽고디비 연결 에러', error);
                cnonsole.log('------------------------------------');
            } else {
                console.log('------------------------------------');
                console.log('몽고디비 연결 성공');
                console.log('------------------------------------');
            }
        });
    };
    connect();
    mongoose.connection.on('error', function(error){
        console.log('------------------------------------');
        console.error('몽고디비 연결 에러', error);
        console.log('------------------------------------');
    });
    mongoose.connection.on('disconnected', function(){
        console.error('몽고디비 연결이 끊겼음');
        connect();
    });

    require('./favorite');
    require('./history');
}