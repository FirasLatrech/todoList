import { HTMLAttributes, ReactNode } from 'react'

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: string
  label?: string
  variant?: 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'dark' | 'secondary' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  outlined?: boolean
  rounded?: boolean
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
}

const Button: React.FC<IButtonProps> = ({
  icon,
  label,
  variant,
  size,
  outlined,
  rounded,
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      className={[
        'btn',
        `btn-${size}`,
        `${outlined ? 'btn-outlined' : 'btn'}-${variant}`,
        `${rounded ? 'btn-rounded' : ''}`,
        `${disabled ? 'btn-disabled' : ''}`,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        'loading...'
      ) : children ? (
        children
      ) : (
        <>
          {icon && <img src={icon} alt="icon" className="icon" />}
          {label}
        </>
      )}
    </button>
  )
}

type ButtonDefaultProps = Pick<
  IButtonProps,
  | 'icon'
  | 'label'
  | 'variant'
  | 'size'
  | 'outlined'
  | 'rounded'
  | 'disabled'
  | 'children'
  | 'loading'
>

Button.defaultProps = {
  icon: '',
  label: 'Button',
  variant: 'primary',
  size: 'md',
  outlined: false,
  rounded: false,
  loading: false,
  disabled: false,
  children: null,
} as ButtonDefaultProps

export default Button
