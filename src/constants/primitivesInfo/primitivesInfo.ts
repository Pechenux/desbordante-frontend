import { ReactNode } from 'react';
import { PrimitiveType } from './primitives';
import { ACDescription } from './primitivesDescriptions/ACDescription';
import { AFDDescription } from './primitivesDescriptions/AFDDescription';
import { TagType } from './primitivesTags';

type PrimitiveInfoType = {
  label: string;
  description: ReactNode;
  tags: TagType[];
};

export const primitiveInfo: Partial<Record<PrimitiveType, PrimitiveInfoType>> =
  {
    [PrimitiveType.FD]: {
      label: 'Functional Dependencies',
      description:
        'Functional dependencies are crucial metadata for performing schema normalization, data cleaning and various data profiling tasks. A single FD represents a relationship between two disjoint sets of attributes, which states that the values from one set uniquely determine the values of another. Such hidden patterns provide a great start to get to know your data.',
      tags: [
        TagType.ApproximateAlgorithm,
        TagType.Table,
        TagType.ExactPattern,
        TagType.SingleSource,
      ],
    },
    [PrimitiveType.NAR]: {
      label: 'Numerical Association Rules',
      description: 'pupupu',
      tags: [TagType.SingleSource, TagType.Table, TagType.ApproximateAlgorithm],
    },
    [PrimitiveType.DD]: {
      label: 'Differential Dependencies',
      description: 'lorem ipsum',
      tags: [TagType.SingleSource, TagType.Table, TagType.ExactPattern],
    },
    [PrimitiveType.MD]: {
      label: 'Matching Dependencies',
      description: 'lorem ipsum',
      tags: [
        TagType.SingleSource,
        TagType.MultiSource,
        TagType.Table,
        TagType.ExactPattern,
      ],
    },
    [PrimitiveType.MFD]: {
      label: 'Metric Dependency Verification',
      description:
        'Metric verification is a process of checking whether a specific metric functional dependency (MFD) holds on data or not. MFD is a relaxed form of classic functional dependencies which allows small variations in the values of the right hand side of a dependency. It other words, for MFD X⟶Y we still expect two different tuples to agree on values of attributes in X, but their values on Y can differ no more than some threshold. MFD can be verified for numeric and string types using different metrics. Currently available are: Euclidean, Levenshtein and Cosine. Results of metric verification process are presented as clusters of records which share the same left hand side, but differ in the right one. If distance of records\' values too far from any points of the same cluster, they are tagged with an "X" mark. A check mark is used otherwise.',
      tags: [TagType.SingleSource, TagType.Table],
    },
    [PrimitiveType.ADC]: {
      label: 'Approximate Denial Constraints',
      description: 'lorem ipsum',
      tags: [TagType.SingleSource, TagType.Table, TagType.ApproximatePattern],
    },
    [PrimitiveType.AC]: {
      label: 'Algebraic Constraints',
      description: ACDescription,
      tags: [TagType.SingleSource, TagType.Table, TagType.ExactPattern],
    },
    [PrimitiveType.AFDVerification]: {
      label: 'Approximate Functional Dependencies Verification',
      description: 'lorem ipsum',
      tags: [TagType.SingleSource, TagType.Table],
    },
    [PrimitiveType.AFD]: {
      label: 'Approximate Functional Dependencies',
      description: AFDDescription,
      tags: [TagType.SingleSource, TagType.Table, TagType.ApproximatePattern],
    },
    [PrimitiveType.PFD]: {
      label: 'Probability Functional Dependencies',
      description: 'lorem ipsum',
      tags: [TagType.SingleSource, TagType.Table, TagType.ApproximatePattern],
    },
  } as const;
