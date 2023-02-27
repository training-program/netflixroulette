import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['lg', 'md', 'sm'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'primary',
  size: 'lg',
  children: 'search',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  size: 'md',
  children: 'cancel',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'sm',
  children: '+ add movie',
};
