export default class Literal<T> {
    constructor(private value: T) {}

    valueOf() {
        return this.value;
    }
}
