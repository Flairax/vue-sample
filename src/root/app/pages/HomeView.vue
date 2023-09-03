<script setup lang="ts">
import { TableView, stringControl, type ITableProps } from '@/components';
import { StringInput, type IStringInputProps } from '@/components/inputs';
import { useUserCrudStore, type IUser } from '@/entities';
import { computed, ref, onMounted } from 'vue';


interface IHero {
  name: string;
  speciality: `Warrior` | `Mage` | `Rogue`;
  attributes: IHeroAttrs;
}

interface IHeroAttrs {
  power: number;
}

const crud = useUserCrudStore();
// const users = useUserListStore();


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

function add() {
  console.log(
    name.control.data, age.control.data
  )
  crud.add({
    name: name.control.data.value,
    age: +age.control.data.value
  })
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
