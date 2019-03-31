import {Component} from '@angular/core';

import {AuthService} from './user/auth.service';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  logOut(): void {
    this.authService.logout();
    this.hideMessages();
    // Navigate to Welcome page after logging out
    this.router.navigateByUrl('/welcome');
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    this.router.navigate([{outlets: {popup: ['message']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.messageService.isDisplayed = false;
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
