
var debug = true;

var SAT = require('Engine/SAT');
dofile("Engine/filesystem.js");
dofile("Engine/obj_types.js");
dofile("Engine/anim.js");
dofile("Engine/world.js");

Font.ftInit();
var pixeloid = Font.ftLoad("Font/PixeloidMono-1G8ae.ttf");
var pixeloid_small = Font.ftLoad("Font/PixeloidMono-1G8ae.ttf");

Font.ftSetPixelSize(pixeloid_small, 20.0, 20.0);

var oldpad = Pads.get();
var pad = Pads.get();

const start = 0;
const loading = 1;
const running = 2;
const level_ed = 3;
const options_st = 4;
const paused = 5;

var game_state = start;

var fps = 0;

var ram;

dofile("Game/loading.js")
dofile("Game/thegame.js");
dofile("Game/startmenu.js");
dofile("Game/leveleditor.js");

var font_size = {width:20.0, height:20.0}; 

Display.setVSync(true);
var vsync_state = false;

var timer = Timer.new();

while(true){
    Display.clear(Color.new(36, 36, 36));

    oldpad = pad;
    pad = Pads.get();

    if(Pads.check(pad, PAD_SELECT) && !Pads.check(oldpad, PAD_SELECT)){
        if(debug){
            debug = false;
        } else {
            debug = true;
        };
    };

    switch(game_state){
        case start:
            if(font_size.width != 40.0 || font_size.height != 40.0){
                Font.ftSetPixelSize(pixeloid, 40.0, 40.0);
                font_size.width = 40.0;
                font_size.height = 40.0;
            };
            startMenu();
            break;
        case loading:
            if(font_size.width != 40.0 || font_size.height != 40.0){
                Font.ftSetPixelSize(pixeloid, 40.0, 40.0);
                font_size.width = 40.0;
                font_size.height = 40.0;
            };
            loadGame();
            break;
        case running:
            if(font_size.width != 20.0 || font_size.height != 20.0){
                Font.ftSetPixelSize(pixeloid, 20.0, 20.0);
                font_size.width = 20.0;
                font_size.height = 20.0;
            };
            theGame();
            break;
        case options_st:
            break;
        case level_ed:
            if(font_size.width != 40.0 || font_size.height != 40.0){
                Font.ftSetPixelSize(pixeloid, 40.0, 40.0);
                font_size.width = 40.0;
                font_size.height = 40.0;
            };
            levelEditor();
            break;
        case paused:
            break;
        default:
            break;
    };

    if(Pads.check(pad, PAD_R2) && !Pads.check(oldpad, PAD_R2)){
        Timer.reset(timer);
    };

    fps = Display.getFPS(240);
    
    if(debug){
        Font.ftPrint(pixeloid_small, 15.0, 15.0, 0, 640.0, 448.0, "Free RAM:" + Math.ceil(ram/1024) + "KB - " + fps + "FPS - " + Timer.getTime(timer)/2000 + " Time", Color.new(128,128,128));
    };

    /*if(fps > 30 && !vsync_state){
        Display.setVSync(true);
        vsync_state = true;
    } else if (vsync_state){
        Display.setVSync(false);
        vsync_state = false;
    };*/
    Display.flip();
    
    
}