import Position from "./Position";
import Ai from "./Ai";
import Player from "./Player";
import GameObject from "./GameObject";
import Weapon from "./Weapon";
import {Tiles} from "./Tiles";

export default class Map
{
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
        let player = new Player(this.createRandomNonBlockingPosition());

        let ai = [];
        for (let i = 1; i < 100; i++) {
            ai.push(new Ai(this.createRandomNonBlockingPosition()));
        }

        let weapons = [];
        for (let i = 1; i < 1000; i++) {
            weapons.push(new Weapon(this.createRandomNonBlockingPosition()));
        }

        return new Map(player, ai, weapons);
    }

    private static createRandomNonBlockingPosition(): Position
    {
        let position = Position.random();
        while (Tiles[position.getY()][position.getX()].isBlocking()) {
            position = Position.random();
        }

        return position;
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
