import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationInfo } from '../../models/register.info'
import { RegisterService } from '../../services/register.service'
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';


@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    errorOnSubmit: boolean;
    isValidFormSubmitted: boolean;
    bsbPattern = "^[0-9]{6}$";
    accountNumberPattern = "^[0-9]{8}$";
    moneyPattern = "^[-]?[0-9]*[.]?[0-9]{0,2}$";


    registerForm = this.fb.group({
        bsb: ['', [Validators.required, Validators.pattern(this.bsbPattern)]],
        accountNumber: ['', [Validators.required, Validators.pattern(this.accountNumberPattern)]],
        accountName: ['', Validators.required],
        reference: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern(this.moneyPattern)]]
    });

    constructor(private fb: FormBuilder, private registerService: RegisterService) { }
    ngOnInit() {
    }

    onFormSubmit() {
        if (this.registerForm.invalid) {
            return;
        }

        this.isValidFormSubmitted = false;
        this.errorOnSubmit = false;
        let registerInfo: RegistrationInfo = this.registerForm.value;
        this.registerService.register(registerInfo).subscribe(() => {
        },
            (err) => {
                this.errorOnSubmit = true;
            },
            () => {
                this.registerForm.reset();
                this.isValidFormSubmitted = true;
            });
    }

    get bsb() {
        return this.registerForm.get('bsb');
    }
    get accountNumber() {
        return this.registerForm.get('accountNumber');
    }
    get accountName() {
        return this.registerForm.get('accountName');
    }
    get reference() {
        return this.registerForm.get('reference');
    }
    get amount() {
        return this.registerForm.get('amount');
    }
}