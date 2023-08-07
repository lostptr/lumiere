export default interface Note {
  id: number,
  title: string,
  content: string,
  cover?: any,
  tags?: string[],
}