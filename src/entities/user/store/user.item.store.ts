import { getItem } from '@/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '../model/user.model'
import { USER_LIST, USER_STORE_ID } from '../utils/ids'

export const useUserItemStore = defineStore(USER_STORE_ID, () => {
  const data = ref<IUser | null>(null)

  async function load(id: string) {
    if (id === data.value?.id) return
    data.value = await getItem(`${USER_LIST}/${id}`)
  }

  return { data, load }
})
