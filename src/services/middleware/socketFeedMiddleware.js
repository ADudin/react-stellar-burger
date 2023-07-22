export const socketFeedMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
        wsSendMessage
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onOpen = () => {
          dispatch({ type: onOpen });
        };

        socket.onClose = () => {
          dispatch({ type: onClose });
        };

        socket.onError = () => {
          dispatch({ 
            type: onError, 
            payload: 'Error' 
          });
        };

        socket.onMessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ 
            type: onMessage,
            payload: parsedData
          });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};