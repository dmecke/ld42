<template>
    <v-container>
        <ld-viewport></ld-viewport>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Viewport from "../component/Viewport";

@Component({
    components: {
        'ld-viewport': Viewport,
    }
})
export default class Game extends Vue
{
    private mounted(): void
    {
        console.log('mounted in ' + (new Date().getTime() - this.$store.state.startTime) + 'ms');
    }
}
</script>
