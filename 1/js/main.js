(function() {
    const BG_ROW_COUNT = 6;
    const ROW_COUNT = 1;
    const COL_COUNT = 4;

    const NEWS_ROW = 2;
    const SPORTS_ROW = 3;
    const ENTERTAINMENT_ROW = 6;
    const EXTENDED_COL_COUNT = 4;

    let state = {
        screen: 'home',
        index: {row: 0, col: 0},
        browser_index: 0,
        news_index: 0,
        sports_index: 0,
        entertainment_index: 0,
    };

    let move = direction => {
        switch (direction) {
        case 'up':
            if (state.screen != 'browser') {
                break;
            }
            if (state.index.row > 0) {
                state.index.row -= 1;
            } else if (state.browser_index > 0) {
                state.browser_index -= 1;
            }
            break;
        case 'left':
            if (state.screen != 'browser') {
                break;
            }
            if (state.index.col > 0) {
                state.index.col -= 1;
            } else if ((state.browser_index + state.index.row == NEWS_ROW) &&
                state.news_index > 0) {
                state.news_index -= 1;
            } else if ((state.browser_index + state.index.row == SPORTS_ROW) &&
                state.sports_index > 0) {
                state.sports_index -= 1;
            } else if ((state.browser_index + state.index.row == ENTERTAINMENT_ROW) &&
                state.entertainment_index > 0) {
                state.entertainment_index -= 1;
            }
            break;
        case 'right':
            if (state.screen != 'browser') {
                break;
            }
            if (state.index.col < COL_COUNT) {
                state.index.col += 1;
            } else if ((state.browser_index + state.index.row == NEWS_ROW) &&
                state.news_index < EXTENDED_COL_COUNT) {
                state.news_index += 1;
            } else if ((state.browser_index + state.index.row == SPORTS_ROW) &&
                state.sports_index < EXTENDED_COL_COUNT) {
                state.sports_index += 1;
            } else if ((state.browser_index + state.index.row == ENTERTAINMENT_ROW) &&
                state.entertainment_index < EXTENDED_COL_COUNT) {
                state.entertainment_index += 1;
            }
            break;
        case 'down':
            if (state.screen != 'browser') {
                break;
            }
            if (state.index.row < ROW_COUNT) {
                state.index.row += 1;
            } else if (state.browser_index < BG_ROW_COUNT) {
                state.browser_index += 1;
            }
            break;
        case 'select':
            if (state.screen == 'home') {
                state.screen = 'browser';
                $('.tv.browser')[0].style.opacity = 1;
            } else if (state.screen == 'browser' && state.browser_index == 6 &&
                state.index.col == 1 && state.index.row == 1) {
                state.screen = 'browser';
                $('.tv.food')[0].style.opacity = 1;
            }
            break;
        default:
            console.error(`Unknown direction!!! ${direction}`);
            break;
        }
        let style = $('.tv.browser')[0].style;
        style.setProperty('--carousel-column', state.index.col);
        style.setProperty('--carousel-row', state.index.row);
        style.setProperty('--browser-row', state.browser_index);

        style = $('#news')[0].style;
        style.setProperty('--index', state.news_index);
        style.setProperty('--left-opacity', state.news_index == 0? 0 : 1);
        style.setProperty('--right-opacity', state.news_index == EXTENDED_COL_COUNT? 0 : 1);

        style = $('#sports')[0].style;
        style.setProperty('--index', state.sports_index);
        style.setProperty('--left-opacity', state.sports_index == 0? 0 : 1);
        style.setProperty('--right-opacity', state.sports_index == EXTENDED_COL_COUNT? 0 : 1);

        style = $('#entertainment')[0].style;
        style.setProperty('--index', state.entertainment_index);
        style.setProperty('--left-opacity', state.entertainment_index == 0? 0 : 1);
        style.setProperty('--right-opacity', state.entertainment_index == EXTENDED_COL_COUNT? 0 : 1);

        // console.log(JSON.stringify(state));
    }

    $('.button').click(e => {
        move(e.target.id);
    });
    $(document).keydown(e => {
        if (!e.key.startsWith("Arrow") && e.key != 'Enter') {
            return;
        }
        let key = e.key.replace("Arrow", "").toLowerCase();
        if (key == 'enter') {
            key = 'select';
        }
        move(key);
    })
}());