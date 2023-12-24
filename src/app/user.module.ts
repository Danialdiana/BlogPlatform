export class User {
    _id: string; 
    username: string;
    email: string;
    password: string;
  
    constructor() {
      this._id = ''; 
      this.username = '';
      this.email = '';
      this.password = '';
    }
}