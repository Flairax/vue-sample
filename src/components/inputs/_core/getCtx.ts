import { getRuntimeId } from '@/utils/other/id'
import type { IInputProps } from '..'

export function getInputCtx<T>(props: IInputProps<T>) {
  const id = getRuntimeId()
  const validators: string[] = []

  if (props.required === true || props.required === undefined) {
    validators.push(`required`)
  }

  const validation = validators.join(`|`)
  const label = props.label ?? props.name[0].toUpperCase() + props.name.slice(1)
  const control = props.control;

  return { id, control, label, validation }
}
