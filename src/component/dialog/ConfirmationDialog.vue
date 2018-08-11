<template>
    <v-dialog max-width="50%" :value="confirmation !== null" @input="confirmation = null">
        <v-card v-if="confirmation">
            <v-toolbar color="blue" flat>
                <v-toolbar-title>{{ $t('general.confirm') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>{{ $t('confirmation.' + confirmation.getMessage()) }}</v-card-text>
            <v-btn @click="confirm()">{{ $t('general.ok') }}</v-btn>
            <v-btn flat @click="cancel()">{{ $t('general.cancel') }}</v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {EventBus} from "../../service/EventBus";
import Confirmation from "./Confirmation";

@Component
export default class ConfirmationDialog extends Vue
{
    private confirmation: Confirmation|null = null;

    private mounted(): void
    {
        EventBus.$on('confirm', confirmation => this.handleConfirm(confirmation));
    }

    private handleConfirm(confirmation: Confirmation): void
    {
        this.confirmation = confirmation;
    }

    private confirm(): void
    {
        this.confirmation.execute();
        this.confirmation = null;
    }

    private cancel(): void
    {
        this.confirmation = null;
    }
}
</script>
