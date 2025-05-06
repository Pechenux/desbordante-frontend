import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const ADCDescription = (
  <div>
    A denial constraint is a statement that says: &quot;For all pairs of rows in
    a table, it should never happen that some condition is true&quot;. Formally,
    DC <InlineMath math="\varphi" /> is a conjunction of predicates of the
    following form:
    <BlockMath math="\forall s,t \in R, s \neq t: \lnot (p_1 \wedge \ldots \wedge p_m)." />
    Each <InlineMath math="p_k" /> has the form <InlineMath math="column_i" />{' '}
    <InlineMath math="op" /> <InlineMath math="column_j" />, where{' '}
    <InlineMath math="op \in \{>, <, \leq, \geq, =, \neq\}" />. Desbordante
    supports both approximate and exact denial constraint discovery.
  </div>
);
