import type { Meta, StoryObj } from "@storybook/react";

import InfoIcon from "@/styles/icons/info.svg";

import { Button } from "@/wunder-component-library/button";

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

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const WithIconOnly: Story = {
  name: "With icon only",
  args: {
    children: <InfoIcon />,
  },
};

export const WithIconLeft: Story = {
  name: "With icon on the left",
  args: {
    children: (
      <>
        <InfoIcon className="mr-2 inline" />
        <span>Click me</span>
      </>
    ),
  },
};

export const WithIconRight: Story = {
  name: "With icon on the right (tertianry variant)",
  args: {
    variant: "tertiary",
    children: (
      <>
        <span>Click me</span>
        <InfoIcon className="ml-2 inline" />
      </>
    ),
  },
};
