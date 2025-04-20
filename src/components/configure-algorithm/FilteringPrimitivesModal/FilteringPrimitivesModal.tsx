import { FC, useContext } from 'react';
import { MultiValue } from 'react-select';
import { ModalProps, PropertiesModal } from '@/components/common/layout';
import { FormField, Select } from '@/components/common/uikit';
import { Option } from '@/components/common/uikit/Inputs';
import { PortalRootContext } from '@/components/meta';
import { TagType } from '@/constants/primitivesInfo/primitivesTags';

type Props = ModalProps & {
  onApply: () => void;
  onChange: (newValue: MultiValue<TagType>) => void;
  choosenTags: MultiValue<TagType>;
};

const options: Option<TagType>[] = [
  {
    label: '# ' + TagType.ApproximateAlgorithm,
    value: TagType.ApproximateAlgorithm,
  },
  { label: '# ' + TagType.ExactAlgorithm, value: TagType.ExactAlgorithm },

  {
    label: '# ' + TagType.ApproximatePattern,
    value: TagType.ApproximatePattern,
  },
  { label: '# ' + TagType.ExactPattern, value: TagType.ExactPattern },

  { label: '# ' + TagType.Table, value: TagType.Table },
  { label: '# ' + TagType.Transactional, value: TagType.Transactional },
  { label: '# ' + TagType.Graph, value: TagType.Graph },

  { label: '# ' + TagType.SingleSource, value: TagType.SingleSource },
  { label: '# ' + TagType.MultiSource, value: TagType.MultiSource },
];

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
