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
                return BadRequest(paymentDto);
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
                return BadRequest(paymentId);
            }
        }

        [HttpPut("modifystatus")]
        public IActionResult ChangePaymentStatus(int paymentId, int paymentStatus)
        {
            return Ok();
        }

        [HttpDelete("deletepayment")]
        public IActionResult DeletePayment(int paymentId)
        {
            return Ok();
        }

    }
}
