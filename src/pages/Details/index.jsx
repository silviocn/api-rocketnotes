// using the same name for the function and for the document to make easier do identify
// and every Component has to have the first letter as a Uppercase
import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';

export function Details() {


  return(
    <Container>
      <Header />
      
      <main>
        <Content>
          <ButtonText title="Delete Note" />

          <h1>
            React Introduction
          </h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque sequi consectetur fugiat quos commodi rerum facere asperiores, 
            pariatur excepturi saepe in magni porro. More text more text more text! Bla bla bla bla. Iure eveniet velit reiciendis atque 
            ex explicabo!
          </p>

          <Section title="Useful links">
            <Links> {/* children starts here */}
              <li> <a href="#">Link 1</a> </li>
              <li> <a href="#">Link 2</a> </li>
            </Links>
          </Section>

          <Section title="Markers">
            <Tag title="express" />
            <Tag title="nodejs" />
          </Section>

          
          <Button title="Back"/>
        </Content>
      </main>
    </Container>

  )
}