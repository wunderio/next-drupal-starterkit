import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Library/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const CheckboxOnly: Story = {};

export const WithLabel: Story = {
  render() {
    return (
      <div className="flex items-center">
        <Checkbox id="withLabel" name="withLabel" />
        <label
          htmlFor="withLabel"
          className="cursor-pointer pl-2 text-sm peer-disabled:cursor-not-allowed peer-disabled:text-graysuit"
        >
          I accept the terms and conditions
        </label>
      </div>
    );
  },
};

export const DisabledWithLabel: Story = {
  render() {
    return (
      <div className="flex items-center">
        <Checkbox disabled id="disabledWithLabel" name="disabledWithLabel" />
        <label
          htmlFor="disabledWithLabel"
          className="cursor-pointer pl-2 text-sm peer-disabled:cursor-not-allowed peer-disabled:text-graysuit"
        >
          I accept the terms and conditions
        </label>
      </div>
    );
  },
};
