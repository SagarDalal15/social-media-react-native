import { auth } from "../firebaseConfig";

export const signInWithGoogleToken = async (credential) => {
  let user;
  await auth
    .signInWithCredential(credential)
    .then((userCredential) => {
      // Signed in

      user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      return error;
    });
  return user;
};

export const signUpWithEmail = async (email, password) => {
  let user;
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      return error;
    });
  return user;
};

export const signInWithEmail = async (email, password) => {
  let user;
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return error;
    });
  return user;
};

export const logout = async () => {
  let logout_success;
  await auth
    .signOut()
    .then(() => {
      logout_success = true;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return logout_success;
};
