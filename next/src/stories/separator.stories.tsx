import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "Library/Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Example: Story = {};

export const ExampleWithContext: Story = {
  name: "Example with context",
  render: () => (
    <div className="text-center">
      <div>Example text above separator</div>
      <Separator />
      <div>Example text below separator</div>
    </div>
  ),
};
