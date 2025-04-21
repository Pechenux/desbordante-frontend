'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { MultiValue } from 'react-select';
import { PrimitiveCard } from '@/components/choose-primitive/PrimitiveCard/PrimitiveCard';
import { WizardLayout } from '@/components/common/layout/WizardLayout';
import { Button } from '@/components/common/uikit/Button';
import { Icon } from '@/components/common/uikit/Icon';
import { Search } from '@/components/common/uikit/Inputs';

import { FilteringPrimitivesModal } from '@/components/configure-algorithm/FilteringPrimitivesModal';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { primitiveInfo } from '@/constants/primitivesInfo/primitivesInfo';
import { TagType } from '@/constants/primitivesInfo/primitivesTags';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './choosePrimitive.module.scss';

const ChoosePrimitive = () => {
  const [isOpenFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [choosenPrimitive, setChoosenPrimitive] = useState<PrimitiveType>(
    PrimitiveType.FD,
  );
  const [searchString, setSearchString] = useState<string>('');
  const [choosenFilteringTags, setChoosenFilteringTags] = useState<
    MultiValue<TagType>
  >([]);
  const primitivesCodes = Object.keys(primitiveInfo) as PrimitiveType[];
  const [filteringPrimitives, setFilteringPrimitives] =
    useState<PrimitiveType[]>(primitivesCodes);
  const [searchingPrimitives, setSearchingPrimitives] =
    useState<PrimitiveType[]>(primitivesCodes);

  const onClose = () => setOpenFilterModal(false);

  const onApply = () => {
    const newShownPrimitives = primitivesCodes.filter((primitive) =>
      choosenFilteringTags.every((tag) =>
        primitiveInfo[primitive]?.tags.includes(tag),
      ),
    );
    setFilteringPrimitives(newShownPrimitives);

    onClose();
  };

  useEffect(() => {
    setSearchingPrimitives(
      filteringPrimitives.filter((primitive) =>
        primitiveInfo[primitive]?.label
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase()),
      ),
    );
  }, [searchString, filteringPrimitives]);

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
          <Search
            label="Search"
            placeholder="Search..."
            value={searchString}
            onSearch={setSearchString}
          />
          <Button
            variant="primary"
            size="md"
            icon={<Icon name="filter" />}
            onClick={() => setOpenFilterModal(true)}
          >
            Filters
          </Button>
          <FilteringPrimitivesModal
            isOpen={isOpenFilterModal}
            onClose={onClose}
            onApply={onApply}
            onChange={setChoosenFilteringTags}
            choosenTags={choosenFilteringTags}
          />
        </div>

        <div className={styles.container}>
          {searchingPrimitives.map((primitiveCode) => (
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
