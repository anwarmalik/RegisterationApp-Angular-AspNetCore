export class RegistrationInfo {

    constructor(
        public bsb: number,
        public accountNumber: number,
        public accountName: string,
        public reference: string,
        public amount: number
    ) { }

}