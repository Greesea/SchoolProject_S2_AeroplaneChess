package utils;

import org.json.simple.JSONObject;

import javax.servlet.jsp.JspWriter;
import java.io.IOException;

/**
 * Created by Drake on 2015/5/4.
 */
public class AjaxOutput {
    private JspWriter out;

    public AjaxOutput(JspWriter out) {
        this.out = out;
    }

    public void send(AjaxOutputType type, String message) {
        JSONObject obj = new JSONObject();
        switch (type) {
            case ParameterNotFound:
                obj.put("code", "0xe1");
                break;
            case OverLength:
                obj.put("code", "0xe2");
                break;
            case SqlError:
                obj.put("code", "0x3");
                break;
            case Success:
                obj.put("code", "0xff");
                break;
        }
        obj.put("msg", message);

        try {
            out.print(obj);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
