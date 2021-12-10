export class Session {
  isLoggedIn(): boolean {
    return !!localStorage.getItem("currentUser");
  }

  logout() {
    localStorage.clear();
  }
}
