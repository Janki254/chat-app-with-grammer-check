import ChatRoom from './components/ChatRoom/ChatRoom';

export type messageContent = {
    room: string;
    username: string;
    message: string;
    timestamp: number;
};
const App = () => {
    // const messages = useSelector((state: RootState) => state.chat.messages);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     socket.on(
    //         'messageResponse',
    //         (message: {content: string; timestamp: number; sender: string}) => {
    //             dispatch(receiveMessage(message));
    //         },
    //     );
    // }, [dispatch]);

    return (
        <>
            <ChatRoom />
        </>
    );
};

export default App;
