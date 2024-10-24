import TodoDetails from '../TodoDetails'
export interface ModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
}

const TodoDeatilsModal: React.FC<ModalProps> = ({ handleClose, id, data }) => {
  return <TodoDetails todo={data} onClose={() => handleClose(id)} />
}

export default TodoDeatilsModal
