'use client';

import * as React from 'react';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import { Icon } from '@/components/common/uikit';
import colors from '@/constants/colors';

import styles from './Pagination.module.scss';

type PaginationProps = {
  count: number;
  current: number;
  onChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  current,
  count,
  onChange,
}) => {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <Icon
            name="angle"
            color={colors.black[75]}
            size={16}
            orientation="right"
          />
        }
        onPageChange={(e) => onChange(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={count}
        previousLabel={
          <Icon
            name="angle"
            color={colors.black[75]}
            size={16}
            orientation="left"
          />
        }
        className={styles.container}
        forcePage={current - 1}
      />
    </div>
  );
};
