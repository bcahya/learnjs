/**
 * Implementing private, protected, public to javascript
 *
 * Created by bayu on 11/15/14.
 * https://github.com/philipwalton/mozart
 * Since there are no default private and protected feature to javascript,
 * we use some workaround provided by Philip Walton
 *
 * Set --harmony as your first node parameters
 *
 */
'use strict';
var ctor = require('mozart');

var Citizen = ctor(function(prototype, _, _protected) {

    prototype.init = function(name, age) {
        _(this).name = name;
        _(this).age = age;
    };

    _protected.allowToVote = function() {
        return this.age > 18;
    }

    prototype.vote = function(politician) {
        if (_(this).allowToVote()) {
            console.log(_(this).name + ' vote for ' + politician);
        } else {
            console.log(_(this).name + ' is not allowed to vote.');
        }
    };

});

var ArmyCitizen = Citizen.subclass(function(prototype, _, _protected) {

    prototype.init = function(name, age, army) {
        if (typeof army === 'boolean')
            _(this).army = army;
        else
            throw new Error('harus boolean value');

        prototype.super.init.call(this, name, age);

    };

    _protected.allowToVote = function() {
        if (_(this).army)
            return false;
        else
            _protected.super.allowToVote.call(this);
    }

});


var testVoting = new Citizen('Moses', 7);
testVoting.init('Mo', 9);
testVoting.vote('Hello politician');
console.log(testVoting.age); // undefined
console.log(testVoting.hello);
// testVoting.allowToVote(); // thrown an error. no method
// while thrown an error, application then exit

var testArmyCitizen = new ArmyCitizen('Mr Policeman', 17, false);
testArmyCitizen.vote('Mc Pearson');