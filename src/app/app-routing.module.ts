import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
// import { MetaGuard } from '@ngx-meta/core';
import {ResultComponent} from './result/result/result.component';
import {AddressComponent} from "./address/address.component";
import {NewResultComponent} from "./new-result/new-result.component";
const routes: Routes = [
  {
    path: '',
    component : AddressComponent,
    pathMatch : 'full'
  },
  {
    path: 'home',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path: 'privacy-policy',
    component : PrivacyPolicyComponent,
    pathMatch : 'full'
  },
  {
    path: 'terms-and-condition',
    component : TermsAndConditionComponent,
    data: {
      meta: {
        title: 'Sweet home',
        description: 'Home, home sweet home... and what?'
      }
    },
    pathMatch : 'full'
  },
  // {
  //   path: 'result',
  //   canActivate: [],
  //   loadChildren: 'src/app/result/result.module#ResultModule',
  //   pathMatch: 'full'
  // },
  {
    path: 'result',
    component: NewResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
