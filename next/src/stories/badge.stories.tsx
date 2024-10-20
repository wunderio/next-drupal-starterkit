import { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Library/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    variant: "default",

    children: "Badge",
  },
  argTypes: {
    variant: {
      description: "Determines the style of the badge.",
      table: {
        type: {
          summary: "default | secondary | success | error | warning | info",
        },
      },
      control: "radio",
      options: ["default", "secondary", "success", "error", "warning", "info"],
    },

    children: {
      description: "Children of the badge (usually text).",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Primary: Story = {
  name: 'variant="default"',
  args: {
    children: "Primary",
    variant: "default",
  },
};

export const Secondary: Story = {
  name: 'variant="secondary"',
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  name: 'variant="destructive"',
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  name: 'variant="outline"',
  args: {
    children: "Outline",
    variant: "outline",
  },
};
