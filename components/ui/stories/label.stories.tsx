import type { Meta, StoryObj } from "@storybook/nextjs"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Default Label",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
