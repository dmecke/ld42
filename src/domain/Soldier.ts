import GameObject from "./GameObject";

export default interface Soldier extends GameObject
{
    getHitpoints(): number;
    isAlive(): boolean;
}
