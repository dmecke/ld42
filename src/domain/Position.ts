import Map from "./Map";

export default class Position
{
    private readonly x: number;
    private readonly y: number;

    public constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public static random(): Position
    {
        return new Position(
            Math.floor(Math.random() * Map.MAX_X + Map.MIN_X),
            Math.floor(Math.random() * Map.MAX_Y + Map.MIN_Y),
        );
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public toString(): string
    {
        return this.x + '|' + this.y;
    }

    public equals(position: Position): boolean
    {
        return this.x === position.x && this.y === position.y;
    }
}
