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
        public IActionResult Pay(int paymentId, int rentierId)
        {
            return Ok();
        }

        public IActionResult PaymentStatus(int paymentId, int paymentStatus)
        {
            return Ok();
        }

        public IActionResult DeletePayment(int paymentId)
        {
            return Ok();
        }

    }
}
