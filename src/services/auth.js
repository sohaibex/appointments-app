import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../config/firebase';

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);

export const registerPlanningUser = (email, password) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password);

export const logout = () => signOut(firebaseAuth);
