<template>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import config from "../config";
import {Tiles} from "../domain/Tiles";

@Component
export default class MiniMap extends Vue
{
    private mounted(): void
    {
        let c: HTMLCanvasElement = this.$refs.canvas as any;
        let context = c.getContext('2d') as any;

        for (let y = 1; y <= config.map.height; y++) {
            for (let x = 1; x <= config.map.width; x++) {
                context.fillStyle = '#' + Tiles[y][x].getColor();
                context.fillRect(x, y, 1, 1);
            }
        }
    }

    private get width(): number
    {
        return config.map.width;
    }

    private get height(): number
    {
        return config.map.height;
    }
}
</script>
