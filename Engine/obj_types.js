

var V = SAT.Vector;
var P = SAT.Polygon;
var B = SAT.Box;

function Vector2(x_pos, y_pos) {
    this.x = x_pos;
    this.y = y_pos;
};

function MapTile(texture, worldpos, grid) {
    this.tex = texture;
    this.pos = worldpos;
    this.tile = grid;
};
