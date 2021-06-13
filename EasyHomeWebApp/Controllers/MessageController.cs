using Commons.Helpers;
using EasyHomeWebApp.Extensions;
using Microsoft.AspNetCore.Mvc;
using Models.DataSource.Entities;
using Models.DTOs;
using Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyHomeWebApp.Controllers
{
    public class MessageController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;

        public MessageController(IUserRepository userRepository, IMessageRepository messageRepository)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> createMessage(CreateMessageDto createMessageDto)
        {
            // var username = User.GetUsername();

            //if (username == createMessageDto.RecipentUsername.ToLower())
            //   return BadRequest("Nie możesz wysłać do siebie wiadomości.");
            var sender = await _userRepository.GerUserByUserNameAsync(createMessageDto.SenderUsername);
            var recipent = await _userRepository.GerUserByUserNameAsync(createMessageDto.RecipentUsername);

            if (recipent == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipent,
                SenderUsername = sender.UserName,
                RecipientUsername = recipent.UserName,
                Content = createMessageDto.Content
            };

            _messageRepository.AddMessage(message);

            var messageDto = new MessageDto
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
            };
            if (await _messageRepository.SaveAllAsync()) return Ok(messageDto);

            return BadRequest("Nie udało się wysłać wiadomości");
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams, string username)
        {
            var user = await _userRepository.GerUserByUserNameAsync(username);
            messageParams.Username = user.UserName;

            var messages = await _messageRepository.GetMessagesForUser(messageParams);

            return messages;
        }

        [HttpGet("thread/{currentuser}/{recipientusername}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string currentUser, string recipientUsername)
        {
            return Ok(await _messageRepository.GetMessageThreat(currentUser, recipientUsername));
        }

    }
}
