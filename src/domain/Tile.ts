export default class Tile
{
    private static types = ['grass', 'tree', 'stone'];

    private readonly type: string;

    public constructor(type: string)
    {
        this.type = type;
    }

    public static random(): Tile
    {
        return new Tile(this.types[Math.floor(Math.random() * this.types.length)]);
    }

    public getType(): string
    {
        return this.type;
    }
}
