<template>
    <v-jumbotron>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex text-xs-center>
                    <h3 class="display-3">Ludum Dare 42</h3>
                    <span class="subheading">{{ $t('general.description') }}</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue
{
}
</script>
