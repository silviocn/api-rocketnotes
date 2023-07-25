import { FiPlus } from 'react-icons/fi'; // importing icon used in new note button
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from './../../components/Note';
import { Header } from './../../components/Header';
import { Input } from './../../components/Input';
import { Section } from './../../components/Section';
import { ButtonText } from './../../components/ButtonText';

export function Home() {
  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText title="All" isActive/></li>
        <li><ButtonText title="React" /></li>
        <li><ButtonText title="Nodejs" /></li>
      </Menu>

      <Search>
        <Input placeholder="Search by title"  />
      </Search>

      <Content>
        <Section title="My Notes">
          <Note data={{
            title: 'React Model', 
            tags: [
              {id: '1', name: 'react'},
              {id: '2', name: 'rocket seat'}
            ] 
            }}
            />
        </Section>
      </Content>
    
      <NewNote to="/new">
        <FiPlus />
        Create Note
      </NewNote>
    
    </Container>
  );
}