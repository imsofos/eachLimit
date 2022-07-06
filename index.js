const axios = require("axios");
const reqs = new Array(500).fill(1);
const shortid = require('shortid')
const limit = 10;
const delay = 100;


((reqs, limit, delay) => {
    console.time('interval');
    const map = {};
    reqs.forEach(req => map[req + shortid.generate()] = { status: 'pending', result: null });
    let interval = setInterval((map, limit) => {
        if (Object.keys(map).filter((key => map[key].status == 'pending' || map[key].status == 'working')).length == 0) { clearInterval(interval); console.timeEnd('interval') };
        const works = Object.keys(map).filter((key => map[key].status == 'pending')).slice(0, limit - Object.keys(map).filter((key => map[key].status == 'working')).length);
        for (let i = 0; i < works.length; i++) {
            map[works[i]].status = 'working';
            Promise.race([
                axios.get('https://www.varzesh3.com/'),
                new Promise((resolve, reject) => setTimeout(reject, 5000))
            ]).then((res) => { map[works[i]].status = 'fulfilled'; map[works[i]].result = res })
                .catch(err => { map[works[i]].status = 'rejected'; map[works[i]].result = err })
        }
    }, delay, map, limit);
})(reqs, limit, delay)
