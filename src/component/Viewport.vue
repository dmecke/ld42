<template>
    <table>
        <tr v-for="y in viewportX">
            <td v-for="x in viewportY" :style="{ width: cellSize + 'px', height: cellSize + 'px' }">
                <div
                    v-if="x + offsetX >= 1 && x + offsetX <= mapMaxX && y + offsetY >= 1 && y + offsetY <= mapMaxY"
                    class="cell"
                    :style="{ backgroundColor: '#' + getTileAt(createPosition(x + offsetX, y + offsetY)).getColor() }"
                >
                    <div class="entity" v-for="entity in getEntitiesAt(createPosition(x + offsetX, y + offsetY))">
                        <template v-if="entity.getTitle() !== 'Player'">{{ entity.getTitle() }}</template>
                        <ld-player v-if="entity.getTitle() === 'Player'"></ld-player>
                    </div>
                    <div class="position caption">{{ createPosition(x + offsetX, y + offsetY).toString() }}</div>
                </div>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Soldier from "../domain/Soldier";
import GameObject from "../domain/GameObject";
import Map from "../domain/Map";
import Position from "../domain/Position";
import Tile from "../domain/Tile";
import {Tiles} from "../domain/Tiles";
import config from "../config";
import Player from "./character/Player";

@Component({
    components: {
        'ld-player': Player,
    }
})
export default class Viewport extends Vue
{
    private get cellSize(): number
    {
        return config.cell_size;
    }

    private get mapMaxX(): number
    {
        return config.map.width;
    }

    private get mapMaxY(): number
    {
        return config.map.height;
    }

    private get viewportX(): number
    {
        return config.viewport_width;
    }

    private get viewportY(): number
    {
        return config.viewport_height;
    }

    private get offsetX(): number
    {
        return this.player.getPosition().getX() - Math.floor((this.viewportX - 1) / 2) - 1;
    }

    private get offsetY(): number
    {
        return this.player.getPosition().getY() - Math.floor((this.viewportY - 1) / 2) - 1;
    }

    private createPosition(x: number, y: number): Position
    {
        return new Position(x, y);
    }

    private get map(): Map
    {
        return this.$store.state.map;
    }

    private get player(): Soldier
    {
        return this.map.getPlayer();
    }

    private getEntitiesAt(position: Position): GameObject[]
    {
        return this.map.getEntitiesAt(position);
    }

    private getTileAt(position: Position): Tile
    {
        return Tiles[position.getY()][position.getX()];
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
table {
    border-collapse: collapse;
    tr {
        td {
            .cell {
                width: 100%;
                height: 100%;
                .entity {
                    text-align: center;
                }
                .position {
                    text-align: center;
                    display: none;
                }
                &:hover {
                    .position {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
