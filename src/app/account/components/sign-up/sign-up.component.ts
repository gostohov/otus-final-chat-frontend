import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    signup(): void {
        this.authService.signUp(this.formGroup.value).subscribe();
    }
}
