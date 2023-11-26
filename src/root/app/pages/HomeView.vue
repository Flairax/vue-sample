<script setup lang="ts">
import { TableView, stringControl, type ITableProps, HttpState } from '@/components';
import { StringInput, type IStringInputProps } from '@/components/inputs';
import { AHttpRequest } from '@/utils';
import { computed, ref, onMounted } from 'vue';
import { z } from 'zod';


interface IHero {
  name: string;
  speciality: `Warrior` | `Mage` | `Rogue`;
  attributes: IHeroAttrs;
}

interface IHeroAttrs {
  power: number;
}

// const users = useUserListStore();


const USER_SCHEMA = z.object({
  id: z.string(),
  avatar: z.string(),
  createdAt: z.string(),
  name: z.string(),
})

type TUser = z.infer<typeof USER_SCHEMA>;
class UsersRequest extends AHttpRequest<void, readonly TUser[]> {
  protected createRequest(payload: void): Promise<readonly TUser[]> {
      return this.createFetchRequest({
        method: `GET`,
        schema: z.array( USER_SCHEMA),
        url: [`https://6563b638ceac41c0761d0db4.mockapi.io/api/v1/users`]
      })
  }
}

function loadUsers() {
  userRequest.load();
}

const userRequest = new UsersRequest();

const name: IStringInputProps = {
  control: stringControl(),
  label: `Name`,
  name: `name`,
  help: `Choose the name for your hero`,
}

const age: IStringInputProps = {
  control: stringControl(),
  label: `Age`,
  name: `name`,
  help: `Choose the name for your hero`,
}

console.log(age);


// const table = computed(() => {
//   return {
//     getId: ({ id }) => id,
//     values: users.data
//   } as ITableProps<IUser>
// })


let show = ref(true);

function toggle() {
  show.value = !show.value
}

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
  console.log(inputRef);
  
  inputRef.value?.focus();
})

</script>

<template>
  <input type="text"
         ref="inputRef">

  <button @click="loadUsers">loadUsers</button>

  <HttpState :request="userRequest">
    <template v-slot="{data}">
      <div>{{ JSON.stringify(data) }}</div>
    </template>
  </HttpState>

  <!-- <button @click="users.load">Load</button>
  <div>

    <StringInput v-bind="name"></StringInput>
    <StringInput v-bind="age"></StringInput>
    <button @click="add">Add</button>
  </div>

  <button @click="toggle">Toggle</button>

  <TableView v-bind="table"
             v-if="show">
    <template #headers>
      <vs-th>Name</vs-th>
      <vs-th>Age</vs-th>
    </template>
    <template #row="row">
      <vs-td>{{ row.name }}</vs-td>
      <vs-td>{{ row.age }}</vs-td>
      <vs-td>
        <button @click="crud.remove(row)">Remove</button>
      </vs-td>
    </template>
  </TableView> -->
</template>
