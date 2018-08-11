import Soldier from "./Soldier";
import Position from "./Position";
import config from "../config";

export default class Ai implements Soldier
{
    private readonly position: Position;
    private readonly actionPoints: number = config.action_points;

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
}
