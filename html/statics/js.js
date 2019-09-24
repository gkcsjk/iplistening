
// 麻将房间的IP地址，顺序为房间1，2，大厅1，2， 和 joker 备用
let hosts = [
    '192.168.1.101',
    '192.168.1.102',
    '192.168.1.108',
    '192.168.1.104',
    '192.168.1.107'
];

// 刷新时间间隔，单位毫秒
let refreshRate = 20000;


/*
* **********************************************************
* **********************************************************
* DO NOT change codes below this line
* **********************************************************
* **********************************************************
* */
const ping = require('ping');
let ids = ['room1', 'room2', 'pub1', 'pub2', 'joker'];
var oldFlags = [false, false, false, false, false];
var newFlags = [false, false, false, false, false];
let cfg = {
    timeout: 10,
};
let startSound = new Audio('statics/start.mp3');
let endSound = new Audio('statics/end.mp3');

function changeColor(roomId, isAlive) {
    if (isAlive){
        $('#' + roomId).addClass('room-active');
        $('#' + roomId).removeClass('room-empty');
    } else {
        $('#' + roomId).addClass('room-empty');
        $('#' + roomId).removeClass('room-active');
    }
}

function getCurrentTime() {
    var today = new Date();
    return "[" + today.toLocaleString() + "]"
}

function ifChanged(oldFlag, newFlag, id, isAlive){
    var logArea = $('#logs');
    if (oldFlag !== newFlag) {
        var logMsg;
        changeColor(id, isAlive);
        if (oldFlag === true) {
            logMsg = "[下机] " + id + " 已经下机";
            endSound.play();
        } else {
            logMsg = "[上机] " + id + " 开始上机";
            startSound.play();
        }
        logArea.prepend("<p>"+ getCurrentTime() + logMsg + "</p>");
    }
}

function listeningIP() {
    hosts.forEach(function(host, index){
        ping.sys.probe(host, function(isAlive){
            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            console.log(msg);
            oldFlags[index] = newFlags[index];
            newFlags[index] = isAlive;
            ifChanged(oldFlags[index], newFlags[index], ids[index], isAlive);
        }, cfg);
    });
    setTimeout(listeningIP, refreshRate);
}

listeningIP();