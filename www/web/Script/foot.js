/**
 * Created by tsaccp on 2015/4/26.
 */
$(function () {
    $(".infoExpand-container").hover(function () {
        $(this).find(".infoExpand-aboutus").css("width", "240px").stop().fadeIn("fast");
    }, function () {
        $(this).find(".infoExpand-aboutus").stop().fadeOut("fast", function () {
            $(".infoExpand-container").css("width", "24px")
        });
    });
});