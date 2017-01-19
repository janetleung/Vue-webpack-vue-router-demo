<template>
    <div>
        <h2>2048小游戏</h2>
        <div class="container" >
            <ul id="list">
                <li :class="'number' + item" v-for="item in array">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "../../node_modules/vue/dist/vue.min.js";
    export default {
        data: function () {
            return {
                array: ["","","","","","","","","","","","","","","",""]
            }
        },
        mounted:function () {
            var self = this;
            window.addEventListener('keydown', function (e) {
                if (e.keyCode == 37) {
                    self.left();
                } else if (e.keyCode == 38) {
                    self.up();
                } else if (e.keyCode == 39) {
                    self.right();
                } else if (e.keyCode == 40) {
                    self.down();
                } else {
                    console.log("error");
                }
            });
        },
        methods:{
            setnumber:function () {
                var self = this;
                var listRandom = [];
                for (var i = 0; i <= 15; i++) {
                    listRandom.push(i);
                }
                var num1 = parseInt(16 * Math.random());
                listRandom.splice(num1, 1);
                var num2 = listRandom[parseInt(15 * Math.random())];
                Vue.set(self.array, num1 , 2);
                Vue.set(self.array, num2 , 2);
            },
            addnum:function () {
                var self = this;
                var num = parseInt(16*Math.random());
                if (self.array.indexOf("") < 0) {
                    return ;
                } else if (!self.array[num]) {
                    Vue.set(self.array, num , 2);
                } else {
                    self.addnum();
                }
            },
            logic:function (arr) {
                var self = this;
                var isMove = false;
                for (var j = 0; j < 4; j++) {
                    for (var i = 0; i < 4; i++) {
                        if (!self.array[arr[j][i]] && i > 0) {
                            Vue.set(self.array, arr[j][i], self.array[arr[j][i-1]]);
                            Vue.set(self.array, arr[j][i-1], "");
                            isMove = true;
                        }
                    }
                    for (var i =0; i < 4; i++) {
                        if (!self.array[arr[j][i]] && i > 0) {
                            Vue.set(self.array, arr[j][i], self.array[arr[j][i-1]]);
                            Vue.set(self.array, arr[j][i-1], "");
                            isMove = true;
                        }
                    }
                    for (var i = 3; i >= 0; i--) {
                        if (self.array[arr[j][i]] && self.array[arr[j][i]] == self.array[arr[j][i-1]]) {
                            Vue.set(self.array, arr[j][i], self.array[arr[j][i]] + self.array[arr[j][i-1]]);
                            Vue.set(self.array, arr[j][i-1], "");
                            isMove = true;
                        }
                    }
                    for (var i =0; i < 4; i++) {
                        if (!self.array[arr[j][i]] && i > 0) {
                            Vue.set(self.array, arr[j][i], self.array[arr[j][i-1]]);
                            Vue.set(self.array, arr[j][i-1], "");
                            isMove = true;
                        }
                    }

                }
                var isGameOver = self.check();
                if (isGameOver == 'over') {
                    alert('抱歉失败了噢~');
                } else if (isGameOver == 'success') {
                    alert('恭喜成功啦！');
                } else if (isMove == true) {
                    self.addnum();
                }
            },
            check:function () {
                var self = this;
                if (self.array.indexOf(2048) >= 0) {
                    return 'success';
                } else if (self.array.indexOf("") < 0) {
                    for (var i = 0; i < 16; i++) {
                        var top = i - 4,
                            right = i + 1,
                            bottom = i + 4,
                            left = i - 1;
                        if ((top >= 0 && self.array[top] == self.array[i]) ||
                        (left >= 0 && self.array[left] == self.array[i] && i % 4 != 0) ||
                        (bottom <= 15 && self.array[bottom] == self.array[i]) ||
                        (right <= 15 && self.array[right] == self.array[i] && i % 3 != 0 )) {
                            return 'continue';
                        }
                    }
                    return 'over';
                }
            },
            down:function () {
                var self = this;
                var arr = [
                    [0,4,8,12],
                    [1,5,9,13],
                    [2,6,10,14],
                    [3,7,11,15]
                ];
                self.logic(arr);
            },
            up:function () {
                var self = this;
                var arr = [
                    [12,8,4,0],
                    [13,9,5,1],
                    [14,10,6,2],
                    [15,11,7,3]
                ];
                self.logic(arr);
            },
            right:function () {
                var self = this;
                var arr = [
                    [0,1,2,3],
                    [4,5,6,7],
                    [8,9,10,11],
                    [12,13,14,15]
                ];
                self.logic(arr);
            },
            left:function () {
                var self = this;
                var arr = [
                    [3,2,1,0],
                    [7,6,5,4],
                    [11,10,9,8],
                    [15,14,13,12]
                ];
                self.logic(arr);
            },
        },
        created:function () {
            var self = this;
            self.setnumber();
            console.log("初始化");

        },
    }
</script>
