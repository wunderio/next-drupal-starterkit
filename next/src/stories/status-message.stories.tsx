import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/ui/button";
import { StatusMessage } from "@/ui/status-message";

const meta: Meta<typeof StatusMessage> = {
  title: "Library/StatusMessage",
  component: StatusMessage,
  tags: ["autodocs"],
  argTypes: {
    level: {
      description: "Determines the style of the status message.",
      table: {
        type: {
          summary: "info | success | warning | error",
        },
      },
      control: "radio",
      options: ["info", "success", "warning", "error"],
    },
    title: {
      description:
        "The title of the status message. If not provided, a default title will be used according to the level.",
      table: {
        type: {
          summary: "string",
        },
      },
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const Info: Story = {
  args: {
    children: "Example status message content.",
  },
};

export const Success: Story = {
  args: {
    level: "success",
    children: "Success status message content.",
  },
};

export const Warning: Story = {
  args: {
    level: "warning",
    children: "Warning status message content.",
  },
};

export const Error: Story = {
  args: {
    level: "error",
    children: "Error status message content.",
  },
};

export const CustomTitle: Story = {
  render: () => (
    <StatusMessage
      level="success"
      title="By the way, the title can be customized."
    >
      <p className="my-4">
        And the content can be anything too - it doesn&apos;t have to be a
        string.
      </p>
      <Button onClick={() => alert("See - this is a button!")}>
        Click me!
      </Button>
    </StatusMessage>
  ),
};
