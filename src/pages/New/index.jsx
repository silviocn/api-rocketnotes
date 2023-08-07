import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ButtonText } from '../../components/ButtonText';

import { Container, Form } from './styles';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]); // keep all links you had before and show the new link together
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  } 

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]); // need to use spread operator because it's a list of items and not just one item independent 
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted ));
  }

  async function handleNewNote(){
    if(!title){
      return alert("Please create the Note Title");
    }
    
    if(newLink){
      return alert ("Are you sure you don't want to add de last link typed? Remember to click in 'add' button");
    }
    
    if(newTag){
      return alert ("Are you sure you don't want to add de last tag typed? Remember to click in 'add' button");
    }
    
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Note created successfully!");
    navigate(-1); // goes back to previous page
  }

  return (
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Create Note</h1>
            <ButtonText title="Go Back" onClick={handleBack} />

          </header>
          
          <Input 
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Comments"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Useful Links">
            {
              links.map((link, index) => ( // map returns the link and it's "key identification (index)"
                <NoteItem
                  key={String(index)} // forcing the key to be a String
                  value={link}
                  onClick={() => {handleRemoveLink(link)}} // need to use arrow function because you give a parameter (link)
             />
              ))
            }
            <NoteItem
             isNew 
             placeholder="New link"
             value={newLink}
             onChange={e => setNewLink(e.target.value)}
             onClick={handleAddLink}
             />
          </Section>

          <Section title="Markers">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                <NoteItem 
                  key={String(index)}
                  value={tag} 
                  onClick={ () => handleRemoveTag(tag)}
                />
                ))

              }
              <NoteItem 
                isNew 
                placeholder="New tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
                />
            </div>
          </Section>

          <Button 
            title="Save"
            onClick={handleNewNote}
          />

        </Form>

      </main>
    </Container>
  );
}