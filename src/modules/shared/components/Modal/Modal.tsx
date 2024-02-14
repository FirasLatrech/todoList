import { ReactElement } from 'react'
import Button from '../Button/Button'

export interface DeleteMemberModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
  children?: ReactElement
}

const Modal: React.FC<DeleteMemberModalProps> = ({ open, handleClose, id, children }) => {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <Button className="modal-close-btn" onClick={() => handleClose(id)}>
            ×
          </Button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button onClick={() => handleClose(id)}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
