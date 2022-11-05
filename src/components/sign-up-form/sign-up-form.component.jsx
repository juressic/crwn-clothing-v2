import { useState, useContext } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const newUser = await createUserDocumentFromAuth(user, { displayName });
      //setCurrentUser(user);
      console.log(newUser);
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use! ');
      }
      console.log('user creation encountered and error', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>hSign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          value={displayName}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
        />
        <FormInput
          label="Email"
          value={email}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
        />
        <FormInput
          label="Password"
          value={password}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
        />
        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUp;
