/**
 * Generator function to generate unique id
 */

export default function* generateId() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
