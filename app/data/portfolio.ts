export interface Building {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  metrics: {
    energyStar: number;
    ll97Score: number;
    compliance: number;
  };
}

export interface Portfolio {
  id: string;
  name: string;
  region: string;
  image: string;
  buildings: Building[];
}
