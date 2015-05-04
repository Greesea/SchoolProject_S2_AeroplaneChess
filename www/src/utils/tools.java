package utils;

/**
 * Created by tsaccp on 2015/4/30.
 */
public class tools {
    public static String getPageName(String uri) {
        String[] split = uri.split("/");
        if (split.length > 0) {
            return split[split.length - 1];
        }
        return null;
    }

    public static String blockHtml(String content) {
        String re = content;
        re = re.replaceAll("&", "&amp;");
        re = re.replaceAll("<", "&lt;");
        re = re.replaceAll(">", "&gt;");
        re = re.replaceAll(" ", "&nbsp;");
        re = re.replaceAll("\n", "<br/>");
        return re;
    }
}
