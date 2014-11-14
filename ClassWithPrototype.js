/**
 * Created by bayu on 11/14/14.
 */
var MasterObject = function() {
    this.threads = [];
};

MasterObject.prototype.add = function(obj) {
    this.threads.push(obj);
};

MasterObject.prototype.doSomething = function() {
    this.threads.forEach(function(val, idx) {
        console.log(idx + ' ' + val);
    })
};

var testMasterObject = new MasterObject();
testMasterObject.add('hello');
testMasterObject.add('yohanes');
testMasterObject.add('moses');

testMasterObject.doSomething();