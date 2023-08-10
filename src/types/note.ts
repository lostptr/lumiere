export default interface Note {
  id: string,
  title: string,
  content: string,
  cover?: string,
  tags?: string[],
}