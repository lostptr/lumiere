import { Chip } from "react-native-paper";

interface TagProps {
  name: string
}

export default function Tag({ name }: TagProps) {
  return <Chip>{name}</Chip>;
}