import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/guard/auth.service";
import { Session } from "src/app/guard/session";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input()
  session: Session;
  constructor(public authService: AuthService) {}

  isLoggedIn: boolean = !!localStorage.getItem("currentUser");

  ngOnInit(): void {
    this.session = new Session();
  }

  logout() {
    this.session.logout();
  }
}
