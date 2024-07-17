//柱状图1模块
(function() {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 指定配置和数据
    var option = {
        color: ["#2f89cf"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true
        },
        xAxis: [{
            type: "category",
            data: [
                "4月15日",
                "5月1日",
                "5月15日",
                "6月1日",
                "6月15日",
                "7月1日",
                "7月15日"
            ],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12"
                }
            },
            axisLine: {
                show: false
            }
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                    // width: 1,
                    // type: "solid"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
            name: "Score",
            type: "bar",
            barWidth: "35%",
            data: [5319,6780,4218,5716,4090,7190,10251],
            itemStyle: {
                barBorderRadius: 5
            }
        }]
    };

    // 把配置给实例对象
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });

    // 数据变化
    var dataAll = [{
            year: "2019",
            data: [5319,6780,4218,5716,4090,7190,10251]
        },
        {
            year: "2020",
            data: [8721,5618,6230,4250,3780,4510,1040]
        }
    ];

    document.querySelector(".bar h2").addEventListener("click", function(e) {
        var i = e.target == this.children[0] ? 0 : 1;
        option.series[0].data = dataAll[i].data;
        myChart.setOption(option);
    });
})();

// 折线图定制
(function() {
    // 准备词云数据
    var list = [
        // 正面评价（绿色）
        ['Leadership', 25], ['Experience', 22], ['Charisma', 20],
        ['Visionary', 18], ['Competent', 17], ['Inspiring', 16],
        ['Diplomatic', 15], ['Innovative', 14], ['Resilient', 13],
        ['Integrity', 12], ['Patriotic', 11], ['Eloquent', 10],

        // 中立评价（黄色）
        ['Politician', 30], ['Candidate', 28], ['Campaigning', 26],
        ['Debates', 24], ['Policies', 22], ['Platform', 20],
        ['Elections', 18], ['Democracy', 16], ['Voting', 14],
        ['Presidency', 12], ['Government', 10], ['Constitution', 8],

        // 负面评价（蓝色）
        ['Controversial', 21], ['Divisive', 19], ['Polarizing', 17],
        ['Inexperienced', 15], ['Gaffe-prone', 13], ['Scandalous', 11],
        ['Unpredictable', 9], ['Populist', 7], ['Elitist', 5],
        ['Bureaucratic', 3], ['Outdated', 2], ['Untrustworthy', 1],

        // 特定于候选人的词语（黄色）
        ['Biden', 20], ['Trump', 20], ['Democrat', 15], ['Republican', 15],
        ['Progressive', 10], ['Conservative', 10], ['Moderate', 8],
        ['Leftist', 6], ['Rightist', 6], ['Centrist', 5],

        // 政策相关词语（黄色）
        ['Economy', 25], ['Healthcare', 23], ['Climate', 21],
        ['Immigration', 19], ['Education', 17], ['Foreign Policy', 15],
        ['Taxes', 13], ['Jobs', 11], ['Security', 9], ['Infrastructure', 7],

        // 选举过程相关词语（黄色）
        ['Primaries', 12], ['Swing States', 10], ['Electoral College', 8],
        ['Fundraising', 6], ['Polls', 4], ['Voter Turnout', 2]
    ];

    // 配置选项
    var options = {
        list: list,
        gridSize: 8,
        weightFactor: 1,
        fontFamily: 'Arial, sans-serif',
        color: function(word, weight) {
            // 根据词语的情感色彩设置颜色
            var positiveWords = ['Leadership', 'Experience', 'Charisma', 'Visionary', 'Competent', 'Inspiring', 'Diplomatic', 'Innovative', 'Resilient', 'Integrity', 'Patriotic', 'Eloquent'];
            var negativeWords = ['Controversial', 'Divisive', 'Polarizing', 'Inexperienced', 'Gaffe-prone', 'Scandalous', 'Unpredictable', 'Populist', 'Elitist', 'Bureaucratic', 'Outdated', 'Untrustworthy'];
            
            if (positiveWords.includes(word)) {
                return '#008000'; // 绿色
            } else if (negativeWords.includes(word)) {
                return '#F57474'; // 红色
            } else {
                return '#fffbf0'; // 白色
            }
        },
        backgroundColor: 'transparent',
        rotateRatio: 0.5,
        rotationSteps: 2,
        shape: 'circle'
    };

    // 初始化词云
    WordCloud(document.querySelector(".line .chart"), options);

    // 响应窗口大小变化
    window.addEventListener("resize", function() {
        WordCloud(document.querySelector(".line .chart"), options);
    });
})();

