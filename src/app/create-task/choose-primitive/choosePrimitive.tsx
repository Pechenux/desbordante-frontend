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
import { PortalRootContext } from '@/components/meta';
import { MainPrimitives } from '@/constants/primitivesInfo/primitives';
import { primitiveInfo } from '@/constants/primitivesInfo/primitivesInfo';
import { choosenPrimitiveAtom } from '@/store/taskCreationAtoms';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './choosePrimitive.module.scss';

const options = [
  {
    label: '# tag_1',
    options: [
      { label: '# tag_11', value: 1 },
      { label: '# tag_12', value: 1 },
    ],
  },
  { label: '# tag_2', value: 2 },
  { label: '# tag_3', value: 3 },
  { label: '# tag_4', value: 4 },
  { label: '# tag_5', value: 5 },
  { label: '# tag_6', value: 6 },
  { label: '# tag_7', value: 7 },
  { label: '# tag_8', value: 8 },
];

const ChoosePrimitive = () => {
  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [choosenPrimitive, setChoosenPrimitive] =
    useAtom<MainPrimitives>(choosenPrimitiveAtom);
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
                setChoosenPrimitive(primitiveCode as MainPrimitives)
              }
              {...(primitiveInfo[primitiveCode as MainPrimitives] || {
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
