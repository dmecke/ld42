<template>
    <div :style="'background-image: url(' + soldier.getImage() + ')'" class="image"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Soldier from "./Soldier";

@Component({
    props: {
        soldier: {
            type: Object as () => Soldier,
            required: true,
        }
    }
})
export default class SoldierImage extends Vue
{
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
    z-index: 2;
}
</style>
