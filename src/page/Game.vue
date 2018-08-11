<template>
    <v-container>
        <ld-viewport></ld-viewport>
        <v-btn color="primary" @click="showMiniMap = true">{{ $t('controls.show_mini_map') }}</v-btn>
        <v-dialog :width="width" v-model="showMiniMap">
            <v-card>
                <ld-mini-map v-if="showMiniMap"></ld-mini-map>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Viewport from "../component/Viewport";
import MiniMap from '../component/MiniMap';
import config from "../config";

@Component({
    components: {
        'ld-viewport': Viewport,
        'ld-mini-map': MiniMap,
    }
})
export default class Game extends Vue
{
    private showMiniMap: boolean = false;

    private mounted(): void
    {
        console.log('mounted in ' + (new Date().getTime() - this.$store.state.startTime) + 'ms');
    }

    private get width(): number
    {
        return config.map.width;
    }
}
</script>
