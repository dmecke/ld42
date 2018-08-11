import Soldier from "./Soldier";
import Position from "./Position";
import config from "../config";

export default class Ai implements Soldier
{
    private readonly position: Position;
    private readonly actionPoints: number = config.action_points;
    private hitpoints: number = config.hitpoints;

    public constructor(position: Position)
    {
        this.position = position;
    }

    public getTitle(): string
    {
        return 'Ai';
    }

    public getPosition(): Position
    {
        return this.position;
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
}
