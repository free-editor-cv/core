export function createUid(): string {
  return Math.random().toString(16).slice(2)
}
