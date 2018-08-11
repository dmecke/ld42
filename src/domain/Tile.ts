export default class Tile
{
    private static randomTypes = [
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
        return new Tile(this.randomTypes[Math.floor(Math.random() * this.randomTypes.length)]);
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

            case 'water':
                return '0D47A1';
        }

        throw new Error('unknown tile "' + this.type + '"');
    }

    public isBlocking(): boolean
    {
        let blockingTiles = ['tree', 'stone', 'water'];

        return blockingTiles.indexOf(this.type) !== -1;
    }
}
