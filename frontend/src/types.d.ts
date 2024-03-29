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
  message: string;
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface CategoryI {
  _id: string;
  category: string;
}

export interface ItemMutation {
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: string;
}

export interface ItemsMainWindow {
  _id: string;
  title: string;
  price: string;
  image: string;
  category: {
    category: string;
  };
}

export interface OneItemI {
  _id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: {
    category: string;
  };
  seller: {
    _id: string;
    displayName: string;
    phone: string;
  };
}
