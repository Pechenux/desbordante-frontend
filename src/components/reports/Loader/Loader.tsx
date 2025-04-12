// import { primitivePathnames } from '@constants/primitiveReportPathnames';
import { useQuery } from '@tanstack/react-query';
// import getTaskStatusData from '@utils/getTaskStatusData';
import cn from 'classnames';
// import Image from 'next/image';
import { FC, useEffect } from 'react';
// import { PrimitiveType } from 'types/globalTypes';
import { createQueryFn } from '@/api/fetchFunctions';
import { TaskStatus } from '@/api/generated/serverSchema';
import { showError } from '@/utils/toasts';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './Loader.module.scss';
// import { Icon } from '@/components/common/uikit';

const taskStatus: Record<TaskStatus, string> = {
  [TaskStatus.created]: 'In queue',
  [TaskStatus.running]: 'In progress',
  [TaskStatus.completed]: 'Completed',
  [TaskStatus.failed]: 'failed',
};

export const Loader: FC = () => {
  const { queryParams, setQueryParams } = useQueryParams<{ taskID: string }>();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [`/api/task/${queryParams.taskID}`],
    queryFn: createQueryFn('/api/task/{task_id}', {
      params: {
        path: { task_id: queryParams.taskID! },
      },
    }),
    enabled: !!queryParams.taskID,
  });

  useEffect(() => {
    if (isFetching) return;

    if (error) {
      showError(error.message, "Can't fetch task state. Please try later.");
    }

    if (!data) return;

    if (data.status === TaskStatus.completed) {
      setTimeout(
        () =>
          setQueryParams({
            newPathname: `/reports/${data.config.primitive_name}`,
            params: { taskID: queryParams.taskID! },
          }),
        500,
      );
      return;
    }

    if ([TaskStatus.created, TaskStatus.running].includes(data.status)) {
      const refetchTimer = setTimeout(refetch, 2000);
      return () => clearTimeout(refetchTimer);
    }
  }, [data, error, isFetching, queryParams.taskID, refetch, setQueryParams]);

  // const status = getTaskStatusData(error, data);

  // const icon = status.isAnimated ? (
  //   <video
  //     autoPlay
  //     muted
  //     loop
  //     width={70}
  //     height={76}
  //     data-testid="animated-icon"
  //   >
  //     <source src={status.icon} type="video/webm" />
  //   </video>
  // ) : (
  //     <Icon name="status" alt="status" size={70} />
  //   <Image src={status.icon} alt="status" width={70} height={76} />
  // );
  return (
    <div className={styles.container}>
      {/* {icon} */}
      <div className={styles.text}>
        <h6>
          Task status:
          <span className={cn(styles.status)}>
            {' '}
            {taskStatus[data?.status ?? TaskStatus.created]}
          </span>
        </h6>
        {/* <p className={styles.description}>{status.description}</p> */}
      </div>
    </div>
  );
};
