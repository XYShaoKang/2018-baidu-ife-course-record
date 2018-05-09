var animation = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data/data.json'
})


var animations = [];

animations.push(bodymovin.loadAnimation({
    container: document.getElementById('tutor'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'data/tutor.json'
}))
animations.push(bodymovin.loadAnimation({
    container: document.getElementById('compass'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'data/compass.json'
}))
animations.push(bodymovin.loadAnimation({
    container: document.getElementById('example'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'data/example.json'
}))
animations.push(bodymovin.loadAnimation({
    container: document.getElementById('api'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'data/api.json'
}))
$.each($('.san-hover>div'), function (index, el) {
    $(el).hover(
        function () {
            animations[index].play();
        },
        function () {
            animations[index].stop();
        }
    )
})