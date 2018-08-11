import Tile from "./Tile";
import config from "../config";

let tiles = [];
const waterBorder = 10;
for (let y = 1; y <= config.map.width; y++) {
    tiles[y] = [];
    for (let x = 1; x <= config.map.height; x++) {
        if (x <= waterBorder || x >= config.map.width - waterBorder || y <= waterBorder || y >= config.map.height - waterBorder) {
            tiles[y][x] = new Tile('water');
        } else {
            tiles[y][x] = Tile.random();
        }
    }
}

export const Tiles = tiles;
