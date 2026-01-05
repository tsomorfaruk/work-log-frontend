export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      display_name: null;
      email: string;
      roles: string[];
      //   roles: ["admin"];
    };
  };
}
