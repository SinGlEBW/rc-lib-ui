
import { useRequestSocketApi, UseRequestSocketOptions, createRequestSocketApi, BasePayloadSocket } from "rc-lib-ui/socket";




// Типы для преобразования имен функций в имена хуков
type HookName<T extends string> = `use${Capitalize<T>}`;

type HookDictionary<T extends Record<string, any>> = {
  [K in keyof T as HookName<string & K>]: T[K] extends {
    payload: infer Payload extends BasePayloadSocket;
    response: infer Response extends BasePayloadSocket;
  } ? (
    payload: Payload,
    options: UseRequestSocketOptions<Response>
  ) => ReturnType<typeof createRequestSocketApi<Payload,Response>>
  : never;
};

// Вспомогательная функция для создания типизированных методов
function createApiMethod<Payload extends BasePayloadSocket, Response extends BasePayloadSocket>(
  handler: (data: Response) => void
) {
  return {
    handler,
    payload: {} as Payload,
    response: {} as Response
  };
}

// Основная функция-конвертер
const getnerator = <T extends Record<string, any>>(
  list: T
): HookDictionary<T> => {
  const hooks = {} as HookDictionary<T>;
  
  (Object.keys(list) as Array<keyof T>).forEach((key) => {
    const methodConfig = list[key];
    const hookName = `use${String(key).charAt(0).toUpperCase() + String(key).slice(1)}` as HookName<string & keyof T>;
    
    (hooks as any)[hookName] = (
      payload: typeof methodConfig.payload, 
      options?: UseRequestSocketOptions<typeof methodConfig.response>
    ) => {
      const _options: UseRequestSocketOptions<typeof methodConfig.response> = {
        ...options,
        onSuccess: (data: typeof methodConfig.response) => {
          methodConfig.handler(data);
          options?.onSuccess?.(data);
        }
      };
      
      return createRequestSocketApi<typeof methodConfig.payload, typeof methodConfig.response>(payload, _options);
    };
  });

  return hooks
};



// // Типы для конкретных действий
// interface GetChatListPayload extends BasePayloadSocket {

//   limit?: number;
//   offset?: number;
//   filter?: 'all' | 'unread' | 'archived';
// }

// interface GetMessagePayload extends BasePayloadSocket {
//   chatId: string;
//   messageId?: string;
//   limit?: number;
// }

// // Типы для ответов
// interface ChatListResponse extends BasePayloadSocket {
//   chats: Array<{
//     id: string;
//     name: string;
//     unreadCount: number;
//     lastMessage?: string;
//   }>;
//   total: number;
// }

// interface MessageResponse extends BasePayloadSocket {
//   messages: Array<{
//     id: string;
//     content: string;
//     timestamp: Date;
//     sender: string;
//   }>;
// }

// // Пример использования
// const apiMethods = {
//   getChatList: createApiMethod<GetChatListPayload, ChatListResponse>(
//     (data) => {
//       console.log('Saving chat list to DB:', data.chats);
//     },
//   ),
//   getMessage: createApiMethod<GetMessagePayload, MessageResponse>(
//     (data) => {
//       console.log('Saving message to DB:', data.messages);
//     }
//   ),
// };

// const { useGetChatList, useGetMessage } = converter(apiMethods);






// // Использование в UI компонентах
// const ChatComponent = () => {
//   // ✅ Полная типизация!
//   const { data, isLoading, error } = useGetChatList(
//     { 
//       action: 'accepted',
     
//     }, 
//     { 
//       onSuccess: (data) => {//ТУТ ВСЁ ВЕРНО ChatListResponse
//         // ✅ data типизирован как ChatListResponse
//         console.log(data.chats);
//         console.log(data.total);
//       } 
//     }
//   );

//   // ✅ (data имеет тип ChatListResponse | null).  НЕТ, ТУТ ПОКАЗЫВАЕТ BasePayloadSocket | null
//   if (data) {
//     data. //ВОТ ТУТ НЕ ИМЕЕТ ТИП ChatListResponse. ПОКАЗЫВАЕТ ТИП BasePayloadSocket

//   }

//   const { data: messageData, refetch } = useGetMessage(
//     { 
//       action: 'all',
//       chatId: 'asd'
//     },
//     {
//       onSuccess: (data) => {
//         // ✅ data типизирован как MessageResponse
//         console.log(data.messages[0].content);
//       }
//     }
//   );

//   // ✅ messageData имеет тип MessageResponse | null
//   if (messageData) {
//     console.log(messageData.messages); // ✅ Автодополнение работает
//     console.log(messageData.action); // ✅ Автодополнение работает
//   }


// };