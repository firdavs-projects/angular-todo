export interface Task {
  id?: string;
  owner: string;
  task: string;
  completed: boolean;
  date: Date;
}

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
  email: string;
}

export interface FbCreateResponse {
  name: string;
}

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}
