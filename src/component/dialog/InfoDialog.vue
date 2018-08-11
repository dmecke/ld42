<template>
    <v-dialog max-width="50%" :value="message !== null" @input="message = null">
        <v-card>
            <v-toolbar color="blue" flat>
                <v-toolbar-title>{{ $t('general.info') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>{{ message }}</v-card-text>
            <v-btn flat @click="message = null">{{ $t('general.ok') }}</v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {EventBus} from "../../service/EventBus";

@Component
export default class InfoDialog extends Vue
{
    private message: string|null = null;

    private mounted(): void
    {
        EventBus.$on('info', info => this.handleInfo(info));
    }

    private handleInfo(info: string): void
    {
        this.message = this.$t('info.' + info).toString();
    }
}
</script>
