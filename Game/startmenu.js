
const start_game = 0;
const level_editor = 1;
const options = 2;

var menu_item = start_game;

function startMenu(){

    if(Pads.check(pad, PAD_UP) && !Pads.check(oldpad, PAD_UP)){
        menu_item -= 1;
    };

    if(Pads.check(pad, PAD_DOWN) && !Pads.check(oldpad, PAD_DOWN)){
        menu_item += 1;
    };

    if(menu_item > 2){
        menu_item = 0;
    } else if ( menu_item < 0){
        menu_item = 2;
    }

    if(Pads.check(pad, PAD_CROSS) && !Pads.check(oldpad, PAD_CROSS)){
        switch(menu_item){
            case start_game:
                game_state = loading;
                break;
            case level_editor:
                game_state = level_ed;
                break;
            case options:
                game_state = options_st;
                break;
            default:
                break;
        };
    };

    Font.ftPrint(pixeloid, 170.0, 150.0, 0, 640.0, 448.0, "Start Game", menu_item == 0? Color.new(128,128,128):Color.new(64,64,64));
    Font.ftPrint(pixeloid, 170.0, 220.0, 0, 640.0, 448.0, "Level Editor", menu_item == 1? Color.new(128,128,128):Color.new(64,64,64));
    Font.ftPrint(pixeloid, 170.0, 290.0, 0, 640.0, 448.0, "Options",    menu_item == 2? Color.new(128,128,128):Color.new(64,64,64));

};