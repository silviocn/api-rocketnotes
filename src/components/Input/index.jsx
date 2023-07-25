import { Container } from "./styles";

export function Input({ icon: Icon, ...rest}) { // icon: Icon to not having problems with the rules of Components having Uppercase in first letter, so you do like a 'parse'

  // {Icon && <Icon size={20} />} means: show the icon if it really exists and it has size=20

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
}
