/**
 * Created by bayu on 12/4/14.
 *
 * 'this' concept
 * 1. global scope ~ this
 *    this refer to global object
 * 2. calling a function ~ foo()
 *    this refer to global object
 * 3. calling a method ~ foo.test()
 *    this refer to foo object
 * 4. calling a constructor ~ new
 *    this refer to a newly created object
 */

// example point 4
function Shape() {
    this.x = 0;
    this.y = 0;
};

Shape.prototype = {
    move : function(x, y) {
        // example to point 3
        this.x += x;
        this.y += y;

        console.log(this);

        function checkThis1() {
            // example to point 2
            // never executed. 'this' refer to global variable
            if (this.x > 100) {
                console.log("Warning: Shape of out bounds");
            };
            console.log("from checkThis1, this.x is " + this.x);
        }

        checkThis1();

        var that = this;
        function checkBounds() {
            if (that.x > 100) {
                console.log("Warning: Shape of out bounds");
            }
            console.log("from checkBounds, that.x is " + that.x);

        }

        checkBounds();

        var a = function checkBoundThis() {
            if (this.x > 100) {
                console.log("Warning: Shape of out bounds")
            }
            console.log("from checkBoundThis, this.x is " + this.x);


        }.bind(this);

        a();

        checkBounds.call(this);
        checkBounds.apply(this);

    }
};

var shape = new Shape();
shape.move(101, 1);
