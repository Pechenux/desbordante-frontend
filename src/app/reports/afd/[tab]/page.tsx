import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { AFDResult } from '@/components/reports';
import { ChartStatistics } from '@/components/reports/ChartStatisctics';

export default async function AFDReport({
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
      content: <AFDResult />,
    },
    // {
    //   name: 'snippet',
    //   label: 'Dataset snippet',
    //   icon: <Icon name="datatable" />,
    //   content: <Snippet />,
    //   pageClass: styles.page,
    //   containerClass: styles.container,
    // },
  ];

  const currentTab = (await params).tab;
  return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
}
