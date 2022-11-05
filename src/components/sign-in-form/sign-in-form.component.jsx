import './sign-in-form.style.scss';
import { useState, useContext } from 'react';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        alert('Wrong password');
      } else if (err.code === 'auth/user-not-found') {
        alert('User not exists');
      } else console.log(err);
    }
  };
  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          value={email}
          type="text"
          required
          onChange={handleChange}
          name="email"
        />
        <FormInput
          label="Password"
          value={password}
          type="password"
          required
          onChange={handleChange}
          name="password"
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
