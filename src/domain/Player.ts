import Position from "./Position";
import Soldier from "./Soldier";

export default class Player implements Soldier
{
    private readonly position: Position;

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
}
