import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { DDResult } from '@/components/reports';

export default async function DDReport({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const tabs = [
    {
      name: 'result',
      label: 'Primitive list',
      icon: <Icon name="listDropDown" />,
      content: <DDResult />,
    },
  ];

  const currentTab = (await params).tab;
  return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
}
