<template>
    <table>
        <tr v-for="y in viewportX">
            <td v-for="x in viewportY" :style="{ width: cellSize + 'px', height: cellSize + 'px' }" @click="fireAt(createPosition(x + getOffsetX(), y + getOffsetY()))">
                <div
                    v-if="x + getOffsetX() >= 1 && x + getOffsetX() <= mapMaxX && y + getOffsetY() >= 1 && y + getOffsetY() <= mapMaxY"
                    class="cell"
                    :style="{ backgroundColor: '#' + getTileAt(createPosition(x + getOffsetX(), y + getOffsetY())).getColor() }"
                >
                    <ld-weapon-image v-if="getMap().getInventoryItemAt(createPosition(x + getOffsetX(), y + getOffsetY()))"></ld-weapon-image>
                    <ld-soldier-image
                        v-if="getMap().getSoldierAt(createPosition(x + getOffsetX(), y + getOffsetY()))"
                        :soldier="getMap().getSoldierAt(createPosition(x + getOffsetX(), y + getOffsetY()))"
                    ></ld-soldier-image>
                    <div class="position caption">
                        <div>x: {{ x + getOffsetX() }}</div>
                        <div>y: {{ y + getOffsetY() }}</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PlayerEntity from "../domain/character/Player";
import {Map} from "../domain/Map";
import Position from "../domain/Position";
import Tile from "../domain/Tile";
import config from "../config";
import SoldierImage from "../domain/character/SoldierImage.vue";
import WeaponImage from "../domain/weapon/WeaponImage";
import {EventBus} from "../service/EventBus";

@Component({
    components: {
        'ld-soldier-image': SoldierImage,
        'ld-weapon-image': WeaponImage,
    }
})
export default class Viewport extends Vue
{
    private created(): void
    {
        EventBus.$on('movement', event => {
            if (!this.getPlayer().isAlive()) {
                return;
            }
            let target = this.getTarget(event.direction);
            if (this.getTileAt(target).isBlocking()) {
                return;
            }
            this.getPlayer().moveTo(target);
            this.$forceUpdate();
        });
        EventBus.$on('pickup', () => {
            if (!this.getPlayer().isAlive()) {
                return;
            }
            let item = this.getMap().getInventoryItemAt(this.getPlayer().getPosition());
            if (item === null) {
                EventBus.$emit('error', 'nothing_to_pick_up');
                return;
            }
            let successful = this.getPlayer().pickup(item);
            if (successful) {
                this.getMap().pickupInventoryItemAt(this.getPlayer().getPosition());
                this.$forceUpdate();
            }
        });
        EventBus.$on('end_turn', () => {
            if (!this.getPlayer().isAlive()) {
                return;
            }
            this.getPlayer().resetActionPoints();
            this.$forceUpdate();
        });
    }

    private getTarget(direction: string): Position
    {
        switch (direction) {
            case 'up':
                return this.getPlayer().getPosition().add(new Position(0, -1));

            case 'down':
                return this.getPlayer().getPosition().add(new Position(0, 1));

            case 'left':
                return this.getPlayer().getPosition().add(new Position(-1, 0));

            case 'right':
                return this.getPlayer().getPosition().add(new Position(1, 0));
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

    private getOffsetX(): number
    {
        return this.getPlayer().getPosition().getX() - Math.floor((this.viewportX - 1) / 2) - 1;
    }

    private getOffsetY(): number
    {
        return this.getPlayer().getPosition().getY() - Math.floor((this.viewportY - 1) / 2) - 1;
    }

    private createPosition(x: number, y: number): Position
    {
        return new Position(x, y);
    }

    private getMap(): any
    {
        return Map;
    }

    private getPlayer(): PlayerEntity
    {
        return this.getMap().getPlayer();
    }

    private getTileAt(position: Position): Tile
    {
        return this.getMap().getTileAt(position);
    }

    private fireAt(position: Position): void
    {
        if (!this.getPlayer().isAlive()) {
            return;
        }
        let soldier = this.getMap().getSoldierAt(position);
        if (soldier === null) {
            return;
        }
        if (!this.getPlayer().hasWeapon()) {
            EventBus.$emit('error', 'no_weapon');
            return;
        }
        let successful = this.getPlayer().fire();
        if (successful) {
            soldier.reduceHitpoints(Math.floor(Math.random() * 80));
        }
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
