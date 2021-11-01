import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    signIn(): void {
        this.userService.login(this.formGroup.value).subscribe(() => this.router.navigate(['']));
    }
}
