export default class Notification
{
    private readonly message: string;
    private readonly params: object;

    public constructor(message: string, params: object)
    {
        this.message = message;
        this.params = params;
    }

    public getMessage(): string
    {
        return this.message;
    }

    public getParams(): object
    {
        return this.params;
    }
}
