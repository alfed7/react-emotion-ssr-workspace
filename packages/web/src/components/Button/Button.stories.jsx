import React from "react";

import Colors from "../../stories/assets/colors.svg";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Button {...args} />;

export const TextButton = Template.bind({});
TextButton.args = {
  children: "Test",
  color: "#ccc",
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <Colors />,
  color: "#ccc",
};
