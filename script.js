// Global variables

var DIRECTION = {
    IDEL : 0,
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4
};

var rounds = [5,5,3,3,2];
var colors = [ '#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];

// The ball object 

var Ball = {
    new : function (incrementedSpeed) {
        return {
            width : 18 ,
            height : 18,
            x :(this.cannvas.width /2 ) - 9,
            y :(this.cannvas.height /2 ) - 9,
            moveX : DIRECTION.IDEL,
            moveY : DIRECTION.IDEL,
            speed : incrementedSpeed || 7
        };
    }
}












