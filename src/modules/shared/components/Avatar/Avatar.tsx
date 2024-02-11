import React from 'react'
export interface AvatarProps {
  image?: string | null
  text: string
  size?: number
}

const CustomAvatar: React.FC<AvatarProps> = ({ image, text, size = 30 }) => {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
  }

  return (
    <div className="custom-avatar" style={avatarStyle}>
      {image ? (
        <img src={image} alt={text} />
      ) : (
        <span style={{ fontSize: `${size / 2.5}px` }}>{text.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}

export default CustomAvatar
