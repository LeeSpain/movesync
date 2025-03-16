
import { ElementType } from 'react';

export type FeatureCategory = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  items: string[];
  australianContext?: string;
};
