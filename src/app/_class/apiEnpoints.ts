export class ApiEnpoints {

    // public static BASE = 'http://localhost:8080/api';
    public static BASE = 'http://192.168.244.27:8080/api';

    public static LOGIN = ApiEnpoints.BASE + '/login';
    public static LOGOUT = ApiEnpoints.BASE + '/logout';
    public static REGISTER = ApiEnpoints.BASE + '/register';

    /* CHAT */

    public static CHAT_POST = ApiEnpoints.BASE + '/chat/message';
    public static CHAT_GET = ApiEnpoints.BASE + '/chat/{chatID}/messages';
    public static CHAT_GET_SERVER_TIME = ApiEnpoints.BASE + '/time';


    /* Catégories */
    public static GET_CATEGORIES = ApiEnpoints.BASE + '/categories';


    /* Courses */
    public static CREATE_COURSES = ApiEnpoints.BASE + '/course/create';
    public static GET_MY_COURSES = ApiEnpoints.BASE + '/courses/owned';
    public static GET_COURSE = ApiEnpoints.BASE + '/course';
    public static UPDATE_COURSE = ApiEnpoints.BASE + '/course/update';
    public static SEND_COURSE_PICTURE = ApiEnpoints.BASE + '/course/picture';
    public static GET_COURSES = ApiEnpoints.BASE + '/courses';
    public static GET_UPCOMING_COURSES = ApiEnpoints.BASE + '/courses/upcoming';



    /* User */
    public static GET_CURRENT_USER_INFOS = ApiEnpoints.BASE + '/user/edit';
    public static UPDATE_CURRENT_USER_INFOS = ApiEnpoints.BASE + '/user/update';
    public static GET_USER_PUBLIC_INFOS_BY_ID = ApiEnpoints.BASE + '/user/public';
}

