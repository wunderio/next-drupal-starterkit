import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "@/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Library/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
    disabled: false,
  },
  argTypes: {
    disabled: {
      description: "Determines whether the textarea is disabled or not.",
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const RowsAndCols: Story = {
  name: "Specify rows and cols",
  args: {
    cols: 20,
    rows: 5,
  },
};
