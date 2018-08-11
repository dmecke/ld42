<template>
    <div :style="'background-image: url(' + image + ')'" class="image"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Ai extends Vue
{
    private get image(): string
    {
        return require('./ai.png');
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 32px;
}
</style>
