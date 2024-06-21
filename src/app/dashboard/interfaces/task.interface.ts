export interface ResponseTask {
  createdAt:  number;
  state:      boolean | null | string;
  title:      string;
  id:         string;
  completed: boolean;
  email:     string;
  password:  string;
}
