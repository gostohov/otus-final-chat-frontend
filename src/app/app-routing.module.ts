import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    {path: '**', redirectTo: 'chat'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
