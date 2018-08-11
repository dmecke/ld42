import Position from "./Position";
import InventoryItem from "./InventoryItem";

export default class Weapon implements InventoryItem
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
