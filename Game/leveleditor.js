
var level = [];

function newMapTile(texture, grid){
    var slot = new MapTile(texture, new Vector2(grid.x*tile_size, grid.y*tile_size), new Vector2(grid.x, grid.y));
    level.push(slot);
}

var square_x = 0;
var square_y = 0;
var tile_ed_size = 10.0;
var cur_sprite = 0;

var framelist = System.listDirectory("Map/Tiles");
var tilelist = new Array(framelist.length);

for (var i = 0; i < framelist.length; i++) {
    tilelist[i] = Graphics.loadImage("Map/Tiles" + "/" + "Tile_" + (i+1) + ".png");
};

function updateLevelEditorPads(){
    if(Pads.check(pad, PAD_LEFT) && !Pads.check(oldpad, PAD_LEFT) && (square_x*tile_ed_size) > 0.0){
        square_x--;
    };

    if(Pads.check(pad, PAD_RIGHT) && !Pads.check(oldpad, PAD_RIGHT) && (square_x*tile_ed_size) < (450.0-tile_ed_size)){
        square_x++;
    };

    if(Pads.check(pad, PAD_UP) && !Pads.check(oldpad, PAD_UP) && (square_y*tile_ed_size) > 0.0){
        square_y--;
    };

    if(Pads.check(pad, PAD_DOWN) && !Pads.check(oldpad, PAD_DOWN) && (square_y*tile_ed_size) < (448.0-tile_ed_size)){
        square_y++;
    };

    if(Pads.check(pad, PAD_L1) && !Pads.check(oldpad, PAD_L1) && cur_sprite > 0){
        cur_sprite--;
    };

    if(Pads.check(pad, PAD_R1) && !Pads.check(oldpad, PAD_R1) && cur_sprite < tilelist.length){
        cur_sprite++;
    };

    if(Pads.check(pad, PAD_CROSS) && !Pads.check(oldpad, PAD_CROSS)){
        newMapTile(tilelist[cur_sprite], new Vector2(square_x, square_y));
    };
}

function levelEditor_create(){

        updateLevelEditorPads();

        Graphics.drawRect(450.0, 0.0, 190.0, 448.0, Color.new(0,0,0));

        Font.ftPrint(pixeloid_small, 460.0,  15.0, 0, 190.0, 448.0, "X - Add tile", Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 460.0,  45.0, 0, 190.0, 448.0, "Δ - Return", Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 460.0,  75.0, 0, 190.0, 448.0, "D-Pad - Move", Color.new(128,128,128));
        Font.ftPrint(pixeloid_small, 460.0, 105.0, 1, 190.0, 448.0, "R1/L1 - Change \nsprite", Color.new(128,128,128));

        Graphics.drawScaleImage(tilelist[cur_sprite], 470.0, 250.0, 150.0, 150.0);
        
        for (var i = 0; i < level.length; i++) {
            Graphics.drawRect(level[i].tile.x*tile_ed_size, level[i].tile.y*tile_ed_size, tile_ed_size, tile_ed_size, Color.new(0,255,0));
            
        };

        Graphics.drawRect(square_x*tile_ed_size, square_y*tile_ed_size, tile_ed_size, tile_ed_size, Color.new(255,0,0));

        if(Pads.check(pad, PAD_START) && !Pads.check(oldpad, PAD_START)){
            writeJSON("Levels/test.json", level);
            sw_leveled = idle;
        };
        
        if(Pads.check(pad, PAD_TRIANGLE) && !Pads.check(oldpad, PAD_TRIANGLE)){
            sw_leveled = idle;
        };

}

const idle = 0;
const create_level = 1;
const edit_level = 2;
const delete_level = 3;

var leveled_item = 1;

var sw_leveled = 0;

function levelEditor_idle(){

    if(Pads.check(pad, PAD_UP) && !Pads.check(oldpad, PAD_UP)){
        leveled_item -= 1;
    };

    if(Pads.check(pad, PAD_DOWN) && !Pads.check(oldpad, PAD_DOWN)){
        leveled_item += 1;
    };

    if(Pads.check(pad, PAD_TRIANGLE) && !Pads.check(oldpad, PAD_TRIANGLE)){
        game_state = start;
    };

    if(leveled_item > 3){
        leveled_item = 1;
    } else if ( leveled_item < 1){
        leveled_item = 3;
    }

    if(Pads.check(pad, PAD_CROSS) && !Pads.check(oldpad, PAD_CROSS)){
        sw_leveled = leveled_item;
    };

    Font.ftPrint(pixeloid, 170.0, 150.0, 0, 640.0, 448.0, "Create level", leveled_item == create_level? Color.new(128,128,128):Color.new(64,64,64));
    Font.ftPrint(pixeloid, 170.0, 220.0, 0, 640.0, 448.0, "Edit level", leveled_item == edit_level? Color.new(128,128,128):Color.new(64,64,64));
    Font.ftPrint(pixeloid, 170.0, 290.0, 0, 640.0, 448.0, "Delete level", leveled_item == delete_level? Color.new(128,128,128):Color.new(64,64,64));
  
}

function levelEditor(){

    switch(sw_leveled){
        case create_level:
            levelEditor_create();
            break;
        case edit_level:
            break;
        case delete_level:
            break;
        default:
            levelEditor_idle();
            break;
    };
}
