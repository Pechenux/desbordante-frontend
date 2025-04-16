'use client';

//import Pagination from '@components/Pagination/Pagination';

import { useQuery } from '@tanstack/react-query';
//import { useAtom } from 'jotai';
import { useState } from 'react';
import { createQueryFn } from '@/api/fetchFunctions';
import { OperationType } from '@/api/generated/schema';
import { Button, FormField, Icon, Text } from '@/components/common/uikit';
import { OrderingWindow } from '@/components/reports';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
//import ACAtom, { ACAtomDefaultValuesWithParams } from '@/store/ACTaskAtom';
import { useQueryParams } from '@/utils/useQueryParams';
import { ACInstance } from '../ACInstance';
//import { myData } from '../FakeData/data4InstanceList';
import styles from './ACResult.module.scss';

export const ACResult = () => {
  const { queryParams } = useQueryParams<{ taskID: string }>();
  const [isOrderingShown, setIsOrderingShown] = useState(false);
  //const [atom, setAtom] = useAtom(ACAtom);

  // const queryParams = {
  //   taskID: '48a67b65-3911-4eab-a261-ec9bdd6f5159',
  // };
  const { data, isFetching, error } = useQuery({
    queryKey: [`/tasks/${queryParams.taskID}`],
    queryFn: createQueryFn('/tasks/{id}', {
      params: {
        path: { id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  console.log(data, isFetching, error);
  if (isFetching || error) return;

  const shownData =
    data?.result?.primitive_name === 'ac' && data?.result?.result;
  const operation =
    data?.config.primitive_name === 'ac' && data.config.config.bin_operation;

  // const shownData = myData;
  // const ACs =
  //   (shownData.taskInfo.data.result &&
  //     'ACs' in shownData.taskInfo.data.result &&
  //     shownData.taskInfo.data.result.ACs) ||
  //   [];
  // const operation =
  //   ('operation' in shownData.taskInfo.data &&
  //     shownData.taskInfo.data.operation) ||
  //   Operation.ADDITION;
  // const recordsCount =
  //   shownData?.taskInfo.data.result &&
  //   'pairsAttributesAmount' in shownData?.taskInfo.data.result &&
  //   shownData?.taskInfo.data.result.pairsAttributesAmount;

  // useEffect(() => {
  //   setAtom({
  //     ...ACAtomDefaultValuesWithParams(
  //       data?.id || '',
  //       atom.instanceSelected,
  //     ),
  //   });
  // }, [atom.instanceSelected, setAtom, data]);

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
        {shownData &&
          shownData.map((value) => {
            const id = `${value.left_column} ${value.right_column}`;
            //const isSelected = atom.instanceSelected?.id === id;
            const isSelected = false;
            return (
              <ACInstance
                key={id}
                isSelected={isSelected}
                left_column={value.left_column}
                right_column={value.right_column}
                operation={operation || OperationType.ValueMinus}
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
