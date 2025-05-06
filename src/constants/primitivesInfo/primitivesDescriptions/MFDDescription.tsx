import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const MFDDescription = (
  <div>
    Metric verification is a process of checking whether a specific metric
    functional dependency (MFD) holds on data or not. MFD is a relaxed form of
    classic functional dependencies which allows small variations in the values
    of the right hand side of a dependency. It other words, for MFD{' '}
    <InlineMath math="X \to Y" /> we still expect two different tuples to agree
    on values of attributes in X, but their values on Y can differ no more than
    some threshold. MFD can be verified for numeric and string types using
    different metrics. Currently available are: Euclidean, Levenshtein and
    Cosine. Results of metric verification process are presented as clusters of
    records which share the same left hand side, but differ in the right one. If
    distance of records&apos; values too far from any points of the same
    cluster, they are tagged with an &quot;X&quot; mark. A check mark is used
    otherwise.
  </div>
);
