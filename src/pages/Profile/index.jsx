import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Input } from './../../components/Input';
import { Button } from './../../components/Button';
import { Container, Form, Avatar } from './styles';
import { Link } from 'react-router-dom';

export function Profile() {
  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>

        <Avatar>
          <img 
          src="http://github.com/silviocn.png" 
          alt="User profile image" />
          
          <label htmlFor="avatar">
            <FiCamera/>

            <input 
            id="avatar"
            type="file" 
            />

          </label>

        </Avatar>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
        />

        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
        />

        <Input
          placeholder="New Password"
          type="password"
          icon={FiLock}
          />

          <Button title="Save" />

      </Form>
    </Container>
  );
}