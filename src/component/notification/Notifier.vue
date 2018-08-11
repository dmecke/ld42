<template>
    <v-snackbar v-model="isVisible">
        {{ currentNotification }}
        <v-btn flat @click="isVisible = false">{{ $t('general.close') }}</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Notification from "./Notification";

@Component({
    props: {
        notifications: {
            type: Array,
            required: true,
        },
    },
    watch: {
        isVisible() {
            if (this.isVisible) {
                return;
            }
            if (this.notifications.length === 0) {
                return;
            }
            this.$nextTick(() => this.shiftMessage());
        },
        notifications() {
            if (!this.isVisible) {
                this.shiftMessage();
            }
        },
    },
})
export default class Notifier extends Vue
{
    private notifications: Notification[];

    private isVisible: boolean = false;
    private currentNotification: string|null = null;

    private shiftMessage(): void
    {
        this.currentNotification = this.$t('notification.' + this.notifications[0].getMessage(), this.notifications[0].getParams()).toString();
        this.isVisible = true;
        this.$emit('shift');
    }
}
</script>
