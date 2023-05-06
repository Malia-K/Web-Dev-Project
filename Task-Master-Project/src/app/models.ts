

export class SignUpToken {
  username: string = "";
  email: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";

};

export class AuthToken {
  token: string = "";
}


export interface User{
  id:number;
  username:string;
  email: string;
  first_name:string;
  last_name:string;

}



// export class Event {
//   id: any;
//   title: any;
//   start_time: any;
//   end_time: any;
// }

// export class User{
//   email: string = "";
//   password : string = "";

// }
