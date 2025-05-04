import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { createQueryFn } from '@/api/services/server';
import { FormField, Select } from '@/components/common/uikit';
import { Presets } from '@/types/form';

type PresetSelectorProps = {
  fileIDs?: string[];
  defaultPreset: Partial<FieldValues>;
  isCustom: boolean;
  formReset: (preset: FieldValues) => void;
  formTrigger: () => void;
  presets: Presets | undefined;
};

const CUSTOM_PRESET_INDEX = -1;
export { CUSTOM_PRESET_INDEX };

export const PresetSelector = ({
  fileIDs: files,
  defaultPreset,
  isCustom,
  formReset,
  formTrigger,
  presets,
}: PresetSelectorProps) => {
  const [presetIndex, setPresetIndex] = useState<number | undefined>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: [`/api/files`],
    queryFn: createQueryFn('/api/files', {
      params: {
        query: {
          with_public: true,
        },
      },
    }),
    enabled: true,
  });

  const fromPresets = useMemo(() => {
    if (isLoading) {
      return [];
    }

    if (presets === undefined) {
      return [];
    }

    if (
      presets.fileSpecific === undefined ||
      files === undefined ||
      files.length === 0
    ) {
      return presets.common;
    }

    const fileNames = files.map(
      (fileId) => data?.find((file) => file.id === fileId)?.name ?? fileId,
    );

    const fileSpecificPresets = presets.fileSpecific
      .filter((preset) =>
        fileNames.every((fileName) => preset.fileNames.includes(fileName)),
      )
      .map((entry) => entry.presets)
      .flat();

    return [...fileSpecificPresets, ...presets.common];
  }, [data, files, isLoading, presets]);

  const presetOptions = useMemo(
    () =>
      fromPresets
        .map((preset, index) => ({
          label: preset.displayName,
          value: index,
        }))
        .concat([{ label: 'Custom', value: CUSTOM_PRESET_INDEX }]),
    [fromPresets],
  );

  useEffect(() => {
    if (!isLoading) {
      if (presetOptions.length > 1) {
        // set default preset to first one
        setPresetIndex(0);
      } else {
        setPresetIndex(CUSTOM_PRESET_INDEX);
      }
    }
  }, [isLoading, presetOptions]);

  const [needTrigger, setNeedTrigger] = useState(false);

  useEffect(() => {
    if (needTrigger) {
      setNeedTrigger(false);
      formTrigger();
    }
  }, [formTrigger, needTrigger]);

  const changePreset = useCallback(
    (presetIndex: number | undefined) => {
      setPresetIndex(presetIndex);
      if (presetIndex !== undefined && presetIndex !== CUSTOM_PRESET_INDEX) {
        formReset({
          ...defaultPreset,
          ...fromPresets[presetIndex]?.preset,
        });
        setNeedTrigger(true);
      }
    },
    [defaultPreset, formReset, fromPresets],
  );

  useEffect(() => {
    if (isCustom) {
      changePreset(CUSTOM_PRESET_INDEX);
    }
  }, [isCustom, changePreset]);

  return (
    <FormField label="Preset">
      <Select
        value={presetIndex}
        onChange={(e) => changePreset(e as number)}
        options={presetOptions}
        filterOption={(option) => option.label !== 'Custom'}
        isLoading={isLoading}
      />
    </FormField>
  );
};
