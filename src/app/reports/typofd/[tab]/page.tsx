// import { ReportsLayout } from '@/components/common/layout/ReportsLayout';
// import { Icon } from '@/components/common/uikit';
// import { TypoFDResult, Snippet } from '@/components/reports';
// import styles from './page.module.scss';

// export default async function TypoFDReport({
//   params,
// }: {
//   params: Promise<{ tab: string }>;
// }) {
//   const tabs = [
//     {
//       name: 'clusters',
//       label: 'Clusters',
//       icon: <Icon name="cluster" />,
//       content: <div>Clusters</div>,
//     },
//     {
//       name: 'result',
//       label: 'Primitive list',
//       icon: <Icon name="listDropDown" />,
//       content: <TypoFDResult />,
//     },
//     {
//       name: 'snippet',
//       label: 'Dataset snippet',
//       icon: <Icon name="datatable" />,
//       content: <Snippet />,
//       pageClass: styles.page,
//       containerClass: styles.container,
//     },
//   ];

//   const currentTab = (await params).tab;
//   return <ReportsLayout tabs={tabs} currentTab={currentTab} />;
// }
