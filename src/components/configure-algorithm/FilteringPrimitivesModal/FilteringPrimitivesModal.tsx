import { FC, useContext } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { SelectOption } from '@/components/common/uikit/Inputs';
import { PortalRootContext } from '@/components/meta';
import { TagType } from '@/constants/primitivesInfo/primitivesTags';

type Props = ModalProps & {
  onApply: () => void;
  onChange: (newValue: MultiValue<TagType>) => void;
  choosenTags: MultiValue<TagType>;
};

const options: SelectOption<TagType>[] = Object.values(TagType).map(
  (value) => ({
    label: `# ${value}`,
    value: value,
  }),
);

export const FilteringPrimitivesModal: FC<Props> = ({
  onClose,
  isOpen,
  onApply,
  onChange,
  choosenTags,
}) => {
  const portalRootRef = useContext(PortalRootContext);

  return (
    <PropertiesModal
      name="Filters"
      onApply={onApply}
      onClose={onClose}
      isOpen={isOpen}
    >
      <FormField label="Tags">
        <Select
          options={options}
          value={choosenTags}
          isMulti
          menuPosition="fixed"
          onChange={onChange}
          menuPortalTarget={portalRootRef?.current}
        />
      </FormField>
    </PropertiesModal>
  );
};
