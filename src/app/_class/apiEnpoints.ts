export class ApiEnpoints {

    public static BASE = 'http://localhost:8080/api';

    public static LOGIN = ApiEnpoints.BASE + '/login';
    public static LOGOUT = ApiEnpoints.BASE + '/logout';
    public static REGISTER = ApiEnpoints.BASE + '/register';

    /* CHAT */

    public static CHAT_POST = ApiEnpoints.BASE + '/chat/message';
    public static CHAT_GET = ApiEnpoints.BASE + '/chat/{chatID}/messages';
    public static CHAT_GET_SERVER_TIME = ApiEnpoints.BASE + '/time';


    /* Catégories */
    public static GET_CATEGORIES = ApiEnpoints.BASE + '/categories';


}
