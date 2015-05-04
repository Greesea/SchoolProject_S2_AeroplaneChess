<%@ page import="utils.AjaxOutput" %>
<%@ page import="utils.AjaxOutputType" %>
<%@ page import="dao.CommentDao" %>
<%@ page import="dao.CommentDaoImpl" %>
<%@ page import="entity.Comment" %>
<%@ page import="java.text.MessageFormat" %>
<%--
  Created by IntelliJ IDEA.
  User: Drake
  Date: 2015/5/4
  Time: 13:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    AjaxOutput output = new AjaxOutput(pageContext.getOut());
    if (request.getParameterMap().isEmpty() || !request.getParameterMap().containsKey("request")) {
        output.send(AjaxOutputType.ParameterNotFound, "");
    } else {
        String reqType = request.getParameter("request");
        if (reqType.equals("get")) {
            if (!request.getParameterMap().containsKey("page")) {
                output.send(AjaxOutputType.ParameterNotFound, "");
            } else {
                CommentDao cd = new CommentDaoImpl();
                Comment[] arr = cd.getComments_desc(Integer.parseInt(request.getParameter("page")));
                String format = "<div class=\"metro-comment-block\">\n" +
                        "<div class=\"metro-comment-info\">#{0} {1} 发表于 {2}</div>\n" +
                        "<div class=\"metro-comment-content\">{3}</div>\n" +
                        "</div>";
                String msg = "";
                for (Comment c : arr) {
                    msg += MessageFormat.format(format, c.getId(), c.getPoster(), c.getDate(), c.getContent());
                }

                output.send(AjaxOutputType.Success, msg);
            }
        } else if (reqType.equals("pagemax")) {
            CommentDao cd = new CommentDaoImpl();
            output.send(AjaxOutputType.Success, String.valueOf(cd.getPageCount()));
        }
    }
%>