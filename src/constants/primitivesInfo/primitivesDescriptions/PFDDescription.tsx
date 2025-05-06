import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const PFDDescription = (
  <div>
    Probabilistic functional dependency is a specific type of relaxed functional
    dependency. Essentially, it states that the values from one set of
    attributes uniquely determine the values of another set of attributes for
    almost all tuples. The number of admissible violations is controlled by a
    user-specified threshold value in the range of <InlineMath math="[0, 1]" />.
    For each candidate PFD, a (fixed) metric is calculated, and if the value is
    less than this threshold, the PFD is considered to hold. For this purpose,
    the <InlineMath math="\text{PerTuple}" /> and{' '}
    <InlineMath math="\text{PerValue}" /> metrics can be used.
  </div>
);
