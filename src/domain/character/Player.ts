import Position from "../Position";
import Soldier from "./Soldier";
import config from "../../config";
import InventoryItem from "../InventoryItem";
import {EventBus} from "../../service/EventBus";

export default class Player implements Soldier
{
    private position: Position;
    private actionPoints: number = config.action_points;
    private inventory: InventoryItem[] = [];
    private hitpoints: number = config.hitpoints;

    public constructor(position: Position)
    {
        this.position = position;
    }

    public getTitle(): string
    {
        return 'Player';
    }

    public getImage(): string
    {
        let weapon = this.hasWeapon() ? '_with_weapon' : '';

        return require('./player' + weapon + '.png');
    }

    public getPosition(): Position
    {
        return this.position;
    }

    public getActionPoints(): number
    {
        return this.actionPoints;
    }

    public resetActionPoints(): void
    {
        this.actionPoints = config.action_points;
    }

    public getHitpoints(): number
    {
        return this.hitpoints;
    }

    public reduceHitpoints(amount: number): void
    {
        this.hitpoints = Math.max(0, this.hitpoints - amount);
    }

    public isAlive(): boolean
    {
        return this.hitpoints > 0;
    }

    public hasWeapon(): boolean
    {
        return this.inventory.length > 0;
    }

    public moveTo(position: Position): void
    {
        if (this.actionPoints < 1) {
            EventBus.$emit('error', 'not_enough_action_points');
            return;
        }

        this.position = position;
        this.actionPoints--;
    }

    public pickup(item: InventoryItem): boolean
    {
        if (this.actionPoints < 5) {
            EventBus.$emit('error', 'not_enough_action_points');
            return false;
        }

        this.inventory.push(item);
        this.actionPoints -= 5;

        return true;
    }

    public fire(): boolean
    {
        if (this.actionPoints < 10) {
            EventBus.$emit('error', 'not_enough_action_points');
            return false;
        }

        this.actionPoints -= 10;

        return true;
    }
}
