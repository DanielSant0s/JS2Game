
//User settings
var char_scale = 3.0;
var char_speed = [3.0, 6.0];

var move_state = 0; 

//0 = RIGHT, 1 = LEFT
var char_side = 0;

var frame = 0;
var fr_mult = 0;

var move_set = [];
function loadAnimGroup(name) {
    var framelist = System.listDirectory("Anim/" + name);
    var slot = new Array(framelist.length);

    for (var i = 0; i < framelist.length; i++) {
        slot[i] = Graphics.loadImage("Anim/" + name + "/" + name + "-" + i + ".png");
    };
    console.log("dummy_game: Free Memory after loading " + name + " framelist: " + Math.ceil(System.getFreeMemory()/1024) + " KB\n");
    move_set.push({sprite:slot, width:Graphics.getImageWidth(slot[0]), height:Graphics.getImageHeight(slot[0]), count:framelist.length});
};

function drawBoundingBox(){
    if (char_side == 0){
        Graphics.drawRect(World2Screen(char).x-move_set[move_state].width/2, 
                          World2Screen(char).y, 
                          move_set[move_state].width*char_scale, 
                          move_set[move_state].height*char_scale, 
                          Color.new(128,0,128,64));
    } else {
        Graphics.drawRect(World2Screen(char).x+move_set[move_state].width*2, 
                          World2Screen(char).y, 
                          -move_set[move_state].width*char_scale, 
                          move_set[move_state].height*char_scale, 
                          Color.new(128,0,128,64));
    };
};

function drawCharacter() {

    
    if(Timer.getTime(timer) > 500) {
        frame++;
        Timer.reset(timer);
    }

    if(frame > move_set[move_state].count-1) {
        frame = 0;
    }

    if(debug){
        drawBoundingBox();
    };

    if(char_side == 0){
        Graphics.drawScaleImage(move_set[move_state].sprite[frame], 
            World2Screen(char).x-move_set[move_state].width/2-7.0, 
            World2Screen(char).y-3.5, 
            move_set[move_state].width*char_scale*1.1, 
            move_set[move_state].height*char_scale*1.05, Color.new(0,0,0));

        Graphics.drawScaleImage(move_set[move_state].sprite[frame], 
            World2Screen(char).x-move_set[move_state].width/2, 
            World2Screen(char).y, 
            move_set[move_state].width*char_scale, 
            move_set[move_state].height*char_scale);

            char_collision = new B(new V(char.x-move_set[move_state].width/2, char.y), 
                                    move_set[move_state].width*char_scale,
                                    move_set[move_state].height*char_scale).toPolygon();

    } else {
        Graphics.drawScaleImage(move_set[move_state].sprite[frame], 
            World2Screen(char).x+move_set[move_state].width*2+7.0, 
            World2Screen(char).y-3.5, 
            -move_set[move_state].width*char_scale*1.1, 
            move_set[move_state].height*char_scale*1.05, Color.new(0,0,0));

        Graphics.drawScaleImage(move_set[move_state].sprite[frame], 
            World2Screen(char).x+move_set[move_state].width*2, 
            World2Screen(char).y, 
            -move_set[move_state].width*char_scale, 
            move_set[move_state].height*char_scale);

        char_collision = new B(new V(char.x+move_set[move_state].width*2, char.y), 
            -move_set[move_state].width*char_scale,
            move_set[move_state].height*char_scale).toPolygon();
    }
};