using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace RegisterationApp.Models
{
    public class RegisterationInfo
    {
        [Required(ErrorMessage = "Please enter BSB Number.")]
        [RegularExpression("^[0-9]{6}$", ErrorMessage = "The BSB number is invalid. Minimum 6 number is required.")]
        [JsonProperty("bsb")]
        public string BankStateBranchCode { get; set; }
        [Required(ErrorMessage = "Please enter account number.")]
        [RegularExpression("^[0-9]{8}$", ErrorMessage = "Please enter account number with invalid amount.")]
        [JsonProperty("accountNumber")]
        public string AccountNumber { get; set; }
        [Required(ErrorMessage = "Please enter the Account Name")]
        [JsonProperty("accountName")]
        public string AccountName { get; set; }

        [Required(ErrorMessage = "Please enter the Reference")]
        [JsonProperty("reference")]
        public string Reference { get; set; }
        [Required(ErrorMessage = "Please enter the Amount")]
        [JsonProperty("amount")]
        public decimal Amount { get; set; }
    }
}