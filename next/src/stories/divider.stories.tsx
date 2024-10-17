import type { Meta, StoryObj } from "@storybook/react";

import { Divider as DividerComponent } from "@/ui/divider";

const meta: Meta<typeof DividerComponent> = {
  title: "Library/Divider",
  component: DividerComponent,
};

export default meta;
type Story = StoryObj<typeof DividerComponent>;

export const Example: Story = {};

export const ExampleWithContext: Story = {
  name: "Example with context",
  render: () => (
    <div className="text-center">
      <div>Example text above divider</div>
      <DividerComponent />
      <div>Example text below divider</div>
    </div>
  ),
};
