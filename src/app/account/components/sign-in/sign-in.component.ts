import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    signIn(): void {
        this.authService.signIn(this.formGroup.value).subscribe();
    }
}