// 饼形图定制
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".pie .chart"));

    option = {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: function(p) {
                //其中p为当前鼠标的位置
                return [p[0] + 10, p[1] - 10];
            }
        },
        legend: {
            top: "90%",
            itemWidth: 10,
            itemHeight: 10,
            data: ["Michigan", "Wisconsin", "Pennsylvania", "Nevada", "Georgia"],
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [{
            name: "Importance",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab",
                "#06b4ab",
                "#06c8ab",
                "#06dcab",
                "#06f0ab"
            ],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            data: [{
                    value: 1,
                    name: "Michigan"
                },
                {
                    value: 4,
                    name: "Wisconsin"
                },
                {
                    value: 2,
                    name: "Pennsylvania"
                },
                {
                    value: 2,
                    name: "Nevada"
                },
                {
                    value: 1,
                    name: "Georgia"
                }
            ]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();
// 柱状图2模块
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".bar1 .chart"));

    var data = [251, 226, 235, 303];
    var titlename = ["2024 results", "2024 results", "2020 results", "2020 results"];
    var valdata = ["T", "B", "T", "B"];
    var myColor = ["#F57474", "#1089E7", "#F57474", "#1089E7"];
    option = {
        //图标位置
        grid: {
            top: "10%",
            left: "22%",
            bottom: "10%"
        },
        xAxis: {
            show: false
        },
        yAxis: [{
                show: true,
                data: titlename,
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#fff",

                    rich: {
                        lg: {
                            backgroundColor: "#339911",
                            color: "#fff",
                            borderRadius: 15,
                            // padding: 5,
                            align: "center",
                            width: 15,
                            height: 15
                        }
                    }
                }
            },
            {
                show: true,
                inverse: true,
                data: valdata,
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#fff"
                    }
                }
            }
        ],
        series: [
            {
                name: "条",
                type: "bar",
                yAxisIndex: 0,
                data: data,
                barCategoryGap: 50,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num];
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: "inside",
                        formatter: "{c}",
                        color: "#fff"
                    }
                }
            },
            {
                name: "框",
                type: "bar",
                yAxisIndex: 1,
                barCategoryGap: 50,
                data: [100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 0,
                        barBorderRadius: 15
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();
// 折线图
(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line1 .chart"));

    option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    color: "#dddc6b"
                }
            }
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },

        xAxis: [{
                type: "category",
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)"
                    }
                },

                data: [
                    "5.17",
                    "5.19",
                    "5.23",
                    "5.25",
                    "5.27",
                    "5.29",
                    "5.31",
                    "6.2",
                    "6.4",
                    "6.6",
                    "6.8",
                    "6.10",
                    "6.12",
                    "6.14",
                    "6.16",
                    "6.18",
                    "6.20",
                    "6.22",
                    "6.24",
                    "6.26",
                    "6.28",
                    "6.30",
                    "7.2",
                    "7.4",
                    "7.6",
                    "7.12",
                    "7.14",
                    "7.15",
                    "7.16"
                ]
            },
            {
                axisPointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                position: "bottom",
                offset: 20
            }
        ],

        yAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },

            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
                name: "Trump",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#0184d5",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(1, 132, 213, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#0184d5",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                },
                data: [
                    52,
                    55,
                    60,
                    61,
                    60,
                    58,
                    57,
                    60,
                    55,
                    60,
                    61,
                    59,
                    55,
                    62,
                    62,
                    60,
                    60,
                    56,
                    55,
                    57,
                    60,
                    62,
                    62,
                    59,
                    58,
                    55,
                    71,
                    72,
                    73,
                    75
                ]
            },
            {
                name: "Biden",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#00d887",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                },
                data: [
                    48,
                    45,
                    40,
                    39,
                    38,
                    42,
                    43,
                    39,
                    37,
                    35,
                    32,
                    37,
                    36,
                    32,
                    34,
                    45,
                    44,
                    40,
                    42,
                    43,
                    43,
                    46,
                    40,
                    39,
                    40,
                    45,
                    37,
                    27,
                    27,
                    25
                ]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

// 点位分布统计模块
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie1  .chart"));
    // 2. 指定配置项和数据
    var option = {
        legend: {
            top: "90%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色写的位置
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [{
            name: "点位统计",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["10%", "70%"],
            center: ["50%", "42%"],
            roseType: "radius",
            data: [{
                    value: 20,
                    name: "Pennsylvania"
                },
                {
                    value: 26,
                    name: "Wisconsin"
                },
                {
                    value: 24,
                    name: "Michigan"
                },
                {
                    value: 25,
                    name: "Arizona"
                },
                {
                    value: 20,
                    name: "Georgia"
                },
                {
                    value: 25,
                    name: "Florida"
                },
                {
                    value: 30,
                    name: "Texas"
                },
                {
                    value: 42,
                    name: "Nevada"
                }
            ],
            // 修饰饼形图文字相关的样式 label对象
            label: {
                fontSize: 10
            },
            // 修饰引导线样式
            labelLine: {
                // 连接到图形的线长度
                length: 10,
                // 连接到文字的线长度
                length2: 10
            }
        }]
    };

    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();