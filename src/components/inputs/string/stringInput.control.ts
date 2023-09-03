import { type Ref, ref } from 'vue'
import { inputControl } from '../_core/control'


export function stringControl(initial = ``) {
  return inputControl(initial);
}
