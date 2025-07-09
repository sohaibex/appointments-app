import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../config/firebase';

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);

export const registerPlanningUser = (email, password, fullName, phone) => {
  // Additional user details (fullName, phone) are currently not stored in
  // Firebase but are accepted here for future extension.
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const logout = () => signOut(firebaseAuth);
