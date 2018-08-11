export default class Tile
{
    private static types = [
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'grass',
        'tree',
        'tree',
        'tree',
        'stone',
    ];

    private readonly type: string;

    public constructor(type: string)
    {
        this.type = type;
    }

    public static random(): Tile
    {
        return new Tile(this.types[Math.floor(Math.random() * this.types.length)]);
    }

    public getColor(): string
    {
        switch (this.type) {
            case 'grass':
                return '8BC34A';

            case 'tree':
                return '1B5E20';

            case 'stone':
                return '607D8B';
        }

        throw new Error('unknown tile "' + this.type + '"');
    }

    public isBlocking(): boolean
    {
        let blockingTiles = ['tree', 'stone'];

        return blockingTiles.indexOf(this.type) !== -1;
    }
}
