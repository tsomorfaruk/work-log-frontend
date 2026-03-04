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
