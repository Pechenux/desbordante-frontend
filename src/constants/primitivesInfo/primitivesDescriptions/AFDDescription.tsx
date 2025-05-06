import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const AFDDescription = (
  <div>
    Approximate functional dependency is a relaxed form of functional dependency
    that allows for some degree of violation. Essentially, it states that the
    values from one set of attributes uniquely determine the values of another
    set of attributes for almost all tuples. The number of admissible violations
    is controlled by a user-specified threshold value in the range of{' '}
    <InlineMath math="[0, 1]" />. For each candidate AFD, a (fixed) metric is
    calculated, and if the value is less than this threshold, the AFD is
    considered to hold. Several metrics exist for this purpose, such as{' '}
    <InlineMath math="g_1" />, <InlineMath math="\mu^+" />,{' '}
    <InlineMath math="\tau" />, <InlineMath math="\text{pdep}" />,{' '}
    <InlineMath math="\rho" />.
  </div>
);
