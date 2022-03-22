
var tile_size = 100.0;

var bg_x = 0.0
var bg_x2 = -638.5

var bg1_x = 0.0
var bg1_x2 = -638.5


function doBackgroundLoop(sc_pos, sc_speed) {
    if(char_side == 0){
        sc_pos -= sc_speed;
        if (sc_pos <= -638.5) {
          sc_pos = 638.5
        };
    } else {
        sc_pos += sc_speed;
        if (sc_pos >= 638.5) {
          sc_pos = -638.5
        };
    };
    return sc_pos;
};

function World2Screen(worldcoords) {
    return new Vector2(worldcoords.x-camera.x, worldcoords.y-camera.y);
};

function Screen2World(worldcoords) {
    return new Vector2(worldcoords.x+camera.x, worldcoords.y+camera.y);
};

var map = [];

function loadMapTile(texture, grid) {
    var slot = new MapTile(texture, new Vector2(grid.x*tile_size, grid.y*tile_size), new Vector2(grid.x, grid.y));
    map.push(slot);
};