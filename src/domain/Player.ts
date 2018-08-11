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

    public moveUp(): void
    {
        if (this.actionPoints < 1) {
            EventBus.$emit('error', 'not_enough_action_points');
            return;
        }

        this.position = this.position.up();
        this.actionPoints--;
    }

    public moveDown(): void
    {
        if (this.actionPoints < 1) {
            EventBus.$emit('error', 'not_enough_action_points');
            return;
        }

        this.position = this.position.down();
        this.actionPoints--;
    }

    public moveLeft(): void
    {
        if (this.actionPoints < 1) {
            EventBus.$emit('error', 'not_enough_action_points');
            return;
        }

        this.position = this.position.left();
        this.actionPoints--;
    }

    public moveRight(): void
    {
        if (this.actionPoints < 1) {
            EventBus.$emit('error', 'not_enough_action_points');
            return;
        }

        this.position = this.position.right();
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
