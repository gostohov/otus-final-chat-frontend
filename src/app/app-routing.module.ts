import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_helpers/auth.guard';
import {AuthReverseGuard} from './_helpers/auth-reverse.guard';

const chatModule = () => import('./chat/chat.module').then(m => m.ChatModule);
const accountModule = () => import('./account/account.module').then(m => m.AccountModule);

const routes: Routes = [
    {path: 'chat', loadChildren: chatModule, canActivate: [AuthGuard]},
    {path: 'account', loadChildren: accountModule, canActivate: [AuthReverseGuard]},
    {path: '**', redirectTo: 'chat', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
