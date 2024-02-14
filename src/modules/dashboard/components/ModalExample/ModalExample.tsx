import Modal from '@src/modules/shared/components/Modal'
export interface ModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
}

const ModalExample: React.FC<ModalProps> = ({ open, handleClose, id }) => {
  return (
    <Modal open={open} handleClose={handleClose} id={id}>
      <div className="div">Modal body</div>
    </Modal>
  )
}

export default ModalExample
