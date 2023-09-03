
export function castNumber(node: any) {
  node.hook.input((value: any, next: any) => {
    console.log(value);
    
    next(Number(value))
  }
  
  )
}
