export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phone: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
