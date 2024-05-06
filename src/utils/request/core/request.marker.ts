export abstract class ARequestMarker<I, O> {
    public abstract getValueId(value: O): string | string[]
    public abstract getRequestId(request: I)
}
