import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
import { Icon } from '@/components/common/uikit';
import { MFDResult } from '@/components/reports';

export default async function MFDVerificationReport({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const tabs = [
    {
      name: 'clusters',
      label: 'Clusters',
      icon: <Icon name="cluster" />,
      content: <MFDResult />,
    },
  ];

  const currentTab = (await params).tab;
  return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
}
