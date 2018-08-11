import Position from "./Position";
import Ai from "./Ai";
import Player from "./Player";
import GameObject from "./GameObject";

export default class Map
{
    public static MIN_X: number = 1;
    public static MAX_X: number = 100;
    public static MIN_Y: number = 1;
    public static MAX_Y: number = 100;

    public static CELL_SIZE: number = 32;

    public static VIEWPORT_X: number = 21;
    public static VIEWPORT_Y: number = 21;

    private readonly player: Player;
    private readonly ai: Ai[];

    public constructor(player: Player, ai: Ai[])
    {
        this.player = player;
        this.ai = ai;
    }

    public static reset(): Map
    {
        let ai = [];
        for (let i = 1; i < 100; i++) {
            ai.push(new Ai(Position.random()));
        }

        return new Map(new Player(Position.random()), ai);
    }

    public getPlayer(): Player
    {
        return this.player;
    }

    public getEntitiesAt(position: Position): GameObject[]
    {
        let entities = [];

        if (this.player.getPosition().equals(position)) {
            entities.push(this.player);
        }

        let ai = this.ai.filter(ai => ai.getPosition().equals(position));
        ai.forEach(soldier => entities.push(soldier));

        return entities;
    }
}
