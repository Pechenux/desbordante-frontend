import { MutationFunction } from '@tanstack/react-query';
import { FC } from 'react';
import { FieldValues } from 'react-hook-form';
import { SchemaTaskPublic } from '@/api/generated/schema';
import { GetAllFieds } from './getAllFields';

export type FormData = FieldValues;

export type Preset<FormInputs extends object = FieldValues> = {
  name: string;
  displayName: string;
  preset: Partial<FormInputs>;
};

export type DefaultPreset<FormInputs extends object = FieldValues> =
  Preset<FormInputs> & {
    name: 'default';
    preset: GetAllFieds<FormInputs>;
  };

export type CommonPresets<FormInputs extends object = FieldValues> = [
  ...Preset<FormInputs>[],
  DefaultPreset<FormInputs>,
];

export type FileName = string;

export type Presets<FormInputs extends object = FieldValues> = {
  common: CommonPresets<FormInputs>;
  fileSpecific?: {
    fileNames: [FileName, ...FileName[]];
    presets: Preset<FormInputs>[];
  }[];
};

export type FormProps<FormInputs extends object = FieldValues> = {
  setPresets: (presets: Presets<FormInputs>) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormComponent<FormInputs extends object = any> = FC & {
  presets: Presets<FormInputs>;
  onSubmit: (data: FormInputs) => FormData;
  mutationFn: MutationFunction<
    SchemaTaskPublic | undefined,
    {
      datasets: string[];
      data: FormInputs;
    }
  >;
};
