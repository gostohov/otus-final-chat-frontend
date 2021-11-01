import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {LazyImageService} from './lazy-image.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {BehaviorSubject, of} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@Component({
	selector: 'app-lazy-image',
	templateUrl: './lazy-image.component.html',
	styleUrls: ['./lazy-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyImageComponent implements OnInit {
	image: SafeUrl;
	loading: boolean;

	private _loadImage$: BehaviorSubject<string | { objectURL: string }> = new BehaviorSubject<string | { objectURL: string }>(null);

	@Input()
	set src(source: string | { objectURL: string }) {
		this.loading = true;
		this._loadImage$.next(source);
	}
	@Input() style: any;

	constructor(
		private readonly lazyImageService: LazyImageService,
		private readonly sanitizer: DomSanitizer,
		private cdr: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this._loadImage$.pipe(
			filter(source => source != null),
			switchMap(source => {
				const $ = typeof source !== 'string' ?
					of(source?.objectURL)
					: this.lazyImageService.downloadImage(source).pipe(
						map(blob => this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(blob))))
					);

				return $.pipe(tap(image => {
					this.cdr.markForCheck();
					this.image = image;
					this.loading = false;
				}));
			}),
		).subscribe();
	}
}
