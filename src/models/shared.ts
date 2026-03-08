export interface Department {
  id: number;
  display_name: string;
  code_name: string;
}

export interface DepartmentRolesListResponse {
  status: string;
  message: string;
  data: {
    departments: Department[];
  };
}

export interface Role {
  id: number;
  name: string;
}

export interface RolesListResponse {
  status: string;
  message: string;
  data: {
    roles: Role[];
  };
}

export interface Designation {
  id: number;
  name: string;
}

export interface DesignationListResponse {
  status: string;
  message: string;
  data: {
    designations: Designation[];
  };
}

export interface Branch {
  id: number;
  name: string;
  code_name: string;
  address?: string;
  phone?: string | null;
  others?: any;
  company_id: string | number;
  created_at?: string;
  updated_at?: string;
}

export interface BranchListResponse {
  status: boolean | string;
  message: string;
  data: {
    branches: Branch[];
  };
}
