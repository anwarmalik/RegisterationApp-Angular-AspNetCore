using RegisterationApp.Models;
using Shouldly;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Xunit;

namespace Registerations.Test
{
    public class RegistrationInfoModelTests
    {
        [Fact]
        public void Valiedate_Model_Given_Valid_Model_ExpectNoValidationErrors()
        {
            var model = new RegisterationInfo();
            model.BankStateBranchCode = "123456";
            model.AccountNumber = "11112222";
            model.AccountName = "Test";
            model.Reference = "test";
            model.Amount = 40m;

            var results = ValidateModel(model);

            results.Count.ShouldBe(0);
        }

        [Fact]
        public void ValidateModel_Given_BSB_IsNull_ExpectBsbRequiredError()
        {
            var model = new RegisterationInfo();
            model.AccountNumber = "11112222";
            model.AccountName = "Test";
            model.Reference = "test";
            model.Amount = 40m;

            var results = ValidateModel(model);

            results.Count.ShouldBe(1);
            results.First().ErrorMessage.ShouldBe("Please enter BSB Number.");
            results.First().MemberNames.First().ShouldBe(nameof(RegisterationInfo.BankStateBranchCode));
        }

        [Fact]
        public void ValidateModel_Given_BSB_HasInValid_ExpectBsbRequiredError()
        {
            var model = new RegisterationInfo
            {
                BankStateBranchCode = "12346",
                AccountNumber = "11112222",
                AccountName = "Test",
                Reference = "test",
                Amount = 40m
            };

            var results = ValidateModel(model);

            results.Count.ShouldBe(1);
            results.First().ErrorMessage.ShouldBe("The BSB number is invalid. Minimum 6 number is required.");
            results.First().MemberNames.First().ShouldBe(nameof(RegisterationInfo.BankStateBranchCode));
        }


        [Fact]
        public void ValidateModel_Given_AccountNo_IsNull_ExpectAccountNumberRequiredError()
        {
            var model = new RegisterationInfo
            {
                BankStateBranchCode = "123456",
                AccountName = "Test",
                Reference = "test",
                Amount = 40m
            };

            var results = ValidateModel(model);

            results.Count.ShouldBe(1);
            results.Last().ErrorMessage.ShouldBe("Please enter account number.");
            results.Last().MemberNames.First().ShouldBe(nameof(RegisterationInfo.AccountNumber));
        }

        [Fact]
        public void ValidateModel_Given_Account_HasInValid_ExpectAccountNumberInValidError()
        {
            var model = new RegisterationInfo
            {
                BankStateBranchCode = "123456",
                AccountNumber = "1111 222",
                AccountName = "Test",
                Reference = "test",
                Amount = 40m
            };

            var results = ValidateModel(model);

            results.Count.ShouldBe(1);
            results.First().ErrorMessage.ShouldBe("Please enter account number with invalid amount.");
            results.First().MemberNames.First().ShouldBe(nameof(RegisterationInfo.AccountNumber));
        }

        private IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }
    }

}
