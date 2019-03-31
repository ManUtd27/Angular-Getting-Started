import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MessageComponent} from './message.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'message', component: MessageComponent, outlet: 'popup'}
    ])
  ],
  exports: [RouterModule]
})
export class MessageRoutingModule {

}
