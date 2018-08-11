import Position from "./Position";
import Soldier from "./Soldier";
import config from "../config";
import InventoryItem from "./InventoryItem";
import {EventBus} from "../service/EventBus";

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
}
