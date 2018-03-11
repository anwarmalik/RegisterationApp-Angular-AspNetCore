import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';

import {
    FormGroup,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RegisterComponent } from './register.component';
import { RegisterService } from '../../services/register.service';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { } from 'jasmine';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/of';


describe('Component: RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let registerService: RegisterService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [ReactiveFormsModule, HttpModule],
            providers: [RegisterService]
        });

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        registerService = TestBed.get(RegisterService);
        
        spyOn(registerService, 'register').and.returnValue(Observable.of({}));
    });


    describe('Componenet: UI Test', () => {
        it('should have a deifined component', () => {
            expect(component).toBeDefined();
        });

        it('should create a `FormGroup` comprised of `FormControl`s', () => {
            component.ngOnInit();
            expect(component.registerForm instanceof FormGroup).toBe(true);
        });

        it('should have all form control in a form', () => {
            component.ngOnInit();
            expect(component.registerForm.contains("bsb")).toBe(true);
            expect(component.registerForm.contains("accountName")).toBe(true);
            expect(component.registerForm.contains("accountNumber")).toBe(true);
            expect(component.registerForm.contains("reference")).toBe(true);
            expect(component.registerForm.contains("amount")).toBe(true);
        });


        it('should honor validation rules', () => {
            component.ngOnInit();
            expect(component.registerForm.contains("bsb")).toBe(true);
            expect(component.registerForm.contains("accountName")).toBe(true);
            expect(component.registerForm.contains("accountNumber")).toBe(true);
            expect(component.registerForm.contains("reference")).toBe(true);
            expect(component.registerForm.contains("amount")).toBe(true);
        });



        it('should display a title', async(() => {
            const titleText = fixture.nativeElement.querySelector('h1').textContent;
            expect(titleText).toEqual('Register Component');
        }));


        it('shoud have a form', async(() => {
            const formTag = fixture.nativeElement.querySelector('form');
            expect(formTag).not.toEqual(null);
        }));


        it('should have all form control in a form', () => {
            component.ngOnInit();
            expect(component.registerForm.contains("bsb")).toBe(true);
            expect(component.registerForm.contains("accountName")).toBe(true);
            expect(component.registerForm.contains("accountNumber")).toBe(true);
            expect(component.registerForm.contains("reference")).toBe(true);
            expect(component.registerForm.contains("amount")).toBe(true);
        });


    });

    describe('Component: FormTest', () => {
        function updateForm(bsb: string, accountNUmber: string, acccountName: string, reference: string, amount: string) {
            component.registerForm.controls['bsb'].setValue(bsb);
            component.registerForm.controls['accountNumber'].setValue(accountNUmber);
            component.registerForm.controls['accountName'].setValue(acccountName);
            component.registerForm.controls['reference'].setValue(reference);
            component.registerForm.controls['amount'].setValue(amount);
        }

        it('shouls have show valid errors', () => {
            component.ngOnInit();
            var user = {
                accountName: '11112222',
                accountNumber: '111222',
                amount: '22',
                bsb: '111222',
                reference: '111222',
            }
            updateForm(user.bsb, user.accountNumber, user.accountName, user.reference, user.amount);
            expect(component.registerForm.value).toEqual(user);
        })

        it('should have invalid state on bad data', () => {
            component.ngOnInit();
            var user = {
                accountName: '1111222',
                accountNumber: '111222',
                amount: '22',
                bsb: '11122',
                reference: '111222',
            }
            updateForm(user.bsb, user.accountNumber, user.accountName, user.reference, user.amount);
            expect(component.registerForm.valid).toBeFalsy();
        })

        it('shoube have called RegisterService register on Submit', () => {
            component.ngOnInit();
            var user = {
                accountName: '11112222',
                accountNumber: '11122222',
                amount: '22',
                bsb: '111222',
                reference: '111222',
            }
            updateForm(user.bsb, user.accountNumber, user.accountName, user.reference, user.amount);
            expect(component.registerForm.valid).toBeTruthy();
            component.onFormSubmit();

            expect(registerService.register).toHaveBeenCalledWith(user);

        })

    });
});