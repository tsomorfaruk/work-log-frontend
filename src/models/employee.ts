export interface EmployeeResponse {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
  phone: string;
  designation: string;
  image_url: string;
  is_active: boolean;
  roles: string[];
  department: {
    id: number;
    display_name: string;
    code_name: string;
  };
  created_at: string;
}

export interface EmployeeListResponse {
  status: string;
  message: string;
  data: {
    users: {
      current_page: number;
      data: EmployeeResponse[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: [
        {
          url: null;
          label: string;
          page: null;
          active: boolean;
        },
        {
          url: string;
          label: string;
          page: number;
          active: boolean;
        },
        {
          url: null;
          label: string;
          page: null;
          active: boolean;
        }
      ];
      next_page_url: null;
      path: string;
      per_page: number;
      prev_page_url: null;
      to: number;
      total: number;
    };
  };
}

export interface EmployeeDepartmentResponse {
  id: number;
  display_name: string;
  code_name: string;
}

export interface EmployeeDetailsResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      display_name: string;
      email: string;
      phone: string;
      designation: string;
      image_url: string | null;
      is_active: boolean;
      roles: string[];
      department: EmployeeDepartmentResponse | null;
      created_at: string;
    };
  };
}

export interface AlterEmployeePayload {
  id?: number;
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
  phone: string;
  designation: string;
  department_id: number;
  role: string;
  is_active: number;

  password?: string; // not for edit
  password_confirmation?: string; // not for edit
  image?: File; // optional
  address?: string; // optional
}
