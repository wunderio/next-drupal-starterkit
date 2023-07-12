import { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Library/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md",
    children: "Badge",
  },
  argTypes: {
    variant: {
      description: "Determines the style of the badge.",
      table: {
        type: {
          summary: "primary | secondary | success | error | warning | info",
        },
      },
      control: "radio",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
    },
    size: {
      description: "Determines the size of the badge.",
      table: {
        type: {
          summary: "sm | md | lg",
        },
      },
      control: "radio",
      options: ["sm", "md", "lg"],
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
  name: 'variant="primary"',
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  name: 'variant="secondary"',
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Success: Story = {
  name: 'variant="success"',
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Error: Story = {
  name: 'variant="error"',
  args: {
    children: "Error",
    variant: "error",
  },
};

export const Warning: Story = {
  name: 'variant="warning"',
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Info: Story = {
  name: 'variant="info"',
  args: {
    children: "Info",
    variant: "info",
  },
};

export const Small: Story = {
  name: 'size="sm"',
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  name: 'size="md"',
  args: {
    children: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  name: 'size="lg"',
  args: {
    children: "Large",
    size: "lg",
  },
};
