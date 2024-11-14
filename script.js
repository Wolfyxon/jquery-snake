const Direction = {
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP: [0, -1],
    DOWN: [0, 1]
}

const keyMap = {
    [Direction.UP]:    ["w", "ArrowUp"],
    [Direction.DOWN]:  ["s", "ArrowDown"],
    [Direction.LEFT]:  ["a", "ArrowLeft"],
    [Direction.RIGHT]: ["d", "ArrowRight"]
}

$(window).ready(() => {
    const arena = $("#arena");

    let direction = Direction.LEFT;
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
        
        let direction;
        let thisX = 0;
        let thisY = 0;

        elm.setDirection = (dir) => { 
            direction = dir; 
        }
        elm.getDirection = () => { 
            return direction; 
        }

        elm.moveTo = (x, y) => {
            thisX = x;
            thisY = y;

            elm.css({
                left: x + "%",
                top:  y + "%"
            });
        }

        elm.move = (x, y) => {
            elm.moveTo(thisX + x, thisY + y);
        }

        if(last) {
            // TODO: append at tail
            direction = last.getDirection();
        } else {
            elm.setDirection(Direction.RIGHT);
            elm.moveTo(50, 50);
        }

        segments.push(elm);
        arena.append(elm);
    }

    $(document).keydown((e) => {
        for(const dir of Object.keys(keyMap)) {
            const map = keyMap[dir];
            const parsedDir = JSON.parse(`[${dir}]`); // keys are always strings aaaaaa

            if(map.includes(e.key)) {
                getHead().setDirection(parsedDir);
                break;
            }
        }
    });

    const updateTime = 1000;
    const speed = 0.1;
    
    function loop() {
        if(segments.length == 0) return;
        
        for(let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            const next = segments[i + 1];

            setInterval(() => {
                const dir = seg.getDirection();
                seg.move(dir[0] * speed, dir[1] * speed);

                if(next) {
                    seg.setDirection(next.getDirection());
                }

            }, updateTime * i);
        }
        
        //setTimeout(loop, updateTime);
    }

    reset();
    loop();
});