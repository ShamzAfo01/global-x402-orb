
export interface Partner {
  id: string;
  name: string;
  category: 'Infrastructure' | 'Agentic' | 'Blockchain' | 'AI' | 'Payment';
  logo?: string;
  description: string;
}

export interface NodePosition {
  x: number;
  y: number;
  z: number;
}
