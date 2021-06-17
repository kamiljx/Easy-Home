using DataSource;
using Models.DataSource;
using Models.DataSource.Entities;
using Models.DTOs;
using Models.Enums;
using Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public IQueryable<Payment> GetPayments(int realEstateId)
        {
            IQueryable<Payment> payments = unitOfWork.PaymentRepository.GetPaymentsForRealEstate(realEstateId);
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
                    CreatedAt = DateTime.UtcNow,
                    PaymentDeadline = DateTime.UtcNow.AddMonths(1),
                    PayedAt = null,
                    Status = (PaymentStatus)paymentDto.PaymentStatus
                };

                List<ApplicationUser> payers = new List<ApplicationUser>();
                foreach (var u in paymentDto.Payers)
                {
                    ApplicationUser user = unitOfWork.IdentityRepository.GetUserById(u);
                    payers.Add(user);
                }
                newPayment.Payers = payers;

                RealEstate realEstate = unitOfWork.RealEstateRepository.GetRealEstateById(paymentDto.RealEstateId);
                newPayment.RealEstate = realEstate;

                unitOfWork.PaymentRepository.AddPaymentToRealEstate(newPayment);
            }
            catch (Exception e)
            {
                unitOfWork.Rollback();
                throw new Exception($"Exception message: {e.Message}. \n StackTrace: {e.StackTrace} \n Source: {e.Source}\n Inner Exception: {e.InnerException}");
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
                payment.PayedAt = new DateTime();
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
            catch (Exception)
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
