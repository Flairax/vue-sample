import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as _signOut,
  onAuthStateChanged,
  type User,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential
} from 'firebase/auth'
import { firebaseApp } from './core'
import { ref } from 'vue'

const auth = getAuth(firebaseApp)

export interface IAuthUser {
  email: string
  password: string
}

export interface IAuthUserUpdate {
  displayName?: string
  photoURL?: string
  email?: string
  password?: string
}

export async function createUser({ email, password }: IAuthUser) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn({ email, password }: IAuthUser) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  return _signOut(auth)
}

export function watchAuthUser() {
  const user = ref<User | null>(null)
  onAuthStateChanged(auth, (v) => (user.value = v))
  return user
}

export async function updateAuthUser({ displayName, email, photoURL, password }: IAuthUserUpdate) {
  const promises: Promise<unknown>[] = []
  const user = auth.currentUser as User

  if (email && email !== user.email) {
    promises.push(updateEmail(user, email))
  }

  if (
    (displayName && user.displayName !== displayName) ||
    (photoURL && user.photoURL !== photoURL)
  ) {
    promises.push(updateProfile(user, { displayName, photoURL }))
  }

  if (password) {
    promises.push(updatePassword(user, password))
  }
  return Promise.all(promises)
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export async function reAuth(user: IAuthUser) {
  //   const creds = await signIn(user)
  //   reauthenticateWithCredential(auth.currentUser, creds)
  //     .then(() => {
  //       // User re-authenticated.
  //     })
  //     .catch((error) => {
  //       // An error ocurred
  //       // ...
  //     })
}
