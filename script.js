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

// AI object (Computer who plays against the player )

var Ai = {
    new : function (side) { 
        return {
            width : 18,
            height : 180,
            x : side === 'left' ? 150 : this.cannvas.width - 150,
            y : (this.cannvas.height / 2) - 35,
            score : 0,
            move : DIRECTION.IDEL,
            speed : 8
        }
    }
};


var Game = {
    initalize : function () {
        this.cannvas = document.getElementById('canvas');
        this.context = this.cannvas.getContext('2d');

        this.cannvas.width = 1400;
        this.cannvas.height = 1000;
        
        this.cannvas.style.width =  (this.cannvas.width /2 ) + 'px';
        this.cannvas.style.height =  (this.cannvas.height /2 ) + 'px';

        this.player = Ai.new.call(this ,'left');
        this.ai = Ai.new.call(this ,'right');
        this.ball = Ball.new.call(this);

        this.ai.speed = 5;
        this.running = this.over = false;
        this.turn = this.ai;
        this.timer = this.round = 0 ;
        this.color = '#8c52ff';

        Pong.menu();
        Pong.listen();
    },



  endGameMenu : function (text) {

     // Change canvas font size and color

     Pong.context.font = '45px Courier New';
     Pong.context.fillStyle = this.color;

     // Draw the rectanglebehind the  " Press any key to begin "

     Pong.context.fillRect(
         Pong.cannvas.width /2 -350,
         Pong.cannvas.height /2 -48,
         700,
         100
     );

     // change the canvas color 
     Pong.context.fillStyle = '#ffffff';

     // Draw the end game menu text ( "Game Over" and  Winner )
     Pong.context.fillText(
         text,
         Pong.cannvas.width /2 ,
         Pong.cannvas.height /2 +15
     );

     setTimeout(function () {
         Pong =Object.assign({},Game );
         Pong.initalize();
     },3000 );

 },

  menu : function(){
    // Draw all the Pong objects in their current state
    Pong.draw();

    //Chnage the canvas font size and color 
    this.cannvas.font = ' 50px Courier New';
    this.context.fillStyle = this.color ;

    //Draw the retangle behind the " Press any key to begin"
  }




}











