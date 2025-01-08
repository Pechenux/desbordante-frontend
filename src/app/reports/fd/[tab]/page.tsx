import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { FDResult, Snippet } from '@/components/reports';
import { ChartStatistics } from '@/components/reports/ChartStatisctics';
import styles from './page.module.scss';

export default async function FDReport({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const tabs = [
    {
      name: 'statistics',
      label: 'Statistics',
      icon: <Icon name="chart" />,
      content: <ChartStatistics />,
    },
    {
      name: 'result',
      label: 'Primitive list',
      icon: <Icon name="listDropDown" />,
      content: <FDResult />,
    },
    {
      name: 'snippet',
      label: 'Dataset snippet',
      icon: <Icon name="datatable" />,
      content: <Snippet />,
      pageClass: styles.page,
      containerClass: styles.container,
    },
  ];

  const currentTab = (await params).tab;
  return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
}
