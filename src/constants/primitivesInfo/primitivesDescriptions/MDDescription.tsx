import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const MDDescription = (
  <div>
    Matching Dependency is a statement of the form <InlineMath math="X \to Y" />
    , where <InlineMath math="X" /> and <InlineMath math="Y" /> are sets of
    so-called column matches. Each column match includes:
    <ol>
      <li>a metric (e.g., Levenshtein distance, Jaccard similarity, etc.),</li>
      <li>a left column, and</li>
      <li>a right column.</li>
    </ol>
    Note that this pattern may involve two tables in its column matches.
    Finally, each match has its own threshold, which is applied to the
    corresponding metric and lies in the <InlineMath math="[0, 1]" /> range. The
    dependency can be interpreted as follows: any two records that satisfy{' '}
    <InlineMath math="X" /> will also satisfy <InlineMath math="Y" />.
  </div>
);
