import { finopsMockData } from '../mock/finopsMockData';

export function useFinopsDashboard() {
  return {
    data: finopsMockData,
    isLoading: false,
  };
}
