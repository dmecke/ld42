import config from "../config";

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
            Math.floor(Math.random() * config.map.width + 1),
            Math.floor(Math.random() * config.map.height + 1),
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
