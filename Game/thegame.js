
var camera = new Vector2(0.0, 50.0);
var char = new Vector2(224.0, 200.0);
var char_collision = new P();
var test_collision = new B(new V(0, 300), 1200.0, 200.0).toPolygon();
var response = new SAT.Response();
var collided = false;

function processPads() {

    if(pad.btns == 0 && oldpad.btns != 0 || pad.lx == 0 && oldpad.lx != 0){
        move_state = 0;
    }

    if((Pads.check(pad, PAD_RIGHT) && !Pads.check(oldpad, PAD_RIGHT)) || (Pads.check(pad, PAD_LEFT) && !Pads.check(oldpad, PAD_LEFT)) || (pad.lx != 0  && oldpad.lx == 0)){
        move_state = 1;
    }

    if(Pads.check(pad, PAD_RIGHT) || pad.lx > 100){
        if(!Pads.check(oldpad, PAD_RIGHT) || oldpad.lx < -100){
            char_side = 0;
        };
        char.x += char_speed[move_state-1];
        camera.x += char_speed[move_state-1];
        bg_x = doBackgroundLoop(bg_x, char_speed[move_state-1]/4);
        bg_x2 = doBackgroundLoop(bg_x2, char_speed[move_state-1]/4);

        bg1_x = doBackgroundLoop(bg1_x, char_speed[move_state-1]/3);
        bg1_x2 = doBackgroundLoop(bg1_x2, char_speed[move_state-1]/3);
    }

    if(Pads.check(pad, PAD_LEFT) || pad.lx < -100){
        if(!Pads.check(oldpad, PAD_LEFT) || oldpad.lx > 100){
            char_side = 1;
        };
        char.x -= char_speed[move_state-1];
        camera.x -= char_speed[move_state-1];
        bg_x = doBackgroundLoop(bg_x, char_speed[move_state-1]/4);
        bg_x2 = doBackgroundLoop(bg_x2, char_speed[move_state-1]/4);

        bg1_x = doBackgroundLoop(bg1_x, char_speed[move_state-1]/3);
        bg1_x2 = doBackgroundLoop(bg1_x2, char_speed[move_state-1]/3);
    }

    if(Pads.check(pad, PAD_CROSS) && !Pads.check(oldpad, PAD_CROSS)){
        if(move_state == 1) {
            move_state = 2;
        } else if(move_state == 2){
            move_state = 1;
        }
    }

    if(Pads.check(pad, PAD_SQUARE) && !Pads.check(oldpad, PAD_SQUARE)){
        move_state = 3;
    }

    if(Pads.check(pad, PAD_L1)){
        camera.x += 2.0;
    };

    if(Pads.check(pad, PAD_R1)){
        camera.x -= 2.0;
    };
};

function theGame(){
    processPads();

    Graphics.drawScaleImage(bg1, bg_x,  0.0, 640.0, 448.0);
    Graphics.drawScaleImage(bg1, bg_x2, 0.0, 640.0, 448.0);

    Graphics.drawScaleImage(bg5, bg1_x,  -195.0, 640.0, 448.0);
    Graphics.drawScaleImage(bg5, bg1_x2, -195.0, 640.0, 448.0);

    for (var i = 0; i < map.length; i++) {
        Graphics.drawScaleImage(map[i].tex, World2Screen(map[i].pos).x, World2Screen(map[i].pos).y, tile_size, tile_size);
        
    };

    response = new SAT.Response();
    collided = SAT.testPolygonPolygon(char_collision, test_collision, response);

    drawCharacter();

    if(debug){
    Graphics.drawRect(World2Screen(new Vector2(0, 300)).x, 
                      World2Screen(new Vector2(0, 300)).y, 
                      1200.0, 
                      200.0, 
                      collided? Color.new(0,128,0,64):Color.new(128,0,0,64));
    }

    if(debug){
        Font.ftPrint(pixeloid_small, 15.0, 15.0, 0, 640.0, 448.0, "\nPlayer coords:" + char.x + "," + char.y, Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 15.0, 15.0, 0, 640.0, 448.0, "\n\nCollision overlap:"+response.overlapV.x+","+response.overlapV.y, Color.new(128,128,128));
    };
};