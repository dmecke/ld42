import Position from "./Position";
import Ai from "./Ai";
import Player from "./Player";
import GameObject from "./GameObject";
import Weapon from "./Weapon";
import {Tiles} from "./Tiles";
import InventoryItem from "./InventoryItem";
import Soldier from "./Soldier";

export default class Map
{
    private readonly player: Player;
    private readonly ai: Ai[];
    private weapons: Weapon[];

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

    public getSoldiersAlive(): number
    {
        let soldiersAlive = this.ai.filter(ai => ai.isAlive()).length;
        if (this.player.isAlive()) {
            soldiersAlive++;
        }

        return soldiersAlive;
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

    public getSoldierAt(position: Position): Soldier|null
    {
        let soldiers = [];

        if (this.player.getPosition().equals(position)) {
            soldiers.push(this.player);
        }

        let ai = this.ai.filter(ai => ai.getPosition().equals(position));
        ai.forEach(soldier => soldiers.push(soldier));

        if (soldiers.length > 1) {
            throw new Error('there must be no more than one soldier at a position');
        }

        if (soldiers.length === 0) {
            return null;
        }

        return soldiers[0];
    }

    public getInventoryItemAt(position: Position): InventoryItem|null
    {
        let items = [];

        let weapons = this.weapons.filter(weapon => weapon.getPosition().equals(position));
        weapons.forEach(weapon => items.push(weapon));

        if (items.length > 1) {
            throw new Error('there must be no more than one inventory item at a position');
        }

        if (items.length === 0) {
            return null;
        }

        return items[0];
    }

    public pickupInventoryItemAt(position: Position): void
    {
        this.weapons = this.weapons.filter(weapon => !weapon.getPosition().equals(position));
    }
}
