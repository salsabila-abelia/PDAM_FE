export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Customer {
  id: number;
  username: string;
  user: User;
  password: string;
  name: string;
  phone: string;
  address: string;
  customer_number: string;
  tanggal_pendaftaran: string;
  role: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  id: number;
  user_id: number;
  username: string;
  name: string;
  phone: string;
  address: string;
  customer_number: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

export interface Services {
  id: number;
  name: string;
  min_usage: number;
  max_usage: number;
  price: number;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}
