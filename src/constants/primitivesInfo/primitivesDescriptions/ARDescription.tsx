import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const ARDescription = (
  <div>
    Association rule is one of the most prominent concept of a frequent pattern
    mining. To mine association rules a dataset have to be presented in a
    transactional layout &mdash; each record of such dataset is a unique
    transaction which contains items that were obtained during the transaction.
    At first, an AR mining algorithm defines frequently met items in a dataset,
    i.e. itemsets, and then constructs relationships between them according to
    specified confidence and support levels. Constructed relationships are
    binary and a single AR <InlineMath math="X \to Y" /> represents a fact that
    if itemset X was met in a transaction, then itemset Y can be met as well.
  </div>
);
