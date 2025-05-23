import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { ACResult } from '@/components/reports';

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
  ];

  const currentTab = (await params).tab;
  return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
}
