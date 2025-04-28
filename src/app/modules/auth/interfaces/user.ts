export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  joining_date: Date;
  role: 'user' | 'artist';
  last_password_update?: Date;
  refreshToken: string;
  accessToken: string;
  // Custom instance methods
}
