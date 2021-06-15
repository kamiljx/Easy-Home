using Microsoft.AspNetCore.Mvc;
using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyHomeWebApp.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private IPaymentService paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            this.paymentService = paymentService;
        }

        public IEnumerable<Payment> GetPayments(int realEstateId)
        {
            IEnumerable<Payment> payments = paymentService.GetPayments(realEstateId);

            return payments;
        }

        [HttpPost("addpayment")]
        public IActionResult AddPayment([FromBody] PaymentDto paymentDto)
        {
            bool result = paymentService.AddPayment(paymentDto);

            if (result)
            {
                return Ok("Sucess");
            }
            else
            {
                return BadRequest("Couldn't add payment, ID: " + paymentDto);
            }
        }

        [HttpPut("pay")]
        public IActionResult Pay(int paymentId, int rentierId)
        {
            bool result = paymentService.RealizePayment(paymentId, rentierId);

            if (result)
            {
                return Ok("Success");
            }
            else
            {
                return BadRequest("Couldn't pay for this payment, ID: " + paymentId);
            }
        }

        [HttpPut("modifystatus")]
        public IActionResult ChangePaymentStatus(int paymentId, int paymentStatus)
        {
            bool result = paymentService.ModifyPaymentStatus(paymentId, paymentStatus);

            if (result)
            {
                return Ok("Success");
            }
            else
            {
                return BadRequest("Couldn't modify payment status, ID: " + paymentId);
            }
        }

        [HttpDelete("deletepayment")]
        public IActionResult DeletePayment(int paymentId)
        {
            bool result = paymentService.DeletePayment(paymentId);

            if (result)
            {
                return Ok("Success");
            }
            else
            {
                return BadRequest("Couldn't delete payment, ID: " + paymentId);
            }
        }

    }
}
