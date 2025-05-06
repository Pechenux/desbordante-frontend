import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const NARDescription = (
  <div>
    Numeric Association Rule is a statement of the form{' '}
    <InlineMath math="X \to Y" />, where <InlineMath math="X" /> and{' '}
    <InlineMath math="Y" /> are conditions, specified on disjoint sets of
    attributes. Each condition takes a form of{' '}
    <BlockMath math="A_1 \land A_2 \land \ldots \land A_n," /> where{' '}
    <InlineMath math="A_i" /> is either{' '}
    <BlockMath math="\text{Attribute}_i \in [\text{constant}_{i}^{1}, \text{constant}_{i}^{2}]" />{' '}
    or <BlockMath math="\text{Attribute}_i = \text{constant}_i^3." />
    Furthermore, the statement includes the support
    <InlineMath math="(\text{sup})" /> and confidence
    <InlineMath math="(\text{conf})" /> values, which lie in{' '}
    <InlineMath math="[0, 1]" />. The rule can be interpreted as follows:
    <ol>
      <li>
        the <InlineMath math="\text{sup}" /> share of rows in the dataset
        satisfies both the <InlineMath math="X" /> and <InlineMath math="Y" />{' '}
        conditions, and
      </li>
      <li>
        the <InlineMath math="\text{conf}" /> share of rows that satisfy the{' '}
        <InlineMath math="X" /> also satisfies <InlineMath math="Y" />.
      </li>
    </ol>
  </div>
);
