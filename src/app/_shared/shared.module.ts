import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LazyImageComponent} from './components/lazy-image/lazy-image.component';
import {LazyImageService} from './components/lazy-image/lazy-image.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    declarations: [
        LazyImageComponent
    ],
    imports: [
        CommonModule,

        ProgressSpinnerModule,
    ],
    providers: [
        LazyImageService
    ],
    exports: [
        LazyImageComponent
    ]
})
export class SharedModule {
}
