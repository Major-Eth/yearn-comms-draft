---
layout: post
title:  "风险, 工具, & 洞察力 "
categories: [ Tweets ]
image:
  src: ./cover.jpg
  width: 1500
  height: 500
date: "2021-08-12"
author: Storm Blessed
translator: Xiaona, Bee926
published: true
---

original source: [twitter](https://twitter.com/storming0x/status/1436851219864059906)

##### 1
在做一些周末编码，并决定写篇关于[@iearnfinance](https://twitter.com/iearnfinance)幕后的风险、工具和洞察力的推文。

🧵 👇

##### 2
如果你还不知道 [yearn.finance](http://yearn.finance)，你可以把它理解为“收益函数协议”。Yearn的顶级产品是机枪池。将钱存入机枪池，第二天钱便会增多并不断增多。当然这是个极度简化的解释。

##### 3
这是由一群聪明的人实现的，他们为机枪池编写分配资金以赚取回报的策略。这些策略是需要部署和经常更新的智能合约。这些智能合约是灵活和动态的。资金分配示例:

![3_1436841383378120712](3_1436841383378120712.jpg?w=1200&h=663)

##### 4
鉴于Yearn协议的工作方式，它需要非常快速的周转以便于快速启动新合约和策略，这就会对安全性有影响。Yearn的最关注的问题之一是全方位的风险。我们正处于风险业务的排爆期。如何找到平衡呢?

##### 5
我们需要一个风险框架。图片所示，是当前部署的机枪池数量 + 策略数量。目前还没有针对这个系统复杂性的解决方案，多个部分需要落实到位才能完成这项工作。

![3_1436842206359285762](3_1436842206359285762.jpg?w=398&h=117)

##### 6
我过去的生活，有航空系统的背景。我认为可以从同样从事风险业务的航空业中吸取很多教训。金融的复杂性很高。预订下一次旅行航班时，您仍然不会三思而后行。

##### 7
每天都有数以百万计的航班，有不少航班发生了事故。并非每次事故都导致飞机坠毁。需要同时发生许多事件才能使飞机坠毁。这在目前的航空公司运营中可能性极低。

##### 8
但是每次航空流程和系统发生事故时，都需要改正并解决根本原因。我们在Yearn实施了类似的流程，每个作战室都不会导致资金损失，但需要我们从中学习和改进。

##### 9
在经历了一个非常糟糕的事故和作战室月之后，今年年初实施了这个流程。启动并实施了一些措施，以尽可能地在我们的日常决策中实现自动化并消除人为因素。

[twitter.com/storming0x/sta…](https://twitter.com/storming0x/status/1395452522840608768?s=20)

> ![storming0x](storming0x-881012267675820034.jpg?w=48&h=48)
> Storm Blessed 0x ([@storming0x](https://twitter.com/storming0x))

> 我们刚完成在作战室的16个小时解决一些在Yearn的状况。很累但很高兴可以于一个很棒的团队工作。

问题解决并没有失去任何资金。学了很多，这会让[@iearnfinance](https://twitter.com/iearnfinance)更棒。需要 😴

##### 10
当然这个仍然可以改进，并且是一个持续的过程，但在Yearn，那些杀不死我们的东西肯定会让我们变得更强大。让这个过程融入到Yearn的DNA中是我工作的一部分。

[github.com/yearn/yearn-de…](https://github.com/yearn/yearn-devdocs/blob/master/docs/developers/v2/EMERGENCY.md)

##### 11
我们有作战室，因代码出错、发生统计错误而导致问题的地方。
修复方法:
-我们添加了模拟机器人以在上链之前发现问题。
-如果仍不满足，则通过链上健康检查重置交易。

[github.com/yearn/yearn-de…](https://github.com/yearn/yearn-devdocs/blob/master/docs/developers/v2/DEPLOYMENT.md#health-checks)

##### 12
模拟机器人与我们的电报相关联，并提前向我们发送问题。我们最近有一个作战室，通过模拟被完全阻止了，该策略在无需更正链上任何内容的情况下就结束了。我们从纠正行为转向预防行为。

![3_1436848158034644993](3_1436848158034644993.jpg?w=652&h=780)

![3_1436848166805000195](3_1436848166805000195.jpg?w=984&h=748)

![3_1436848196399996929](3_1436848196399996929.jpg?w=1200&h=1000)

##### 13
[yearn.watch](http://yearn.watch)是我建立的跟踪策略和机枪池状态的网站。它使用了由Yearn团队内部构建的基础设施来获取数据。我们有专门的多呼叫合约，能够有效地获取这些数据以做出决策。

![3_1436848846378729473](3_1436848846378729473.jpg?w=1200&h=739)

![3_1436848859322273796](3_1436848859322273796.jpg?w=1200&h=767)

##### 14
我们还有一个风险仪表板，我们用它来对每个策略进行评分，以在任何时间点评估我们的风险。这是由我们的内部基础设施填充的，并根据链上的变化自动调整。
(以下为示例数据)

![3_1436849527198085126](3_1436849527198085126.jpg?w=1200&h=498)

![3_1436849597129715717](3_1436849597129715717.jpg?w=583&h=433)

![3_1436849615987351553](3_1436849615987351553.jpg?w=719&h=314)

##### 15
这是一个最近才添加的内部风险工具，因为我们正在调整我们的数据和模型，以尝试根据我们的内部流程得出一个客观的评分，所以公开还为时尚早。一旦我们收集了更多关于此的数据，我很乐意分享更多相关信息。

##### 16
我们离解决智能合约风险还很远，但我们唯一能做的就是不断尝试。我们希望这些幕后的观点可以帮助到生态中的其他项目，或者其他项目也可以提出让我们都可以从中受益的想法。

谢谢阅读!