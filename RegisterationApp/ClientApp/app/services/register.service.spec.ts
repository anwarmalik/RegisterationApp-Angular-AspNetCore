import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend,
    RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RegisterService } from './register.service';
import { RegistrationInfo } from '../models/register.info';
import { BaseRequestOptions } from '@angular/http'
import { } from 'jasmine'

describe('Register Service', () => {
    let mockBackend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                RegisterService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                HttpModule
            ]
        });

        mockBackend = getTestBed().get(MockBackend);

    }));

    it('should be able to register the information',

        async(inject([RegisterService], (registerService: RegisterService) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.method).toBe(RequestMethod.Post);
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
            });

            let data: RegistrationInfo = new RegistrationInfo(222222, 111222333, 'adfasf', 'adfas', 22.0);
            registerService.register(data).subscribe(
                (successResult) => {
                    expect(successResult).toBeDefined();
                    expect(successResult.status).toBe(200);
                });
        }))
    );

});  