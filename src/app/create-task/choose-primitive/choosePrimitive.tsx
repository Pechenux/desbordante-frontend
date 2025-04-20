'use client';

import { useAtom } from 'jotai';
import { memo, useContext, useMemo, useState } from 'react';
import { PrimitiveCard } from '@/components/choose-primitive/PrimitiveCard/PrimitiveCard';
import { PropertiesModal } from '@/components/common/layout/PropertiesModal';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { FormField } from '@/components/common/uikit';
import { Button } from '@/components/common/uikit/Button';
import { Icon } from '@/components/common/uikit/Icon';
import { Search, Select } from '@/components/common/uikit/Inputs';
//import { Option } from '@/components/common/uikit/Inputs';
import { PortalRootContext } from '@/components/meta';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { primitiveInfo } from '@/constants/primitivesInfo/primitivesInfo';
import { TagType } from '@/constants/primitivesInfo/primitivesTags';
import { choosenPrimitiveAtom } from '@/store/taskCreationAtoms';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './choosePrimitive.module.scss';

const options = [
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

const ChoosePrimitive = () => {
  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [choosenPrimitive, setChoosenPrimitive] =
    useAtom<PrimitiveType>(choosenPrimitiveAtom);
  console.log('TODO: заменить на useState');
  const [choosenTags, setChoosenTags] = useState<TagType[]>([]);
  console.log(choosenTags);
  const onClose = () => setOpenFilterModal(false);
  const portalRootRef = useContext(PortalRootContext);
  const { setQueryParams } = useQueryParams();

  const header = useMemo(
    () => (
      <>
        <h2 className={styles.pageName}>Select a Feature</h2>
        <h6 className={styles.pageDescription}>
          We are working on new features and properties{' '}
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              window.open(
                'https://github.com/Mstrutov/Desbordante/issues/new',
                '_blank',
                'noreferrer',
              )
            }
          >
            Request a Feature
          </Button>
        </h6>
      </>
    ),
    [],
  );
  const footer = useMemo(
    () => (
      <>
        <Button
          disabled={false}
          variant="primary"
          icon={<Icon name="settings" />}
          onClick={() =>
            setQueryParams({
              newPathname: '/create-task/configure-algorithm',
              params: { primitive: choosenPrimitive },
            })
          }
        >
          Configure algorithm
        </Button>
      </>
    ),
    [choosenPrimitive, setQueryParams],
  );

  return (
    <div>
      <WizardLayout footer={footer} header={header}>
        <div className={styles.search}>
          <Search label="Search" placeholder="Search..." />
          <Button
            variant="primary"
            size="md"
            icon={<Icon name="filter" />}
            onClick={() => setOpenFilterModal(true)}
          >
            Filters
          </Button>
          <PropertiesModal
            name="Filters"
            onApply={onClose}
            onClose={onClose}
            isOpen={isOpenFilterModal}
          >
            <FormField label="Tags">
              <Select
                options={options}
                isMulti
                menuPosition="fixed"
                onChange={setChoosenTags}
                menuPortalTarget={portalRootRef?.current}
              />
            </FormField>
          </PropertiesModal>
        </div>

        <div className={styles.container}>
          {Object.entries(primitiveInfo).map(([primitiveCode]) => (
            <PrimitiveCard
              key={primitiveCode}
              isSelected={choosenPrimitive === primitiveCode}
              onClick={() =>
                setChoosenPrimitive(primitiveCode as PrimitiveType)
              }
              {...(primitiveInfo[primitiveCode as PrimitiveType] || {
                label: 'Loading',
                description: 'Loading',
                tags: [],
              })}
            />
          ))}
        </div>
      </WizardLayout>
    </div>
  );
};

export default memo(ChoosePrimitive);
