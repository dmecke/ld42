<template>
    <ld-notifier :notifications="notifications" @shift="shiftNotification"></ld-notifier>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {EventBus} from "../../service/EventBus";
import Notifier from "./Notifier";

@Component({
    components: {
        'ld-notifier': Notifier,
    }
})
export default class NotificationHandler extends Vue
{
    private notifications: Notification[] = [];

    private mounted(): void
    {
        EventBus.$on('notification', notification => {
            this.notifications.push(notification);
        });
    }

    private shiftNotification(): void
    {
        this.notifications.shift();
    }
}
</script>
