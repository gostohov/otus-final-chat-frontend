import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
    {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
