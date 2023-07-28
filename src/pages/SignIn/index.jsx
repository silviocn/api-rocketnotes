import { useState } from 'react'; // To create and keep all the info given by user
import { Input } from './../../components/Input';
import { Button } from './../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Link } from 'react-router-dom';

import { FiMail, FiLock } from 'react-icons/fi';
import { Container, Form, Background } from './styles';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Application to save and manage your useful links</p>

        <h2>Sign In</h2>

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input 
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Sign In" onClick={handleSignIn} />

        <Link to="/register">
          Create account
        </Link>


      </Form>

      <Background/>
    </Container>
  );
}