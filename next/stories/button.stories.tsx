import type { Meta, StoryObj } from "@storybook/react";

import WarningIcon from "@/styles/icons/warning.svg";

import { Button } from "@/ui/button";

const meta: Meta<typeof Button> = {
  title: "Library/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md",
    children: "Click me",
    disabled: false,
  },
  argTypes: {
    variant: {
      description: "Determines the style of the button.",
      table: {
        type: {
          summary: "primary | secondary | tertiary",
        },
      },
      control: "radio",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      description: "Determines the size of the button.",
      table: {
        type: {
          summary: "sm | md | lg",
        },
      },
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    children: {
      description: "Children of the button (e.g. text, an icon, both, etc.)",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
      control: "text",
    },
    disabled: {
      description: "Determines whether the button is disabled or not.",
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = {
  name: 'variant="primary"',
  args: {
    children: "Primary button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  name: 'variant="secondary"',
  args: {
    children: "Secondary button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  name: 'variant="tertiary"',
  args: {
    children: "Tertiary button",
    variant: "tertiary",
  },
};

export const Small: Story = {
  name: 'size="sm"',
  args: {
    children: "Small button",
    size: "sm",
  },
};

export const Medium: Story = {
  name: 'size="md"',
  args: {
    children: "Medium button",
    size: "md",
  },
};

export const Large: Story = {
  name: 'size="lg"',
  args: {
    children: "Large button",
    size: "lg",
  },
};

export const WithIconOnly: Story = {
  name: "Icon only",
  args: {
    children: <WarningIcon className="h-6 w-6" />,
  },
};

export const WithIconLeft: Story = {
  name: "Icon left",
  args: {
    children: (
      <>
        <WarningIcon className="mr-2 inline h-6 w-6" />
        <span>Icon left</span>
      </>
    ),
  },
};

export const WithIconRight: Story = {
  name: "Icon right",
  args: {
    children: (
      <>
        <span>Icon right</span>
        <WarningIcon className="ml-2 inline h-6 w-6" />
      </>
    ),
  },
};
