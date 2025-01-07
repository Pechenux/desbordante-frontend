import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { ARResult, Snippet } from '@/components/reports';
import styles from './page.module.scss';

export default async function ARReport({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const tabs = [
    {
      name: 'result',
      label: 'Primitive list',
      icon: <Icon name="listDropDown" />,
      content: <ARResult />,
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
