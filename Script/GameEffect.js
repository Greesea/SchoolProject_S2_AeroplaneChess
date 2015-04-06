/**
 * Created by Drake on 2015/4/6.
 */
function bindBtnEffect(btn, color) {
    btn
        .on("mousedown", function () {
            this.scale.set(this.scale.x - 0.03);
            drawBtnBorder(this, color, true);
        })
        .on("mouseup", function () {
            this.scale.set(this.scale.x + 0.03);
            drawBtnBorder(this, color, false);
        })
        .on("mouseover", function () {
            drawBtnBorder(this, color, false);
        })
        .on("mouseout", function () {
            this.border.clear();
        });
}

function drawBtnBorder(btn, color, isDown) {
    btn.border.clear();
    btn.border.lineStyle(2, color);
    if (isDown) {
        btn.border.drawRect(-90, -90, btn.width + 4, btn.height + 4);
    } else {
        btn.border.endFill();
        btn.border.drawRect(-90, -90, btn.width + 2, btn.height + 2);
    }
}