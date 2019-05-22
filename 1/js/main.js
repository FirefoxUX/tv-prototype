(function() {
    const ROW_COUNT = 1;
    const COL_COUNT = 4;

    let state = {
        index: [0,0]
    };

    let move = direction => {
        switch (direction) {
        case 'up':
            if (state.index[1] > 0) {
                state.index[1] -= 1;
            }
            break;
        case 'left':
            if (state.index[0] > 0) {
                state.index[0] -= 1;
            }
            break;
        case 'right':
            if (state.index[0] < COL_COUNT) {
                state.index[0] += 1;
            }
            break;
        case 'down':
            if (state.index[1] < ROW_COUNT) {
                state.index[1] += 1;
            }
            break;

        default:
            console.error(`Unknown direction!!! ${direction}`);
            break;
        }
        let style = $('.tv')[0].style;
        style.setProperty('--carousel-column', state.index[0]);
        style.setProperty('--carousel-row', state.index[1]);
    }

    $('.button').click(e => {
        move(e.target.id);
    });
    $(document).keydown(e => {
        if (!e.key.startsWith("Arrow")) {
            return;
        }
        let key = e.key.replace("Arrow", "").toLowerCase();
        move(key);
    })

}());