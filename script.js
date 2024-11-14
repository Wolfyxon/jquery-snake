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
        addSegment();
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

        elm.getPos = () => {
            return [thisX, thisY];
        }

        if(last) {
            const lastPos = last.getPos();
            direction = last.getDirection();
            
            elm.moveTo(
                lastPos[0] - direction[0], 
                lastPos[1] - direction[1]
            );
            
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

    const updateTime = 100;
    const speed = 1;
    
    function loop() {
        if(segments.length == 0) return;
        
        for(let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            const prev = segments[i - 1];

            setTimeout(() => {
                const dir = seg.getDirection();
                seg.move(dir[0] * speed, dir[1] * speed);

                if(prev) {
                    seg.setDirection(prev.getDirection());
                }

            }, updateTime * i);
        }

        setTimeout(loop, updateTime);
    }

    reset();
    loop();
});