import Tile from "./Tile";
import config from "../config";

let tiles = [];
for (let y = 1; y <= config.map.width; y++) {
    tiles[y] = [];
    for (let x = 1; x <= config.map.height; x++) {
        tiles[y][x] = Tile.random();
    }
}

export const Tiles = tiles;
