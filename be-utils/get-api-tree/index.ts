import dirTree from 'directory-tree'

export const getApiTree = (pathToApi: string): string[] => {
  const dirs = dirTree(pathToApi)
  const directories = dirs.children ?? []
  const result: string[] = []
  for (let i = 0; i < directories.length; i += 1) {
    if (!!directories[i].children && directories[i].children!.length > 0) {
      directories[i].children!.forEach((childItem) => directories.push(childItem))
    }
    result.push(`/api${directories[i].path.replace(pathToApi.replace('./', ''), '')}`)
  }
  return result.filter((item) => !item.includes('route.ts'))
}
