import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout } from './styles';

export function Header() {
  return (
    <Container>
      <Profile to="/profile">
        <img
          src="https://github.com/silviocn.png"
          alt="User profile image"
          />

          <div>
            <span>Welcome,</span>
            <strong>Silvio Neto</strong>
          </div>
      </Profile>
      
      <Logout>
        <RiShutDownLine />
      </Logout>

    </Container>
  )
}