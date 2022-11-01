import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';

import SignUp from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    //console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
