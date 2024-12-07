'use client';

import { memo, useState } from 'react';
import PrimitiveCard from '@/components/choose-primitive/PrimitiveCard/PrimitiveCard';
import PropertiesModal from '@/components/common/layout/PropertiesModal';
import WizardLayout from '@/components/common/layout/WizardLayout';
import { Button } from '@/components/common/uikit/Button';
import { Icon } from '@/components/common/uikit/Icon';
import MultiSelect from '@/components/common/uikit/Inputs/MultiSelect';
import Search from '@/components/common/uikit/Inputs/Search';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import primitiveInfo from '@/constants/primitivesInfo/primitivesInfo';
import styles from './choosePrimitive.module.scss';

const options = [
  { label: '# tag_1', value: 1 },
  { label: '# tag_2', value: 2 },
  { label: '# tag_3', value: 3 },
];

const header = (
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
);
const footer = (
  <>
    <Button
      disabled={false}
      variant="primary"
      icon={<Icon name="settings" />}
      onClick={() => null}
    >
      Configure algorithm
    </Button>
  </>
);

const ChoosePrimitive = () => {
  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const onClose = () => setOpenFilterModal(false);

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
            <MultiSelect label="Tags" options={options} />
          </PropertiesModal>
        </div>

        <div className={styles.container}>
          {Object.entries(primitiveInfo).map(([primitiveCode]) => (
            <PrimitiveCard
              key={primitiveCode}
              primitive={primitiveCode as PrimitiveType}
            />
          ))}
        </div>
      </WizardLayout>
    </div>
  );
};

export default memo(ChoosePrimitive);
