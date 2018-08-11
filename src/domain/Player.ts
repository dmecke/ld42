import Position from "./Position";
import Soldier from "./Soldier";
import config from "../config";
import {EventBus} from "../service/EventBus";

export default class Player implements Soldier
{
    private position: Position;
    private actionPoints: number = config.action_points;

    public constructor(position: Position)
    {
        this.position = position;
        EventBus.$on('movement', event => {
            switch (event.direction) {
                case 'up':
                    this.position = this.position.up();
                    break;

                case 'down':
                    this.position = this.position.down();
                    break;

                case 'left':
                    this.position = this.position.left();
                    break;

                case 'right':
                    this.position = this.position.right();
                    break;

                default:
                    throw new Error('unknown movement direction: "' + event.direction + '"');
            }
            this.actionPoints--;
        });
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
}
