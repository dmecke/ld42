import Soldier from "./Soldier";
import Position from "./Position";

export default class Ai implements Soldier
{
    private readonly position: Position;

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
