import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi'; // importing icon used in new note button
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from './../../components/Note';
import { Header } from './../../components/Header';
import { Input } from './../../components/Input';
import { Section } from './../../components/Section';
import { ButtonText } from './../../components/ButtonText';
import { api } from '../../services/api';

export function Home() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() { // creating this function to use in useEffect because it doesn't run async function
      const response = await api.get("/tags");
      setTags(response.data);
    } 
      
    fetchTags();    
  }, []);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText title="All" isActive/></li>
        {
          tags && tags.map( tag => ( // strategy to make sure there are some data inside tags
          <li key={String(tag.id)}>
            <ButtonText title={tag.name} />
          </li>
          ))
        }
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