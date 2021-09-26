export default class ID {
  value = (Math.random() * 1000).toFixed(0)

  public isEqual(input: ID): boolean {
    return this.value === input.value
  }
}
