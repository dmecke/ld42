<template>
    <v-app dark>
        <v-navigation-drawer app clipped v-model="isOpenLeftMenu">
            <v-list>
                <v-list-tile router to="/">
                    <v-list-tile-content>Home</v-list-tile-content>
                </v-list-tile>
                <v-list-tile router to="/game">
                    <v-list-tile-content>Game</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    {{ $t('stats.action_points') }}: {{ $store.state.map.getPlayer().getActionPoints() }}
                </v-list-tile>
                <v-list-tile>
                    {{ $t('stats.hitpoints') }}: {{ $store.state.map.getPlayer().getHitpoints() }}
                </v-list-tile>
                <v-list-tile>
                    {{ $t('stats.soldiers_alive') }}: {{ $store.state.map.getSoldiersAlive() }}
                </v-list-tile>
                <v-list-tile>
                    <v-btn color="primary" @click="endTurn()">{{ $t('general.end_turn') }}</v-btn>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer app right clipped v-model="isOpenRightMenu" class="chat">
            Right Navigation
        </v-navigation-drawer>
        <v-toolbar app flat clipped-left clipped-right>
            <v-toolbar-side-icon @click.stop="isOpenLeftMenu = !isOpenLeftMenu"></v-toolbar-side-icon>
            <v-toolbar-title>Ludum Dare 42</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="isOpenRightMenu = !isOpenRightMenu"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer app class="pa-3">
            <div>Made for Ludum Dare 42 by <a href="https://www.twitter.com/danielmecke" target="_blank">@danielmecke</a>.</div>
        </v-footer>
        <ld-info-dialog></ld-info-dialog>
        <ld-error-dialog></ld-error-dialog>
        <ld-confirmation-dialog></ld-confirmation-dialog>
        <ld-notification-handler></ld-notification-handler>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import InfoDialog from './dialog/InfoDialog';
import ErrorDialog from './dialog/ErrorDialog';
import ConfirmationDialog from './dialog/ConfirmationDialog';
import NotificationHandler from './notification/NotificationHandler';
import {EventBus} from "../service/EventBus";

@Component({
    components: {
        'ld-info-dialog': InfoDialog,
        'ld-error-dialog': ErrorDialog,
        'ld-confirmation-dialog': ConfirmationDialog,
        'ld-notification-handler': NotificationHandler,
    },
})
export default class App extends Vue
{
    private isOpenLeftMenu: boolean = true;
    private isOpenRightMenu: boolean = false;

    private endTurn(): void
    {
        EventBus.$emit('end_turn');
    }
}
</script>
