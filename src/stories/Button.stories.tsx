import Button from '@src/modules/shared/components/Button/Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    size: 'lg',
    rounded: true,
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
