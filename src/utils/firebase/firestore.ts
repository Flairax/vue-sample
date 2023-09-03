import {
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  type DocumentData,
  getDoc,
  doc,
  onSnapshot,
  deleteDoc
} from 'firebase/firestore'
import { firebaseApp } from './core'
import type { IId } from '../other/id.interface'
import { ref, shallowRef } from 'vue'

const fs = getFirestore(firebaseApp)

export async function getItem<T extends IId>(path: string): Promise<T | null> {
  const docRef = doc(fs, path)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  } else {
    return null
  }
}

export async function addItem<T extends object>(path: string, value: T): Promise<T & IId> {
  const { id } = await addDoc(collection(fs, path), value)
  return { id, ...value }
}

export async function removeItem<T extends IId>(path: string, { id }: T) {
  return deleteDoc(doc(fs, `${path}/${id}`))
}

export async function getList<T extends IId>(path: string): Promise<T[]> {
  const snapshot = await getDocs(collection(fs, path))
  return mapSnapshotToValues(snapshot) as T[]
}

const listSubscriptions: Record<string, () => void> = {}

export function unwatchList(path: string) {
  const entry = listSubscriptions[path]
  if (!entry) return
  entry()
  delete listSubscriptions[path]
}

export function watchList<T extends IId>(path: string, onChange: (values: readonly T[]) => void) {
  unwatchList(path)
  listSubscriptions[path] = onSnapshot(collection(fs, path), (snapshot) => {
    const values = mapSnapshotToValues(snapshot) as T[]
    onChange(values)
  })
}

function mapSnapshotToValues(snapshot: QuerySnapshot<DocumentData, DocumentData>) {
  const values: object[] = []

  snapshot.forEach((doc) => {
    const value = { id: doc.id, ...doc.data() }
    values.push(value)
  })

  return values
}
