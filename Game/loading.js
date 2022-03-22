var bg1;
var bg2;
var bg3;
var bg4;
var bg5;

const n_yet = 0;
const loading_anim = 1;
const loading_map = 2;
const finished = 3;

var loading_state = n_yet;
var loading_started = false;

function loadGame(){
    Font.ftPrint(pixeloid, 380.0, 300.0, 0, 640.0, 448.0, "Loading...", Color.new(128,128,128));
    Display.flip();

    if(!loading_started){
        loading_started = true;
        loading_state++;
    }
    
    if(loading_state == loading_anim){
        Display.clear();
        Font.ftPrint(pixeloid, 380.0, 300.0, 0, 640.0, 448.0, "Loading...", Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 380.0, 350.0, 0, 640.0, 448.0, "Anims", Color.new(64,64,64));
        Display.flip();

        loadAnimGroup("Idle");
        loadAnimGroup("Walk");
        loadAnimGroup("Run");
        loadAnimGroup("Jump");

        loading_state++;
    }

    
    if(loading_state == loading_map){
        Display.clear();
        Font.ftPrint(pixeloid, 380.0, 300.0, 0, 640.0, 448.0, "Loading...", Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 380.0, 350.0, 0, 640.0, 448.0, "Map", Color.new(64,64,64));
        Display.flip();
        
        map = readJSON("Levels/test.json");
        
        bg1 = Graphics.loadImage("Map/Background/1.png");
        bg2 = Graphics.loadImage("Map/Background/2.png");
        bg3 = Graphics.loadImage("Map/Background/3.png");
        bg4 = Graphics.loadImage("Map/Background/4.png");
        bg5 = Graphics.loadImage("Map/Background/5.png");

        loading_state++;
    }

    if(loading_state == finished){
        Display.clear();
        ram = System.getFreeMemory();
        game_state = running;
        loading_state = n_yet;
        loading_started = false;
    }

};
