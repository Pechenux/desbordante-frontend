// is development environment, global variable, set in next.config.js
// pnpm dev -> true, pnpm build && pnpm start -> false
declare const isDevelopment: boolean;

declare module '*.svg?component' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
