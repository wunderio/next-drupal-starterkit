import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

const meta: Meta<typeof Input> = {
  title: "Library/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: "Determines whether the input is disabled or not.",
      table: {
        type: {
          summary: "boolean",
        },
      },
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    placeholder: null,
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: "password",
  },
};

export const InputWithLabel: Story = {
  render: (args) => (
    <>
      <p className="mb-4">
        In most cases, you&apos;ll want to use the Label component at the same
        time as an Input component:
      </p>
      <Label htmlFor="input">My custom label</Label>
      <Input id="input" {...args} />
    </>
  ),
};
