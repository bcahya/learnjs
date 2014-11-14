/**
 * Created by bayu on 11/14/14.
 */

// create new Object directly
var myObject = {

    specialFunction : function() {
        console.log('special function');

    },

    anotherSpecialFunction : function() {
        console.log('another special function');

    }
};

myObject.specialFunction();
myObject.anotherSpecialFunction();

// create a template object/class/function
var myObject2 = function() {

    this.specialFunction = function() {
        console.log('special function');

    };

    this.anotherSpecialFunction = function() {
        console.log('another special function');
    }

};

// initialize new object with 'new'
var testObject = new myObject2();
testObject.specialFunction();
testObject.anotherSpecialFunction();