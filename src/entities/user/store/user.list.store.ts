// import { getList, watchList } from '@/utils'
// import { defineStore } from 'pinia'
// import { ref, type Ref } from 'vue'
// import type { IUser } from '../model/user.model'
// import { USER_LIST, USER_LIST_ID } from '../utils/ids'

// export const useUserListStoreAA = defineStore(USER_LIST_ID, () => {
//   const data: Ref<readonly IUser[]> = ref([])

//   async function load() {
//     watchList<IUser>(USER_LIST, (users) => {
//       data.value = users
//       console.log(users)
//     })
//   } 

//   return { data, load }
// })

