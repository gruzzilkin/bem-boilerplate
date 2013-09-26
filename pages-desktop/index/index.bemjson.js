({
    block: 'b-page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '../common/_common.css', ie: false },
        { elem: 'js', url: '../common/_common.js' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'header',
            content: [
                'header content goes here'
            ]
        },
        {
            block: 'content',
            content: [
                'main content'
            ]
        },
        {
            block: 'footer',
            content: [
                'footer content goes here'
            ]
        }
    ]
})
