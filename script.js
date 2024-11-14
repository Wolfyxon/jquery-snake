const Direction = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
}

$(window).ready(() => {
    const arena = $("#arena");

    let dir = Direction.LEFT;
    let segments = [];

    function reset() {
        segments = [];
        addSegment();
    }

    function getHead() {
        return segments[0];
    }

    function getLast() {
        return segments[segments.length - 1];
    }

    function addSegment() {
        const elm = $("<div class='segment'></div>");
        const last = getLast();
        
        if(last) {
            // TODO: append tail
        } else {
            const cen = "50%";
            elm.css({left: cen, top: cen});
        }

        segments.push(elm);
        arena.append(elm);
    }

    reset();

    setInterval(() => {
        
    }, 500);
});