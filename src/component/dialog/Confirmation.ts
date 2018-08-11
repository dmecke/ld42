export default class Confirmation
{
    private readonly message: string;
    private readonly callback: Function;

    public constructor(message: string, callback: Function)
    {
        this.message = message;
        this.callback = callback;
    }

    public getMessage(): string
    {
        return this.message;
    }

    public execute(): void
    {
        this.callback();
    }
}
