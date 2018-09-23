import { 
    FaCheck, 
    FaInfo, 
    FaTimes, 
    FaExclamation, 
    FaChevronDown, 
    FaChevronUp 
} from 'react-icons/fa';

const api = {
    url: 'http://my-json-server.typicode.com/pwiniarski1991/List_of_logs/logs'
};

export const dict = {
    success: FaCheck,
    info: FaInfo,
    fail: FaTimes,
    fatal: FaExclamation,
    asc: FaChevronDown,
    desc: FaChevronUp
};

export default api;