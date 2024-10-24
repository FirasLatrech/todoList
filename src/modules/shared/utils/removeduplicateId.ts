export const removeDuplicatesById = (arr: any[]) => {
  const uniqueIds = new Set()
  return arr?.filter((obj) => {
    if (!uniqueIds.has(obj._id)) {
      uniqueIds.add(obj._id)
      return true
    }
    return false
  })
}
