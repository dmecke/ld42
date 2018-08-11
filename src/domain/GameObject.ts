import Position from "./Position";

export default interface GameObject
{
    getTitle(): string;
    getPosition(): Position;
}
