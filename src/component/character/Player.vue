<template>
    <div :style="'background-image: url(' + image + ')'" class="image"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Player extends Vue
{
    private get image(): string
    {
        return require('./base.png');
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image {
    width: 32px;
    height: 32px;
}
</style>
