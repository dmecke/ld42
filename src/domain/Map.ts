import Position from "./Position";
import Ai from "./Ai";
import Player from "./Player";
import GameObject from "./GameObject";
import Weapon from "./Weapon";

export default class Map
{
    public static MIN_X: number = 1;
    public static MAX_X: number = 1000;
    public static MIN_Y: number = 1;
    public static MAX_Y: number = 1000;

    public static CELL_SIZE: number = 32;

    public static VIEWPORT_X: number = 21;
    public static VIEWPORT_Y: number = 21;

    private readonly player: Player;
    private readonly ai: Ai[];
    private readonly weapons: Weapon[];

    public constructor(player: Player, ai: Ai[], weapons: Weapon[])
    {
        this.player = player;
        this.ai = ai;
        this.weapons = weapons;
    }

    public static reset(): Map
    {
        let player = new Player(Position.random());

        let ai = [];
        for (let i = 1; i < 100; i++) {
            ai.push(new Ai(Position.random()));
        }

        let weapons = [];
        for (let i = 1; i < 1000; i++) {
            weapons.push(new Weapon(Position.random()));
        }

        return new Map(player, ai, weapons);
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

        let weapons = this.weapons.filter(weapon => weapon.getPosition().equals(position));
        weapons.forEach(weapon => entities.push(weapon));

        return entities;
    }
}
