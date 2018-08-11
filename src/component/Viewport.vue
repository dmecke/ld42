<template>
    <table>
        <tr v-for="y in viewportX">
            <td v-for="x in viewportY" :style="{ width: cellSize + 'px', height: cellSize + 'px' }">
                <div
                    v-if="x + offsetX >= 1 && x + offsetX <= mapMaxX && y + offsetY >= 1 && y + offsetY <= mapMaxY"
                    class="cell"
                    :style="{ backgroundColor: '#' + getTileAt(createPosition(x + offsetX, y + offsetY)).getColor() }"
                >
                    <template v-for="entity in getEntitiesAt(createPosition(x + offsetX, y + offsetY))">
                        <ld-weapon v-if="entity.getTitle() === 'Weapon'"></ld-weapon>
                        <ld-ai v-if="entity.getTitle() === 'Ai'"></ld-ai>
                        <ld-player v-if="entity.getTitle() === 'Player'"></ld-player>
                    </template>
                    <div class="position caption">
                        <div>x: {{ x + offsetX }}</div>
                        <div>y: {{ y + offsetY }}</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerEntity from "../domain/Player";
import GameObject from "../domain/GameObject";
import Map from "../domain/Map";
import Position from "../domain/Position";
import Tile from "../domain/Tile";
import {Tiles} from "../domain/Tiles";
import config from "../config";
import Player from "./character/Player";
import Ai from "./character/Ai";
import Weapon from "./weapon/Weapon";
import {EventBus} from "../service/EventBus";

@Component({
    components: {
        'ld-player': Player,
        'ld-ai': Ai,
        'ld-weapon': Weapon,
    }
})
export default class Viewport extends Vue
{
    private created(): void
    {
        EventBus.$on('movement', event => {
            if (!this.player.isAlive()) {
                return;
            }
            let target = this.getTarget(event.direction);
            if (this.getTileAt(target).isBlocking()) {
                return;
            }
            this.player.moveTo(target);
        });
        EventBus.$on('pickup', () => {
            if (!this.player.isAlive()) {
                return;
            }
            let item = this.map.getInventoryItemAt(this.player.getPosition());
            if (item === null) {
                EventBus.$emit('error', 'nothing_to_pick_up');
                return;
            }
            let successful = this.player.pickup(item);
            if (successful) {
                this.map.pickupInventoryItemAt(this.player.getPosition());
            }
        });
        EventBus.$on('end_turn', () => {
            if (!this.player.isAlive()) {
                return;
            }
            this.player.resetActionPoints();
        });
    }

    private getTarget(direction: string): Position
    {
        switch (direction) {
            case 'up':
                return this.player.getPosition().add(new Position(0, -1));

            case 'down':
                return this.player.getPosition().add(new Position(0, 1));

            case 'left':
                return this.player.getPosition().add(new Position(-1, 0));

            case 'right':
                return this.player.getPosition().add(new Position(1, 0));
        }

        throw new Error('unknown movement direction: "' + direction + '"');
    }

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

    private get player(): PlayerEntity
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
                position: relative;
                .position {
                    text-align: center;
                    display: none;
                    div {
                        white-space: nowrap;
                        font-size: 11px;
                    }
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
