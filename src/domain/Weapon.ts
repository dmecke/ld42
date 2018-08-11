import GameObject from "./GameObject";
import Position from "./Position";

export default class Weapon implements GameObject
{
    private readonly position;

    public constructor(position: Position)
    {
        this.position = position;
    }

    public getPosition(): Position
    {
        return this.position;
    }

    public getTitle(): string
    {
        return 'Weapon';
    }
}
