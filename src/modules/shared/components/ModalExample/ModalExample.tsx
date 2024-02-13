import Button from '../Button/Button'

export interface DeleteMemberModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
}

const ModalExample: React.FC<DeleteMemberModalProps> = ({ open, handleClose, id }) => {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <Button className="modal-close-btn" onClick={() => handleClose(id)}>
            ×
          </Button>
        </div>
        <div className="modal-body">This a modal example</div>
        <div className="modal-footer">
          <Button onClick={() => handleClose(id)}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalExample
