<template>
    <table>
        <tr v-for="y in viewportX" :style="{ height: cellSize + 'px' }">
            <td v-for="x in viewportY" :style="{ width: cellSize + 'px' }">
                <div v-if="x + offsetX >= 1 && x + offsetX <= mapMaxX && y + offsetY >= 1 && y + offsetY <= mapMaxY">
                    <div class="entity" v-for="entity in getEntitiesAt(createPosition(x + offsetX, y + offsetY))">{{ entity.getTitle() }}</div>
                    <div class="position caption grey--text">{{ createPosition(x + offsetX, y + offsetY).toString() }}</div>
                    <div class="tile caption grey--text">{{ getTileAt(createPosition(x + offsetX, y + offsetY)).getType() }}</div>
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

@Component
export default class Viewport extends Vue
{
    private get cellSize(): number
    {
        return Map.CELL_SIZE;
    }

    private get mapMaxX(): number
    {
        return Map.MAX_X;
    }

    private get mapMaxY(): number
    {
        return Map.MAX_Y;
    }

    private get viewportX(): number
    {
        return Map.VIEWPORT_X;
    }

    private get viewportY(): number
    {
        return Map.VIEWPORT_Y;
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
        return this.map.getTileAt(position);
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
table {
    border-collapse: collapse;
    tr {
        td {
            border: 1px solid #424242;
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
            .tile {
                text-align: center;
                display: none;
            }
            &:hover {
                .tile {
                    display: block;
                }
            }
        }
    }
}
</style>