interface userRepo {
  getUser: (id: number) => Promise<any>;
  updateUser: (id: number) => Promise<any>;
  addUser: (user: any) => Promise<any>;
  deleteUser: (id: number) => Promise<any>;
}
