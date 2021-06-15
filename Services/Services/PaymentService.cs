using DataSource;
using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using Models.Enums;
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

        public IEnumerable<Payment> GetPayments(int realEstateId)
        {
            IEnumerable<Payment> payments = unitOfWork.PaymentRepository.GetPaymentsForRealEstate(realEstateId);
            return payments;
        }

        public bool AddPayment(PaymentDto paymentDto)
        {
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
                    Status = (PaymentStatus)paymentDto.PaymentStatus
                };

                List<ApplicationUser> payers = new List<ApplicationUser>();
                foreach(var u in paymentDto.Payers)
                {
                    ApplicationUser user = unitOfWork.IdentityRepository.GetUserById(u);
                    payers.Add(user);
                }

                newPayment.Payers = payers;

                unitOfWork.PaymentRepository.AddPaymentToRealEstate(newPayment);
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            unitOfWork.Commit();

            return true;
        }

        public bool RealizePayment(int paymentId, int rentierId)
        {
            try
            {
                Payment payment = unitOfWork.PaymentRepository.GetPayment(paymentId);
                payment.Status = PaymentStatus.Paid;

                unitOfWork.PaymentRepository.ModifyPayment(payment);
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            unitOfWork.Commit();

            return true;
        }

        public bool ModifyPaymentStatus(int paymentId, int paymentStatus)
        {
            try
            {
                Payment payment = unitOfWork.PaymentRepository.GetPayment(paymentId);
                payment.Status = (PaymentStatus)paymentStatus;

                unitOfWork.PaymentRepository.ModifyPayment(payment);
            }
            catch(Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            unitOfWork.Commit();

            return true;
        }

        public bool DeletePayment(int paymentId)
        {
            try
            {
                unitOfWork.PaymentRepository.DeletePayment(paymentId);
            }
            catch (Exception)
            {
                unitOfWork.Rollback();
                throw;
            }
            unitOfWork.Commit();

            return true;
        }
    }
}
