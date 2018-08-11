import GameObject from "../GameObject";

export default interface Soldier extends GameObject
{
    getHitpoints(): number;
    reduceHitpoints(amount: number): void;
    isAlive(): boolean;
    getImage(): string;
}
