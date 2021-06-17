using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Commons.Helpers;
using Models.DataSource.Entities;
using Models.Interfaces;
using Models.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DataSource.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _context;

        public MessageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
                .OrderByDescending(m => m.MessageSent)
                .AsQueryable();
            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username),
                "outbox" => query.Where(u => u.Sender.UserName == messageParams.Username),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username && u.DateRead == null)
            };

            var messages = query.Select(message => new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                SenderUsername = message.SenderUsername,
                SenderPhotoUrl = null,
                RecipientId = message.RecipientId,
                RecipientUsername = message.RecipientUsername,
                RecipientPhotoUrl = null,
                Content = message.Content,
                DateRead = message.DateRead,
                MessageSent = message.MessageSent
            });
            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);      
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThreat(string currentUsername, string recipientUsername)
        {
            var allMessages = await _context.Messages
                .Where(m => m.Recipient.UserName == currentUsername
                    && m.Sender.UserName == recipientUsername
                    || m.Recipient.UserName == recipientUsername
                    && m.Sender.UserName == currentUsername
                ).OrderBy(m => m.MessageSent)
                .ToListAsync();

            //var unreadMessages = allMessages
            //    .Where(m => m.DateRead == null
            //    && m.Recipient.UserName == currentUsername).AsEnumerable();


            //if (unreadMessages.Any())
            //{
            //    foreach (var message in unreadMessages)
            //    {
            //        message.DateRead = DateTime.Now;
            //    }
            //    await _context.SaveChangesAsync();
            //}
            var messages = allMessages.Select(message => new MessageDto
            {
                Id = message.Id,
                SenderId = message.SenderId,
                SenderUsername = message.SenderUsername,
                SenderPhotoUrl = null,
                RecipientId = message.RecipientId,
                RecipientUsername = message.RecipientUsername,
                RecipientPhotoUrl = null,
                Content = message.Content,
                DateRead = message.DateRead,
                MessageSent = message.MessageSent
            });
            return messages;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
