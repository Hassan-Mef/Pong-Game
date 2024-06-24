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

    this.context.fillRect(
        this.cannvas.width / 2 -350 ,
        this.cannvas.height / 2 -48,
        700,
        100
    );

    // Change the canvas color
    this.context.fillStyle = '#ffffff';

    // Draw the menu text ( " Press any key to begin " )
    this.context.fillText(
        'Press any key to begin',
        this.cannvas.width / 2,
        this.cannvas.height / 2 + 15
    );

  },

  // Update all objects 

  update : function() {
    if(!this.over ){

        // if the ball collides with bound limits   

        if(this.ball.x <=0 ) Pong._resetTurn.call(this, this.ai , this.player);
        if(this.ball.x >= this.cannvas.width - this.ball.width ) Pong._resetTurn.call(this, this.player, this.ai);
        if(this.ball.y <=0 ) this.ball.moveY = DIRECTION.DOWN;
        if(this.ball.y >= this.cannvas.height - this.ball.height ) this.ball.moveY = DIRECTION.UP;

        // move player if they move value was update by a keyboard event

        if(this.player.move === DIRECTION.UP) this.player.y -= this.player.speed ;
        else if(this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed ;

        // On new server (start of each turn ) move bal to the correct side 
        
        if (  Pong._turnDelayIsOver.call(this) && this.turn){
            this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT ;
            this.ball.moveY = [DIRECTION.UP , DIRECTION.DOWN][Math.round(Math.random() )] ;
            this.ball.y =Math.floor(Math.random() * this.cannvas.height -200 ) +200 ;
            this.turn = null;
            
        }

        //if player collides with bound limits , update the x and y coords,

        if(this.player.y <= 0) this.player.y = 0 ;
        else if (this.player.y >= (this.canvas.height -this.player.height)) this.player.y = (this.canvas.height - this.player.height);

        // Move ball in intended direction based on moveY and moveX

        if(this.ai.y > this.ball.y - (this.ai.height /2)) {
            if(this.ball.moveX ===DIRECTION.RIGHT) this.ai.y -= this.ai.speed /1.5 ;
            else this.ai.y -= this.ai.speed / 4 ;
        }

        if(this.ai.y < this.ball.y - (this.ai.height /2)) {
            if(this.ball.moveX ===DIRECTION.RIGHT) this.ai.y += this.ai.speed /1.5 ;
            else this.ai.y += this.ai.speed / 4 ;
        }

        // Handle ai wall collision 

        if(this.ai.y >= this.canvas.height- this.ai.height) this.ai.y = this.cannvas.height -this.ai.height;
        else if (this.ai.y <= 0 ) this.ai.y =0 ;

        //Handle Player ball collisions

        if(this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
            if(this.ball.y <= this.player.y +this.player.height && this.ball.y + this.ball.height >= this.player.y){
                this.ball.x = (this.player.x +this.ball.width);
                this.ball.moveX = DIRECTION.RIGHT ;
            }
        }

        // Handle ai ball collision 

        if(this,ball.x -this.ball.width <=  this.ai.x && this.ball.x >= this.ai.x -this.ai.width) {
            if(this.ball.y <= this.ai.y +this.ai.height && this.ball.y +this.ball.height >= this.ai.y) {
                this.ball.x = (this.ai.x +this.ball.width);
                this.ball.moveX = DIRECTION.LEFT ;
    
            }
        }


        // Handle the end of round transition 
        // Check to see of the player won the round 

        if(this.player.score === rounds[this.round]) {
            // Check to see if there are any more rounds left and display the victory screen if there are not left 

            if(!round[this.round +1]) {
                this.over = true ;
                setTimeout(function () { Pong.endGameMenu('Winner!'); } ,100 ) ;

            }else {
                
            }
        }








    }






}











