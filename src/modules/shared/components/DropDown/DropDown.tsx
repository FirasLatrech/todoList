import React, { useRef, useEffect, ReactElement } from 'react'
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
  isOpen: boolean
  setIsOpen: any
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  placement = 'bottomRight',
  triggerElement,
  isOpen,
  setIsOpen,
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
  }, [])

  return (
    <div className="dropdown" ref={dropdownRef}>
      {triggerElement}
      {isOpen && (
        <div className={`dropdown-menu ${placement}`}>
          {items.map((item) => (
            <div
              key={item.key}
              className="dropdown-item"
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
            >
              {item?.icon} {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
