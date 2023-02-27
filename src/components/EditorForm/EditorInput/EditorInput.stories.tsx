import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { withFormik } from '@bbbtech/storybook-formik';
import EditorInput from './EditorInput';

export default {
  title: 'Form/Input',
  component: EditorInput,
  decorators: [withFormik],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'form',
      values: [{ name: 'form', value: '#232323' }],
    },
  },
} as ComponentMeta<typeof EditorInput>;

const formicParams = {
  formik: {
    initialErrors: {
      title: 'Error Message!',
      vote_average: 'Error Message!',
    },
    validationSchema: (names: { [key: string]: string }) =>
      Object.fromEntries(Object.entries(names).map(([key, val]) => [[key], [!val]])),
  },
};

const Template: ComponentStory<typeof EditorInput> = (props) => <EditorInput {...props} />;

export const TextInput = Template.bind({});
TextInput.args = {
  type: 'text',
  name: 'title',
  label: 'TITLE',
  placeholder: 'Title',
};
TextInput.parameters = formicParams;

export const DateInput = Template.bind({});
DateInput.args = {
  type: 'date',
  name: 'release_date',
  label: 'RELEASE DATE',
  placeholder: 'Title',
};
DateInput.parameters = formicParams;

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'text',
  name: 'vote_average',
  label: 'RATING',
  placeholder: '7.8',
};
NumberInput.parameters = formicParams;
