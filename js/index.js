const apiurl = 'http://f.apiplus.net/ssq-20.json';
var vm = new Vue({
    el: '#app',
    data: {
        mode: 'djmode',
        name: '开始',
        hidden: true,
        interval: 0,
        red: 0,
        blue: 0,
        isclick: false,
        selectedRed: [
            { num: 1, flag: false },
            { num: 2, flag: false },
            { num: 3, flag: false },
            { num: 4, flag: false },
            { num: 5, flag: false },
            { num: 6, flag: false },
            { num: 7, flag: false },
            { num: 8, flag: false },
            { num: 9, flag: false },
            { num: 10, flag: false },
            { num: 11, flag: false },
            { num: 12, flag: false },
            { num: 13, flag: false },
            { num: 14, flag: false },
            { num: 15, flag: false },
            { num: 16, flag: false },
            { num: 17, flag: false },
            { num: 18, flag: false },
            { num: 19, flag: false },
            { num: 20, flag: false },
            { num: 21, flag: false },
            { num: 22, flag: false },
            { num: 23, flag: false },
            { num: 24, flag: false },
            { num: 25, flag: false },
            { num: 26, flag: false },
            { num: 27, flag: false },
            { num: 28, flag: false },
            { num: 29, flag: false },
            { num: 30, flag: false },
            { num: 31, flag: false },
            { num: 32, flag: false },
            { num: 33, flag: false }
        ],
        selectedBlue: [
            { num: 1, flag: false },
            { num: 2, flag: false },
            { num: 3, flag: false },
            { num: 4, flag: false },
            { num: 5, flag: false },
            { num: 6, flag: false },
            { num: 7, flag: false },
            { num: 8, flag: false },
            { num: 9, flag: false },
            { num: 10, flag: false },
            { num: 11, flag: false },
            { num: 12, flag: false },
            { num: 13, flag: false },
            { num: 14, flag: false },
            { num: 15, flag: false },
            { num: 16, flag: false }
        ]
    },
    created: function () {
        // 请求双色球数据
        // axios.get(apiurl)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });
    },
    computed: {
        btnName() {
            if (this.isclick == true && this.mode == 'htmode' && this.interval != 0) {
                this.name = '停止'
            } else {
                this.name = '开始';
            }
            return this.name;
        }
    },
    watch: {
        mode: function (nval, oval) {
            if (nval != oval) {
                this.isclick = false;
            }
            if (nval == 'sxmode') {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
            this.InitSeleted();
        }
    },
    methods: {
        Get2bitNum(num) {
            let strnum = num.toString();
            if (strnum.length === 1) {
                return '0' + strnum;
            }
            return strnum;
        },
        StartRandom() {
            this.isclick = true;
            if (this.mode == 'djmode') {
                this.DJMode();
            } else if (this.mode == 'htmode') {
                if (this.name == '开始') {
                    this.HTMode();
                } else {
                    clearInterval(this.interval);
                    this.interval = 0;
                }
            } else {
                return;
            }
        },
        GetRandom(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        InitSeleted() {
            this.selectedRed.forEach(element => {
                element.flag = false;
            })
            this.selectedBlue.forEach(element => {
                element.flag = false;
            })
        },
        DJMode() {
            this.InitSeleted(); // 清空选中项
            let redcount = 0;   // 有效红球数
            let bluecount = 0;  // 有效蓝球数
            // 红球处理
            while (redcount < 6) {
                let flag = true;
                let temp = this.GetRandom(1, 34);
                this.selectedRed.forEach(element => {
                    if (element.num == temp && element.flag == true) {
                        flag = false;
                        return;
                    }
                })
                if (flag === true) {
                    this.selectedRed[temp - 1].flag = true;
                    redcount++;
                }
            }
            // 蓝求处理
            while (bluecount < 1) {
                let flag = true;
                let temp = this.GetRandom(1, 17);
                this.selectedBlue.forEach(element => {
                    if (element.num == temp && element.flag == true) {
                        flag = false;
                        return;
                    }
                })
                if (flag === true) {
                    this.selectedBlue[temp - 1].flag = true;
                    bluecount++;
                }
            }
        },
        HTMode() {
            this.interval = setInterval(() => {
                this.DJMode()
            }, 100);
        },
        RedItemClick(item) {
            if (this.red == 6 && item.flag == false) {
                alert("红球数量不能超过6个！");
                return;
            }
            this.selectedRed.forEach(element => {
                if (element.num == item.num) {
                    element.flag = !element.flag;
                    if (element.flag) {
                        this.red++;
                    } else {
                        this.red--;
                    }
                }
            })
        },
        BlueItemClick(item) {
            if (this.blue == 1 && item.flag == false) {
                alert("蓝球数量不能超过1个！");
                return;
            }
            this.selectedBlue.forEach(element => {
                if (element.num == item.num) {
                    element.flag = !element.flag;
                    if (element.flag) {
                        this.blue++;
                    } else {
                        this.blue--;
                    }
                }
            })
        }
    }
})
