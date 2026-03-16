import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'in-progress' | 'completed' | 'pending' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  owner: string;
  budget: string;
  description?: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [
    {
      id: '1',
      name: 'Downtown Complex',
      location: 'San Francisco, CA',
      type: 'Commercial',
      status: 'in-progress',
      progress: 75,
      startDate: 'Jan 15, 2026',
      endDate: 'Jun 30, 2026',
      owner: 'ABC Corporation',
      budget: '$1,200,000',
      description: 'Modern commercial complex with retail and office spaces',
    },
    {
      id: '2',
      name: 'Villa Estate',
      location: 'Beverly Hills, CA',
      type: 'Residential',
      status: 'in-progress',
      progress: 60,
      startDate: 'Feb 1, 2026',
      endDate: 'Aug 15, 2026',
      owner: 'Smith Family',
      budget: '$2,500,000',
      description: 'Luxury villa with modern amenities and landscape',
    },
    {
      id: '3',
      name: 'Sunset Residence',
      location: 'Malibu, CA',
      type: 'Residential',
      status: 'completed',
      progress: 100,
      startDate: 'Oct 1, 2025',
      endDate: 'Feb 28, 2026',
      owner: 'Johnson Family',
      budget: '$1,800,000',
      description: 'Beachfront residence with ocean views',
    },
    {
      id: '4',
      name: 'Modern Apartments',
      location: 'Los Angeles, CA',
      type: 'Residential',
      status: 'in-progress',
      progress: 45,
      startDate: 'Mar 1, 2026',
      endDate: 'Dec 31, 2026',
      owner: 'Real Estate Group LLC',
      budget: '$3,500,000',
      description: 'Multi-unit apartment complex',
    },
    {
      id: '5',
      name: 'Tech Office Park',
      location: 'San Jose, CA',
      type: 'Commercial',
      status: 'pending',
      progress: 15,
      startDate: 'Apr 1, 2026',
      endDate: 'Mar 31, 2027',
      owner: 'Tech Innovations Inc',
      budget: '$5,000,000',
      description: 'Corporate office campus with modern facilities',
    },
  ],

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project,
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),

  getProjectById: (id) => {
    return get().projects.find((project) => project.id === id);
  },
}));
