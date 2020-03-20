export class ApiEndpoints {

    // public static BASE = 'http://localhost:8080/api';
    // public static BASE = 'http://192.168.244.27:8080/api';
    public static BASE = 'http://rgz.ddns.net:8888/api';

    public static LOGIN = ApiEndpoints.BASE + '/login';
    public static LOGOUT = ApiEndpoints.BASE + '/logout';
    public static REGISTER = ApiEndpoints.BASE + '/register';

    /* CHAT */

    public static CHAT_POST = ApiEndpoints.BASE + '/chat/message';
    public static CHAT_GET = ApiEndpoints.BASE + '/chat/{chatID}/messages';
    public static CHAT_GET_SERVER_TIME = ApiEndpoints.BASE + '/time';


    /* Catégories */
    public static GET_CATEGORIES = ApiEndpoints.BASE + '/categories';

    /* Courses */
    public static CREATE_COURSES = ApiEndpoints.BASE + '/course/create';
    public static GET_MY_COURSES = ApiEndpoints.BASE + '/courses/owned';
    public static GET_SUBSCRIBED_COURSES = ApiEndpoints.BASE + '/courses/subscribed';
    public static GET_COURSE = ApiEndpoints.BASE + '/course';
    public static UPDATE_COURSE = ApiEndpoints.BASE + '/course/update';
    public static SEND_COURSE_PICTURE = ApiEndpoints.BASE + '/course/picture';
    public static GET_COURSES = ApiEndpoints.BASE + '/courses';
    public static GET_UPCOMING_COURSES = ApiEndpoints.BASE + '/courses/upcoming';

    public static GET_COURSES_BY_CATEGORY = ApiEndpoints.BASE + '/courses/category';

    public static GO_LIVE = ApiEndpoints.BASE + '/course/golive';
    public static END_LIVE = ApiEndpoints.BASE + '/course/endlive';


    /* User */
    public static GET_CURRENT_USER_INFOS = ApiEndpoints.BASE + '/user/edit';
    public static UPDATE_CURRENT_USER_INFOS = ApiEndpoints.BASE + '/user/update';
    public static GET_USER_PUBLIC_INFOS_BY_ID = ApiEndpoints.BASE + '/user/public';
    public static GET_USER_STREAM_URL = ApiEndpoints.BASE + '/user/streamurl';
    public static SUBSCRIBE_TO_COURSE = ApiEndpoints.BASE + '/course/{id}/subscribe';
    public static UNSUBSCRIBE_TO_COURSE = ApiEndpoints.BASE + '/course/{id}/unsubscribe';
    public static SEND_USER_PICTURE = ApiEndpoints.BASE + '/user/picture';
    public static CHANGE_PASSWORD = ApiEndpoints.BASE + '/user/updatepassword';

    /* Search */
    public static SEARCH = ApiEndpoints.BASE + '/courses/search';
}

