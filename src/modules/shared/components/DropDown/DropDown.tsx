import { ReactElement, useEffect, useRef } from 'react'
export interface DropdownItem {
  key?: string
  label?: string | ReactElement
  onClick: () => void
  disabled?: boolean
  icon?: ReactElement
}

export interface DropdownProps {
  items: DropdownItem[]
  placement?: 'bottomRight' | 'bottomLeft'
  triggerElement?: ReactElement
  children?: ReactElement
  isOpen: boolean
  setIsOpen: any
}
const Dropdown: React.FC<DropdownProps> = ({
  items,
  placement = 'bottomRight',
  triggerElement,
  isOpen,
  setIsOpen,
  children,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsOpen])

  return (
    <div className="dropdown" ref={dropdownRef}>
      {triggerElement}
      <div className={`dropdown-menu ${placement} ${isOpen ? 'visible' : ''}`}>
        {children
          ? children
          : items?.map((item) => (
              <div
                key={item.key}
                className={`dropdown-item ${item.disabled ? 'disabled' : ''}`}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick()
                    setIsOpen(false)
                  }
                }}
              >
                {item.icon} {item.label}
              </div>
            ))}
      </div>
    </div>
  )
}
export default Dropdown
