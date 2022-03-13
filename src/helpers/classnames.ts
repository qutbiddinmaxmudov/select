type clxParams = {
  [classname: string]: boolean
}
export const clx = (classes: clxParams):string => {  
  return Object.keys(classes).reduce(
    (prev, next) => (prev + (classes[next] ? `${next} ` : '')),
    ''
  )
}
