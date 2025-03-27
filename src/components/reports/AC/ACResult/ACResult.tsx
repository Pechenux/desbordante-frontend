'use client';

//import Pagination from '@components/Pagination/Pagination';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Button, FormField, Icon, Text } from '@/components/common/uikit';
import { OrderingWindow } from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import ACAtom, { ACAtomDefaultValuesWithParams } from '@/store/ACTaskAtom';
import { Operation, ACInstance } from '../ACInstance';
import { myData } from '../FakeData/data4InstanceList';
import styles from './ACResult.module.scss';

export const ACResult = () => {
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  const [atom, setAtom] = useAtom(ACAtom);

  const shownData = myData;
  const ACs =
    (shownData.taskInfo.data.result &&
      'ACs' in shownData.taskInfo.data.result &&
      shownData.taskInfo.data.result.ACs) ||
    [];
  const operation =
    ('operation' in shownData.taskInfo.data &&
      shownData.taskInfo.data.operation) ||
    Operation.ADDITION;
  // const recordsCount =
  //   shownData?.taskInfo.data.result &&
  //   'pairsAttributesAmount' in shownData?.taskInfo.data.result &&
  //   shownData?.taskInfo.data.result.pairsAttributesAmount;

  useEffect(() => {
    setAtom({
      ...ACAtomDefaultValuesWithParams(
        shownData.taskInfo.taskID,
        atom.instanceSelected,
      ),
    });
  }, [atom.instanceSelected, setAtom, shownData.taskInfo.taskID]);

  return (
    <>
      {isOrderingShown && (
        <OrderingWindow
          {...{
            isOrderingShown,
            setIsOrderingShown,
            primitive: PrimitiveType.AC,
          }}
        />
      )}

      <h5>Instance List</h5>

      <div className={styles.filters}>
        <FormField label="Search">
          <Text placeholder="Attribute name or regex" />
        </FormField>
        <div className={styles.buttons}>
          <Button
            variant="secondary"
            size="md"
            icon={<Icon name="ordering" />}
            onClick={() => setIsOrderingShown(true)}
          >
            Ordering
          </Button>
        </div>
      </div>

      <div className={styles.rows}>
        {ACs.map((value) => {
          const id = `${value.attributes.attribute1} ${value.attributes.attribute2}`;
          return (
            <ACInstance
              key={id}
              id={id}
              attributes={value.attributes}
              operation={operation}
              intervals={value.intervals}
              outliers={value.outliers}
            />
          );
        })}
      </div>

      <div className={styles.pagination}>
        {/* <Pagination
          onChange={(n) => setFilterParam('page', n)}
          current={1}
          count={Math.ceil((recordsCount || 6) / 6)}
        /> */}
      </div>
    </>
  );
};
