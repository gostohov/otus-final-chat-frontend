import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UrlAppendInterceptor} from './_helpers/url-append.interceptor';
import {AuthService} from './_services/auth.service';
import {JwtAppendInterceptor} from './_helpers/jwt-append.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: UrlAppendInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtAppendInterceptor, multi: true},

        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
