// using the same name for the function and for the document to make easier do identify
// and every Component has to have the first letter as a Uppercase
import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';

import { useParams, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1); // goes back to the previous page
  }

  async function handleRemove() {
    const confirm = window.confirm("Are you sure you want to delete this note?") // confirm is a function of the browser
     // confirm returns true or false (OK or Cancel)
    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1); // or could use handleBack();
    }

  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, [])

  return(
    <Container>
      <Header />
      {
        data && // this is used to show 'main' only if there is any data inside, otherwise it will show nothing
        <main>
          <Content>
            <ButtonText title="Delete Note" onClick={handleRemove}/>

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Useful links">
                <Links> 
                {                   /* children starts here */
                  data.links.map(link => (
                  <li key={String(link.id)}> 
                    <a href={link.url} target='_blank'>{link.url}</a> 
                  </li>
                  ))
                }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Markers">
                {
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)} 
                      title={tag.name} 
                    />
                  ))
                }
              </Section>
            }

            <Button title="Back" onClick={handleBack}/>
          </Content>
        </main>
      }  
    </Container>

  )
}