using Commons.Helpers;
using Models.DataSource.Entities;
using Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Models.Interfaces
{
    interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser();
        Task<IEnumerable<MessageDto>> GetMessageThreat(int currentUserId, int recipientId);
        Task<bool> SaveAllAsync();
    }
}
