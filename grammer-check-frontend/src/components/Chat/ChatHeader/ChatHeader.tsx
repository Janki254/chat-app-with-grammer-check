import styles from './ChatHeader.module.css';

interface propType {
    chatroomID: string;
}
const ChatHeader: React.FC<propType> = ({chatroomID}) => {
    return (
        <>
            <div className={styles.chat_header}>Live in {chatroomID}</div>
        </>
    );
};

export default ChatHeader;
