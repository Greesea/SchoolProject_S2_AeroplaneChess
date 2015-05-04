package utils;

import javax.servlet.http.Cookie;

/**
 * Created by tsaccp on 2015/4/30.
 */
public class CookieManager {
    Cookie[] cookies;

    public CookieManager(Cookie[] cookies) {
        this.cookies = cookies;
    }

    public String getCookieValue(String key) {
        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals(key)) {
                    return cookies[i].getValue();
                }
            }
        }
        return "";
    }

    public Cookie getCookie(String key) {
        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals(key)) {
                    return cookies[i];
                }
            }
        }
        return null;
    }
}
