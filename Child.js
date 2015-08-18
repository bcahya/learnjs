/**
 * Created by bayu on 11/1/14.
 */
var Child;

module.exports = Child = function() {
    this.intervalDelay = 2 * 1000;
    this.interval = null;
    this.pid = process.pid;
    this.executionTimes = 0;
};

Child.prototype.sendMessageToMaster = function() {
    var uptime = process.uptime();
    var message = 'args ' + process.argv[2] + ' child process interval ['+this.pid+'], uptime '+uptime+'s';
    process.send({custom: message});

};

Child.prototype.start = function() {
    console.log("In Child.start func " + this.pid + " with args " + process.argv[2]);
    this.interval = setInterval(this.sendMessageToMaster.bind(this), this.intervalDelay);
    this.sendMessageToMaster();
};

var c = new Child();
c.start();



