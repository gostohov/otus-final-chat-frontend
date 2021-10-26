import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UrlAppendInterceptor} from './_helpers/url-append.interceptor';
import {UserService} from './_services/user.service';
import {JwtAppendInterceptor} from './_helpers/jwt-append.interceptor';
import {StartupService} from './_services/startup.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: UrlAppendInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtAppendInterceptor, multi: true},
        {
            provide: APP_INITIALIZER,
            useFactory: (ss: StartupService) => () => ss.load(),
            deps: [StartupService],
            multi: true
        },

        MessageService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
