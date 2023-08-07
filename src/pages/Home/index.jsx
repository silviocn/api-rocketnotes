import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi'; // importing icon used in new note button
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from './../../components/Note';
import { Header } from './../../components/Header';
import { Input } from './../../components/Input';
import { Section } from './../../components/Section';
import { ButtonText } from './../../components/ButtonText';
import { api } from '../../services/api';

import { useNavigate } from 'react-router-dom';

export function Home() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if(tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName); // used to know if the Tag is already selected or not
    
    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName); // show all tags less the not selected
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected(prevState => [... prevState, tagName]); // show all tags selected before plus the last one selected
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() { // creating this function to use in useEffect because it doesn't run async function
      const response = await api.get("/tags");
      setTags(response.data);
    } 
      
    fetchTags();    
  }, []); // whit empty array, this state will run only once when loading the page

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`); // looking for notes and tags typed by user
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]); // this state will run every time one of those are requested (tagsSelected or search)

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li><ButtonText title="All" 
              onClick={() => handleTagSelected("all")}
              isActive={tagsSelected.length === 0} // if tagSelected vector is empty, isActive = true
            />
        </li>
        {
          tags && tags.map( tag => ( // strategy to make sure there are some data inside tags
          <li key={String(tag.id)}>
            <ButtonText title={tag.name}
              onClick={() => handleTagSelected(tag.name)} // if you click it will select and apply handleTagSelected function
              isActive={tagsSelected.includes(tag.name)} // remember isActive determines the orange color
            />
          </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Search by title"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="My Notes">
          {
            notes.map( note => (
              <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>
    
      <NewNote to="/new">
        <FiPlus />
        Create Note
      </NewNote>
    
    </Container>
  );
}