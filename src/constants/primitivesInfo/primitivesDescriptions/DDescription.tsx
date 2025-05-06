import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const DDDescription = (
  <div>
    Differential Dependency is a statement of the form{' '}
    <InlineMath math="X \to Y" />, where <InlineMath math="X" /> and{' '}
    <InlineMath math="Y" /> are sets of attributes. It indicates that for any
    two rows, <InlineMath math="t" /> and <InlineMath math="s" />, if the
    attributes in <InlineMath math="X" /> are similar, then the attributes in{' '}
    <InlineMath math="Y" /> will also be similar. The similarity for each
    attribute is defined as:{' '}
    <BlockMath math="\text{diff}(t[X_i], s[X_i]) \in [\text{val}_1, \text{val}_2]," />
    where <InlineMath math="t[X_i]" /> is the value of attribute{' '}
    <InlineMath math="X_i" /> in row <InlineMath math="t" />,{' '}
    <InlineMath math="\text{val}" /> is a constant, and{' '}
    <InlineMath math="\text{diff}" /> is a function that typically calculates
    the difference, often through simple subtraction.
  </div>
);
