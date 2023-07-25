import { useState } from 'react'; // using a hook to capture data when the user gives you
import { Input } from './../../components/Input';
import { Button } from './../../components/Button';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Container, Form, Background } from './styles';

export function SignUp() {
  const [name, setName] = useState(""); // name is what you want to get and setName is the function. "" is starting value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  function handleSignUp() {
    if(!name || !email || !password) {
      return alert ("Please fill in all fields!");
    }

    api.post("/users", {name, email, password})
    .then(() => {
      alert("User successfully registered!");
      navigate("/");
    })
    .catch(error => {
      if (error.response) {
        alert(error.response.data.message); // getting message from back end
      } else {
        alert("Unable to register.");
      }
    });

  }

  return (
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Application to save and manage your useful links</p>

        <h2>Create your account</h2>

        <Input 
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange = {e => setName(e.target.value)} // e = event, every time the input value changes, onChange is executed
        />

        <Input 
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange = {e => setEmail(e.target.value)} // e = event
        />

        <Input 
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange = {e => setPassword(e.target.value)} // e = event
        />

        <Button title="Sign Up" onClick={handleSignUp} />

        <Link to="/">
          Back to Sign In
        </Link>


      </Form>
    </Container>
  );
}