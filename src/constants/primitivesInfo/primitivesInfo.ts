import { ReactNode } from 'react';
import { PrimitiveType } from './primitives';
import { ACDescription } from './primitivesDescriptions/ACDescription';
import { ADCDescription } from './primitivesDescriptions/ADCDescription';
import { AFDDescription } from './primitivesDescriptions/AFDDescription';
import { AFDVerificationDescription } from './primitivesDescriptions/AFDVerificationDescription';
import { ARDescription } from './primitivesDescriptions/ARDescription';
import { DDDescription } from './primitivesDescriptions/DDescription';
import { FDDescription } from './primitivesDescriptions/FDDescription';
import { MDDescription } from './primitivesDescriptions/MDDescription';
import { MFDDescription } from './primitivesDescriptions/MFDDescription';
import { NARDescription } from './primitivesDescriptions/NARDescription';
import { PFDDescription } from './primitivesDescriptions/PFDDescription';
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
      description: FDDescription,
      tags: [
        TagType.ExactPattern,
        TagType.ApproximateAlgorithm,
        TagType.ExactAlgorithm,
        TagType.Table,
        TagType.SingleSource,
      ],
    },
    [PrimitiveType.NAR]: {
      label: 'Numerical Association Rules',
      description: NARDescription,
      tags: [
        TagType.ExactPattern,
        TagType.ApproximateAlgorithm,
        TagType.Table,
        TagType.SingleSource,
      ],
    },
    [PrimitiveType.DD]: {
      label: 'Differential Dependencies',
      description: DDDescription,
      tags: [TagType.ExactPattern, TagType.Table, TagType.SingleSource],
    },
    [PrimitiveType.MD]: {
      label: 'Matching Dependencies',
      description: MDDescription,
      tags: [
        TagType.ExactPattern,
        TagType.Table,
        TagType.SingleSource,
        TagType.MultiSource,
      ],
    },
    [PrimitiveType.MFD]: {
      label: 'Metric Dependency Verification',
      description: MFDDescription,
      tags: [TagType.SingleSource, TagType.Table],
    },
    [PrimitiveType.ADC]: {
      label: 'Approximate Denial Constraints',
      description: ADCDescription,
      tags: [TagType.ApproximatePattern, TagType.Table, TagType.SingleSource],
    },
    [PrimitiveType.AC]: {
      label: 'Algebraic Constraints',
      description: ACDescription,
      tags: [TagType.ExactPattern, TagType.Table, TagType.SingleSource],
    },
    [PrimitiveType.AFDVerification]: {
      label: 'Approximate Functional Dependencies Verification',
      description: AFDVerificationDescription,
      tags: [TagType.SingleSource, TagType.Table],
    },
    [PrimitiveType.AFD]: {
      label: 'Approximate Functional Dependencies',
      description: AFDDescription,
      tags: [TagType.ApproximatePattern, TagType.Table, TagType.SingleSource],
    },
    [PrimitiveType.AR]: {
      label: 'Association Rules',
      description: ARDescription,
      tags: [],
    },
    [PrimitiveType.PFD]: {
      label: 'Probability Functional Dependencies',
      description: PFDDescription,
      tags: [TagType.ApproximatePattern, TagType.Table, TagType.SingleSource],
    },
  } as const;
