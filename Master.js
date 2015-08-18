/**
 * Created by bayu on 11/1/14.
 * http://www.tutorialspoint.com/nodejs/nodejs_scaling_application.htm
 */
"use strict";
var Master,
    cp          = require('child_process'),
    events      = require('events'),
    path        = require('path'),
    util        = require('util');

module.exports = Master = function() {
    this.threads = {};
};

util.inherits(Master, events.EventEmitter);

Master.prototype.start = function(numThreads) {
    var i,
        child,
        that = this,
        onMessage = function(message) {
            that.emit('event', 'child message', this.pid, message);
        },
        onError = function(e) {
            that.emit('event', 'child error', this.pid, e);
        },
        onDisconnect = function(e) {
            that.emit('event', 'child disconnect', this.pid, 'killing...');
            this.kill();
            delete that.threads[this.pid];
        };

    for (i = 0; i < numThreads; i++) {
        child = cp.fork(__dirname+path.sep+'Child.js', [i]);
        child.on('message', onMessage);
        child.on('error', onError);
        child.on('disconnect', onDisconnect);
        that.threads[child.pid] = child;
    }


};

Master.prototype.stop = function(pid) {
    var that = this;

    if (typeof pid === 'undefined') {
        var allPids = Object.keys(that.threads);
        allPids.forEach(function(key, i, arr) {
            that.threads[key].disconnect();
        });
    } else if (this.threads[pid]) {
        that.threads[pid].disconnect();
    }
};

Master.prototype.destroy = function() {
    //this.stop();
    process.kill();
};

var test = new Master();
test.on('event', console.log);
test.start(4);
//setTimeout(test.stop(), 10000);
//test.stop();