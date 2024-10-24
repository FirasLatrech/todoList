export const handleScroll = (
  e: any,
  listLength: number,
  currentPage: number,
  limit: number,
  onBottom: (p: any) => void,
  threshold?: number
) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target
  const scrollBottom = scrollHeight - (scrollTop + clientHeight)

  // const threshold = 40

  if (scrollBottom < (threshold || 0.4) && listLength > currentPage * limit)
    onBottom((prev: number) => prev + 1)
}
