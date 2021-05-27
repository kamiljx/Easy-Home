using DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public class PaymentService : IPaymentService
    {
        private IUnitOfWork unitOfWork;
        public PaymentService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public bool AddPayment(PaymentDto paymentDto)
        {
            bool result = false;

            try
            {
                Payment newPayment = new Payment
                {
                    Name = paymentDto.Name,
                    ReceiverBankAccount = paymentDto.ReceiverBankAccount,
                    Amount = paymentDto.Amount,
                    Description = paymentDto.Description,
                    CreatedAt = paymentDto.CreatedAt,
                    PaymentDeadline = paymentDto.PaymentDeadline,
                    PayedAt = paymentDto.PayedAt,
                    Status = (Models.Enums.PaymentStatus)paymentDto.PaymentStatus
                };

                unitOfWork.PaymentRepository.AddPaymentToRealEstate(newPayment);
            }
            catch (Exception)
            {
                unitOfWork.Rollback();

                throw;
            }

            unitOfWork.Commit();

            return result;
        }
    }
}
