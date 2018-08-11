import Position from "./Position";
import Ai from "./character/Ai";
import Player from "./character/Player";
import Weapon from "./Weapon";
import InventoryItem from "./InventoryItem";
import Soldier from "./character/Soldier";
import config from "../config";
import Tile from "./Tile";

export const Map = new class
{
    private readonly tiles: Tile[][] = [];
    private readonly player: Player;
    private readonly ai: Ai[] = [];
    private weapons: Weapon[] = [];

    public constructor()
    {
        const waterBorder = 10;
        for (let y = 1; y <= config.map.width; y++) {
            this.tiles[y] = [];
            for (let x = 1; x <= config.map.height; x++) {
                if (x <= waterBorder || x >= config.map.width - waterBorder || y <= waterBorder || y >= config.map.height - waterBorder) {
                    this.tiles[y][x] = new Tile('water');
                } else {
                    this.tiles[y][x] = Tile.random();
                }
            }
        }

        this.player = new Player(this.createRandomNonBlockingPosition());

        for (let i = 1; i < 100; i++) {
            this.ai.push(new Ai(this.createRandomNonBlockingPosition()));
        }

        for (let i = 1; i < 1000; i++) {
            this.weapons.push(new Weapon(this.createRandomNonBlockingPosition()));
        }
    }

    private createRandomNonBlockingPosition(): Position
    {
        let position = Position.random();
        while (this.tiles[position.getY()][position.getX()].isBlocking()) {
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

    public getTileAt(position: Position): Tile
    {
        return this.tiles[position.getY()][position.getX()];
    }
};
