export class ApiEnpoints {

    public static BASE = 'http://192.168.244.27:8080/api';

    public static LOGIN = ApiEnpoints.BASE + '/login';
    public static LOGOUT = ApiEnpoints.BASE + '/logout';
    public static REGISTER = ApiEnpoints.BASE + '/logout';

    /* CHAT */

    public static CHAT_POST = ApiEnpoints.BASE + '/chat/message';
    public static CHAT_GET = ApiEnpoints.BASE + '/chat/{chatID}/messages';
    public static CHAT_GET_SERVER_TIME = ApiEnpoints.BASE + '/time';


    /* Catégories */
    public static GET_CATEGORIES = ApiEnpoints.BASE + '/categories';


}
