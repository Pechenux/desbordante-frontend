import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { ACResult /*, Snippet, Histogram */ } from '@/components/reports';
// import { ChartStatistics } from '@/components/reports/ChartStatisctics';
// import styles from './page.module.scss';

export default async function ACReport({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const tabs = [
    {
      name: 'result',
      label: 'Primitive list',
      icon: <Icon name="listDropDown" />,
      content: <ACResult />,
    },
    // {
    //   name: 'histogram',
    //   label: 'Histogram',
    //   icon: <Icon name="barChart" />,
    //   content: <Histogram />,
    // },
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
