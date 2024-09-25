import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "@/ui/accordion";

const meta: Meta<typeof Accordion> = {
  title: "Library/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Example: Story = {
  args: {
    heading: "Accordion heading",
    items: [
      {
        id: "1",
        heading: "Accordion item 1",
        content: <>{"Accordion item 1 content"}</>,
      },
      {
        id: "2",
        heading: "Accordion item 2",
        content: <>{"Accordion item 2 content"}</>,
      },
      {
        id: "3",
        heading: "Accordion item 3",
        content: <>{"Accordion item 3 content"}</>,
      },
    ],
  },
};
