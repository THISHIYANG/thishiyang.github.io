---
title: "GAME DEV LOG 01 | 涌现与回忆 —— 未领取的过去"
slug: "k-3089-devlog-01"
series: "GAME DEV LOG"
sequence: 1
language: "zh"
edition: "original"
summary: "保留 TapTap DEV LOG 01 原文；一处源图片地址缺失，暂存草稿。"
author: "THISHI"
authorUrl: "https://www.taptap.cn/user/21100518"
sources: [{"id":"A","originalTitle":"GAME DEV LOG 01 | 涌现与回忆 —— 未领取的过去","url":"https://www.taptap.cn/moment/855555778927395880","publishedAt":"2026-10-03T13:13:13.000Z"}]
editedAt: "2026-10-23"
draft: true
mediaComplete: false
missingMedia: 1
toc: [{"id":"source-heading-0","title":"引言 | 维修员不会出现在第一现场"},{"id":"source-heading-1","title":"1. 故事的开始"},{"id":"source-heading-2","title":"2. 两颗坏掉的铆钉"},{"id":"source-heading-3","title":"3. 调查怎样从维修中涌现"},{"id":"source-heading-4","title":"4. 当解谜者成为谜题"},{"id":"source-heading-5","title":"5. 没有撒谎的叙述"},{"id":"source-heading-6","title":"6. 把涌现落实到玩家的动作里"},{"id":"source-heading-7","title":"7. 尾言｜当故事终于可以被触碰"},{"id":"source-heading-8","title":"References"}]
---

<div class="devlog-source-block" data-source-block="0"><blockquote><p><span class="devlog-source-emphasis">一件若干年前无人领取的设备，如何让调查从维修中涌现</span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="1"><p>大家好，我是<a href="https://www.taptap.cn/user/21100518">@THISHI</a>，可以叫我阿石，这次我和朋友Szu<a href="https://www.taptap.cn/user/587599621">@KFC</a> 组成了一个二人团队，我负责美术、策划、开发、记录和运营；Szu 负责剧情、文案、谜题设计，以及平面设计和音效相关的工作。</p></div>

<div class="devlog-source-block" data-source-block="2"><p>这是我第二次参加 Game Jam，经验还不多。我们本次的目标很朴素：做完一款我们自己也喜欢的游戏。</p></div>

<div class="devlog-source-block" data-source-block="3"><p>我们都喜欢研究和写作，也是解谜游戏的爱好者。看到这次的主题“涌现”后，我们开始思考：一次普通的行动，能不能让玩家逐渐发现问题，主动展开一场调查？</p></div>

<div class="devlog-source-block" data-source-block="4"><p>第一篇开发日志，就从这个故事的起点说起。我们想记录这几天的想法、讨论和尝试，也期待和大家交流。谢谢你愿意花时间读下去</p></div>

<div class="devlog-source-block" data-source-block="5"><h2 id="source-heading-0"><span class="devlog-source-emphasis">引言 | 维修员不会出现在第一现场</span></h2></div>

<div class="devlog-source-block" data-source-block="6"><p>在《她的回忆》中，一艘太空回收船收到求救信号。循着信号进入陌生飞船的船员，逐渐走进了一个由私人记忆构成的世界。</p></div>

<div class="devlog-source-block" data-source-block="7"><figure><a href="/media/devlogs/astra-nexus/A-1.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-1.png" width="828" height="524" loading="lazy" alt="她的回忆，1995年《回忆三部曲》第一篇" /></a></figure></div>

<div class="devlog-source-block" data-source-block="8"><p class="devlog-caption"><code>她的回忆，1995年《回忆三部曲》第一篇</code></p></div>

<div class="devlog-source-block" data-source-block="9"><p>这部由大友克洋原作、森本晃司执导、今敏编剧的动画电影，提供了一个很适合从旧物谈起的科幻问题：当一个人已经不在眼前，技术还能让他的过去留存多久？歌声、房间、仍在运转的机器，让回忆拥有了可以被后来者接触的形状。<span class="devlog-source-emphasis">有人只是前来处理一件工作，却意外走进了另一个人的人生。</span></p></div>

<div class="devlog-source-block" data-source-block="10"><figure><a href="/media/devlogs/astra-nexus/A-2.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-2.png" width="1419" height="810" loading="lazy" alt="GAME DEV LOG 01 | 涌现与回忆 —— 未领取的过去，正文图片 2" /></a></figure></div>

<div class="devlog-source-block" data-source-block="11"><p>这是我们看到“涌现”之后脑海里出现的诸多想法和画面。</p></div>

<div class="devlog-source-block" data-source-block="12"><blockquote><p><span class="devlog-source-emphasis">回忆会被封存，很久以后，一件物品被发现会意味着暗潮涌动，旧的回忆与真相即将浮现，没有一块碎片知道完整的故事，我们认为这种感觉很令人着迷。</span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="13"><p>是的，我们很开心可以在这个主题下大胆尝试制作#一款解谜游戏，这一直是我们想尝试但是因为各种顾虑未能开始的方向，那么就借由这次聚光灯的机会，我们想让故事从这里慢慢出现。</p></div>

<div class="devlog-source-block" data-source-block="14"><p><span class="devlog-source-emphasis">我们第一天讨论了很久，我们选择将“涌现”理解为一种关于“真相”的“过程”。</span></p></div>

<div class="devlog-source-block" data-source-block="15"><p>所有得到的信息必须互相作用，通过观察、追溯、质询和命题，逐渐让一个更高层次的结构从碎片之间涌现出来，真相并不存在于任何一条证据里，真相存在于它们之间。</p></div>

<div class="devlog-source-block" data-source-block="16"><h2 id="source-heading-1"><span class="devlog-source-emphasis">1. 故事的开始</span></h2></div>

<div class="devlog-source-block" data-source-block="17"><p>解谜游戏中的“机制”，可以被理解成一组等待玩家理解、试验并最终掌握的规则。</p></div>

<div class="devlog-source-block" data-source-block="18"><p>当我们想要设计一款解谜游戏时，似乎经常会遇到两个不同的出发点：一个是<strong>玩法机制</strong>，另一个是<strong>剧情叙事</strong>。有人先想到一个有趣的规则：“如果世界里的所有东西都可以被推动，会发生什么？”有人先想到一个事件：“如果一个家族所有的成员都已经死亡，后面的故事会怎么展开？” 不同开发者从不同的位置出发，再根据自己擅长的方式，让最初那个很模糊的想法慢慢长出形状，最终成为一种可以被玩家亲手操作、观察和理解的东西。</p></div>

<div class="devlog-source-block" data-source-block="19"><p>关于“机制”和“剧情”应该如何统一，解谜游戏的开发者似乎从来没有停止过探索。在这个浩瀚、甚至有些拥挤，却又不断出现惊喜的类型里，我们能够看到几乎纯粹由规则组成的机制解谜，也能够看到由人物、事件和空间推动的叙事探索。而在它们之间，还有一种我们一直很感兴趣的游戏：</p></div>

<div class="devlog-source-block" data-source-block="20"><p><span class="devlog-source-emphasis"><strong>调查游戏。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="21"><p>推理本身是一件很奇妙的事情。你知道 A。A 好像告诉了你一点东西，却又明显不够。你知道最终需要解释 C，于是开始意识到，中间似乎还缺少一个 B。你寻找它，把新的信息放回原来的结构中，然后突然发现：</p></div>

<div class="devlog-source-block" data-source-block="22"><p>A 和 B 放在一起以后，C 开始变得可以理解了。</p></div>

<div class="devlog-source-block" data-source-block="23"><p>这种“原本互不相关的东西突然连接起来”的瞬间，是推理最令人着迷的部分。一个恰到好处的谜题会让玩家产生一种非常直接的满足感：</p></div>

<div class="devlog-source-block" data-source-block="24"><p><strong>“这是我自己想出来的。”</strong></p></div>

<div class="devlog-source-block" data-source-block="25"><p>在主题的公布之后，我们重新思考了这个瞬间：线索各自只说明很小的一件事，经过玩家的观察、比较和追问，一种更完整的理解才开始出现。我们想把主题放进这段过程里。从记住一些事实到意识到它们之间的关系，玩家理解世界的方式，也会随着自己的行动发生变化。</p></div>

<div class="devlog-source-block" data-source-block="26"><p>但“恰到好处”往往也是最难的部分。调查天然包含很多可能显得枯燥的动作：查资料、翻档案、搜集证物、询问人物、整理时间、记住名字，再试图把大量碎片放进脑海里的同一张图中。信息太少，答案只是猜测。信息太多，玩家开始疲劳。引导太明显，玩家觉得游戏已经替自己完成了推理。引导太少，又可能在某个节点彻底失去方向。怎样让一个人愿意继续寻找下一块碎片，而不是觉得自己正在整理一份工作文档？这也许正是调查游戏最困难、同时也是最好玩的设计问题之一。</p></div>

<div class="devlog-source-block" data-source-block="27"><p>我们知道解谜游戏很难。但架不住我们真的很喜欢解谜游戏。所以还是开始了这次探索。对我们来说，创作一个故事，然后不直接把故事讲给玩家，而是把它拆散、藏进人物、物件、记录和矛盾之中，再看着另一个人一点一点把它重新拼起来——我们暂时想不到比解谜游戏更合适的形式。</p></div>

<div class="devlog-source-block" data-source-block="28"><p>最初的讨论发生的很自然，或许是因为老朋友的缘故，一切都很合拍，我们都喜欢复古未来主义，也都喜欢像素美术；比起大量即时操作，我们又更想尝试一种依赖文本、人物和信息推进的游戏，也对档案这类人文属性强的元素情有独钟。于是几个关键词很快被写了下来：</p></div>

<div class="devlog-source-block" data-source-block="29"><p><span class="devlog-source-emphasis"><strong>复古未来主义</strong></span><span class="devlog-source-emphasis">/</span><span class="devlog-source-emphasis"><strong>像素</strong></span><span class="devlog-source-emphasis">/</span><span class="devlog-source-emphasis"><strong>文本叙事/解谜</strong></span></p></div>

<div class="devlog-source-block" data-source-block="30"><p>这还远远不能称为一个游戏。甚至连故事都没有，然后<span class="devlog-source-emphasis">Szu</span>想了一个起点：</p></div>

<div class="devlog-source-block" data-source-block="31"><blockquote><p><span class="devlog-source-emphasis">一座空间站正在经历事故后的撤离和维修，年轻的维修员安德鲁斯基接到上级命令，需要去执行维修工作。</span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="32"><p><span class="devlog-source-emphasis">维修员通常不会出现在事件发生的第一现场。</span>恰恰相反，他们往往出现在<strong>事情已经发生以后</strong>。机器坏了，他们来到机器旁边。线路中断了，他们打开面板。一个空间已经被封闭很久，他们是后来重新进去的人。</p></div>

<div class="devlog-source-block" data-source-block="33"><p>他们面对的往往不是完整的事件，而是事件留下来的结果：烧坏的线路、失效的零件、被修改过的配置、无法启动的设备，以及那些“理论上本来不应该出现在这里”的东西。某种意义上，维修本身就很像调查。你看到一个结果。然后反过来问：</p></div>

<div class="devlog-source-block" data-source-block="34"><p><span class="devlog-source-emphasis"><strong>它为什么会变成这样？</strong></span></p></div>

<div class="devlog-source-block" data-source-block="35"><hr /></div>

<div class="devlog-source-block" data-source-block="36"><h2 id="source-heading-2"><span class="devlog-source-emphasis">2. 两颗坏掉的铆钉</span></h2></div>

<div class="devlog-source-block" data-source-block="37"><p>2014 年 5 月 6 日，美国亚利桑那州 Luke Air Force Base。</p></div>

<div class="devlog-source-block" data-source-block="38"><p>Senior Airman Jessica Reitano 是第 56 装备维修中队的一名飞机结构维修技术员。</p></div>

<div class="devlog-source-block" data-source-block="39"><p>那一天，她被叫去检查一架双座 F-16D。最初的问题似乎已经非常明确：飞机顶部附近有几颗铆钉发生断裂。任务听起来也很简单。</p></div>

<div class="devlog-source-block" data-source-block="40"><p>拆开侧壁。找到铆钉。更换它们。维修结束。</p></div>

<div class="devlog-source-block" data-source-block="41"><p>但当侧壁被拆开以后，Reitano 拿了一面镜子，试图寻找铆钉背面的位置。然后她在接缝后面看见了一道裂纹。真正的问题，并不是那几颗已经断掉的铆钉。</p></div>

<div class="devlog-source-block" data-source-block="42"><p>根据 Luke Air Force Base 当时发布的官方报道，这道此前从未被发现的裂纹关系到飞机极为关键的结构区域。发现被向上报告后，Luke 随即停飞当地的 F-16D 进行检查；基地后续的检查结果又推动了面向同型飞机的技术检查要求。[1]</p></div>

<div class="devlog-source-block" data-source-block="43"><p>Luke AFB 后来编纂的基地历史资料，也把 2014 年 5 月 6 日记录为 Reitano 首次发现 F-16 座舱附近 longeron 裂纹的日期。[2]</p></div>

<div class="devlog-source-block" data-source-block="44"><p>维修员没有真正变成侦探，她从头到尾都只是在做自己的工作。只是一个优秀的维修员面对故障时，很难满足于：<strong>“坏掉的东西就在这里。”</strong> 他们还会继续看一眼：<strong>“为什么偏偏是这里坏了？”</strong> 于是，一个已经有答案的问题，重新变成了一个问题。两颗断掉的铆钉，不再只是等待替换的零件。</p></div>

<div class="devlog-source-block" data-source-block="45"><p>它们变成了：<span class="devlog-source-emphasis"><strong>某件更大的事情留下来的痕迹。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="46"><figure><a href="/media/devlogs/astra-nexus/A-3.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-3.png" width="2467" height="1214" loading="lazy" alt="FAULT: SHEARED RIVETS
LUKE AFB / 2014
FINDING: STRUCTURAL CRACK
Senior Airman Jessica Reitano 使用 go/no-go gauge 检查液压管路接头，Luke Air Force Base，2014 年 7 月 25 日。摄影：Senior Airman Grace Lee / U.S. Air Force。
注：这是 Luke AFB 在报道 Reitano 发现 F-16D 结构裂纹时使用的官方工作照片，并非 5 月 6 日发现裂纹瞬间的现场影像。官方照片页面将该图标记为 Public Domain，并要求再发布时适当署名摄影者。[3]" /></a></figure></div>

<div class="devlog-source-block" data-source-block="47"><p class="devlog-caption"><code>FAULT: SHEARED RIVETS</code></p></div>

<div class="devlog-source-block" data-source-block="48"><p class="devlog-caption"><code>LUKE AFB / 2014</code><br /><code>FINDING: STRUCTURAL CRACK</code></p></div>

<div class="devlog-source-block" data-source-block="49"><p class="devlog-caption"><code>Senior Airman Jessica Reitano 使用 go/no-go gauge 检查液压管路接头，Luke Air Force Base，2014 年 7 月 25 日。摄影：Senior Airman Grace Lee / U.S. Air Force。</code></p></div>

<div class="devlog-source-block" data-source-block="50"><p class="devlog-caption"><code>注：这是 Luke AFB 在报道 Reitano 发现 F-16D 结构裂纹时使用的官方工作照片，并非 5 月 6 日发现裂纹瞬间的现场影像。官方照片页面将该图标记为 Public Domain，并要求再发布时适当署名摄影者。[3]</code></p></div>

<div class="devlog-source-block" data-source-block="51"><hr /></div>

<div class="devlog-source-block" data-source-block="52"><p>传统侦探来到一个地方，本来就是为了寻找异常。维修员不一样。他来到这里，是因为某个东西已经被认为只是：</p></div>

<div class="devlog-source-block" data-source-block="53"><p><strong>“坏了。”</strong></p></div>

<div class="devlog-source-block" data-source-block="54"><p>所以我们设定了一个<span class="devlog-source-emphasis">维修员的角色Andruski Taren（安德鲁斯基·塔伦）</span>，一个刚来到空间站不久的年轻人，对工作负责，态度认真，就像刚出大学的我们一样。</p></div>

<div class="devlog-source-block" data-source-block="55"><p>这台设备为什么还在这里？<br />它为什么会被烧毁？<br />为什么它一直没有被领取？<br />某个原本用于正常工作的结构，为什么变成了现在这个样子？</p></div>

<div class="devlog-source-block" data-source-block="56"><p>而当这些问题越来越无法通过“普通故障”解释的时候，维修也就一点一点变成了调查。生活里其实经常会出现类似的提示。一个刚睡醒的清晨，你收到一通电话，说有一个包裹正在等你领取。等待很久的预售产品终于到了，一台返修完成的电子设备可以取走了，一个烧制好的手工作品已经出窑。这些消息都有一种非常简单的含义：</p></div>

<div class="devlog-source-block" data-source-block="57"><p><span class="devlog-source-emphasis"><strong>某件东西已经准备好了。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="58"><p>接下来轮到你行动。当然，也总有一些东西没有被按时取走。错过的包裹。被忘记的快递。维修完成以后一直无人认领的设备。它们会在那里多等一天，两天，也许一个月。那如果不是一个月呢？ 如果一件东西已经等待了十七年呢？如果当初应该来领取它的人，早在十七年前就已经死了呢？</p></div>

<div class="devlog-source-block" data-source-block="59"><hr /></div>

<div class="devlog-source-block" data-source-block="60"><h2 id="source-heading-3"><span class="devlog-source-emphasis">3. 调查怎样从维修中涌现</span></h2></div>

<div class="devlog-source-block" data-source-block="61"><p>传统推理故事通常很快告诉你：发生案件了。有人死了。现在请调查。</p></div>

<div class="devlog-source-block" data-source-block="62"><p>但 Andruski Taren 并不是侦探。所以我们不希望他打开游戏时就得到一个任务：</p></div>

<div class="devlog-source-block" data-source-block="63"><blockquote><p>“重新调查十七年前 Opulos Cronus 死亡案。”</p></blockquote></div>

<div class="devlog-source-block" data-source-block="64"><p>那样所有事情都会立即被染上“寻找真相”的颜色。玩家知道什么重要。知道谁可疑。甚至知道自己应该期待一个反转。我们更喜欢另一种情况。</p></div>

<div class="devlog-source-block" data-source-block="65"><p>在现在的开场设计里，Andruski Taren（安德鲁斯基·塔伦）是工程部结构维护与舱外作业组的现场维修工程师。他先回到自己的日常，查看直属组长David Cho（大卫·赵）的工作安排，再去处理旧区域的恢复任务。他遇见K-3089时，眼前仍然是一件属于维修员的工作。</p></div>

<div class="devlog-source-block" data-source-block="66"><p>一台终端没有被领取。<br />它为什么还在工作？<br />为什么被烧坏？<br />数据还能不能恢复？</p></div>

<div class="devlog-source-block" data-source-block="67"><p>这是一份属于维修员的工作。只有当越来越多的信息无法被普通故障解释之后，一个“维修问题”才逐渐变成：</p></div>

<div class="devlog-source-block" data-source-block="68"><p><span class="devlog-source-emphasis"><strong>一个历史问题。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="69"><p>再逐渐变成：</p></div>

<div class="devlog-source-block" data-source-block="70"><p><span class="devlog-source-emphasis"><strong>一个人的问题。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="71"><p>最终才变成：</p></div>

<div class="devlog-source-block" data-source-block="72"><p><span class="devlog-source-emphasis"><strong>一个案件。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="73"><p>所以从结构上来说，我们和 Andruski Taren 应该几乎同时意识到：</p></div>

<div class="devlog-source-block" data-source-block="74"><blockquote><p>“等等，这好像不是一台坏掉的设备这么简单。”</p></blockquote></div>

<div class="devlog-source-block" data-source-block="75"><p>我们希望，继续调查的念头能在这些问题之间慢慢涌现。修好设备是最初的目标；等到设备能够回答一些问题，玩家也已经有了新的问题。走到这里，<span class="devlog-source-emphasis">继续追问才成为一个有来由的选择</span>。</p></div>

<div class="devlog-source-block" data-source-block="76"><hr /></div>

<div class="devlog-source-block" data-source-block="77"><h2 id="source-heading-4"><span class="devlog-source-emphasis">4. 当解谜者成为谜题</span></h2></div>

<div class="devlog-source-block" data-source-block="78"><p>一个怪物盘踞在通往忒拜的道路上，向旅人提出谜题：什么东西早晨用四条腿行走，中午用两条腿，晚上用三条腿？俄狄浦斯给出的答案是：</p></div>

<div class="devlog-source-block" data-source-block="79"><p>人。</p></div>

<div class="devlog-source-block" data-source-block="80"><p>他因此成为了那个<strong>能够解开谜题的人</strong>。</p></div>

<div class="devlog-source-block" data-source-block="81"><aside class="devlog-missing" role="note">导入注：原文此处的图片地址为空，待作者补充。原图注保留在下方。</aside></div>

<div class="devlog-source-block" data-source-block="82"><p class="devlog-caption"><code>Oedipus and the Sphinx</code><br /><code>Attic red-figure kylix, c. 470–460 BCE.</code></p></div>

<div class="devlog-source-block" data-source-block="83"><p>我们最初想到俄狄浦斯，是因为他解开了斯芬克斯的谜语；后来真正让我们在意的，是调查如何改变一个人对自己和过去的理解。</p></div>

<div class="devlog-source-block" data-source-block="84"><figure><a href="/media/devlogs/astra-nexus/A-5.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-5.png" width="497" height="684" loading="lazy" alt="剧照，约1869年，荷兰演员路易斯-布曼斯特饰演俄狄浦斯
阿尔贝特-格莱纳摄" /></a></figure></div>

<div class="devlog-source-block" data-source-block="85"><p class="devlog-caption"><code>剧照，约1869年，荷兰演员路易斯-布曼斯特饰演俄狄浦斯</code><br /><code>阿尔贝特-格莱纳摄</code></p></div>

<div class="devlog-source-block" data-source-block="86"><p>在索福克勒斯的《俄狄浦斯王》中，忒拜遭遇灾难。俄狄浦斯开始追查前任国王拉伊俄斯死亡的真相。</p></div>

<div class="devlog-source-block" data-source-block="87"><p>他询问证人。<br />寻找旧信息。<br />比较不同人的说法。<br />排除错误解释。</p></div>

<div class="devlog-source-block" data-source-block="88"><p>不断逼近一个自己一开始完全没有考虑过的可能性：</p></div>

<div class="devlog-source-block" data-source-block="89"><p><span class="devlog-source-emphasis"><strong>他正在调查的那个人，就是他自己。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="90"><p>亚里士多德后来在《诗学》中把《俄狄浦斯王》作为“<span class="devlog-source-emphasis">识认（anagnorisis）</span>”与“<span class="devlog-source-emphasis">逆转（peripeteia）</span>”的重要范例。他所谓的“识认”，并不只是发现一个隐藏身份，而是从无知进入知识；<span class="devlog-source-emphasis">而最有力量的识认，往往同时改变人物此前对整个事件的理解</span>。[4] [5]</p></div>

<div class="devlog-source-block" data-source-block="91"><p>甚至在讨论不同类型的“识认”时，亚里士多德认为，最好的识认并不是突然出现一个外部信物告诉你答案，而是<span class="devlog-source-emphasis"><strong>从事件本身自然生长出来的发现</strong></span>。他直接把《俄狄浦斯王》列为这样的例子。[4]</p></div>

<div class="devlog-source-block" data-source-block="92"><p>这件事对我们重新理解 K-3089 很重要。</p></div>

<div class="devlog-source-block" data-source-block="93"><p><span class="devlog-source-emphasis">一次发现可以改变人对整件事情的看法，也可能动摇他一直用来理解自己的方式</span>。</p></div>

<div class="devlog-source-block" data-source-block="94"><p>于是，调查逐渐碰到了另一个问题：</p></div>

<div class="devlog-source-block" data-source-block="95"><blockquote><p><span class="devlog-source-emphasis"><strong>当新的证据与自己一直相信的解释发生冲突时，一个人愿意走多远？</strong></span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="96"><p>这里暂时不展开 K-3089 的具体答案，我们更想保留玩家亲自经历那个转变的机会：先形成判断，再遇见无法安放的新信息，最后决定是否重新检查自己的判断。</p></div>

<div class="devlog-source-block" data-source-block="97"><p>意义会从线索之间涌现，偏见也可能从同样的地方长出来。一个解释足够顺畅的时候，人很容易把它当作已经发生过的事实。</p></div>

<div class="devlog-source-block" data-source-block="98"><p>这促使我们开始思考：</p></div>

<div class="devlog-source-block" data-source-block="99"><p><span class="devlog-source-emphasis">一个人是否可能足够聪明，能够发现世界里的问题，却很难把自己的立场也放进调查范围？</span></p></div>

<div class="devlog-source-block" data-source-block="100"><p>这让我们开始思考，调查带来的改变，究竟发生在哪里。新的证据会补上过去的空白，也可能让一个人重新理解自己早已知道的事情。对 K-3089 来说，我们尤其在意后者：当新的信息与一个人长期相信的解释发生冲突时，他是否愿意重新检查自己的判断？</p></div>

<div class="devlog-source-block" data-source-block="101"><p><span class="devlog-source-emphasis"><strong>推理能力并不能自动保护一个人免受自己的立场影响。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="102"><p>善于推理的人，也可能善于为自己的解释寻找支持。一个足够聪明的人，同样可能非常擅长替自己的解释寻找支持。我们希望人物的立场和记忆足够具体，让玩家在判断一句话之前，先看见说话的人。</p></div>

<div class="devlog-source-block" data-source-block="103"><p>他知道什么，又愿意说出什么？</p></div>

<div class="devlog-source-block" data-source-block="104"><p>一个人怎样理解自己的过去，会影响他今天留下的叙述。玩家需要在这些叙述之间寻找联系，也需要留意它们各自没有覆盖的部分。</p></div>

<div class="devlog-source-block" data-source-block="105"><p>我们也因此继续追问：</p></div>

<div class="devlog-source-block" data-source-block="106"><p><span class="devlog-source-emphasis"><strong>一个人如何讲述自己身处其中的故事。</strong></span></p></div>

<div class="devlog-source-block" data-source-block="107"><hr /></div>

<div class="devlog-source-block" data-source-block="108"><h2 id="source-heading-5"><span class="devlog-source-emphasis">5. 没有撒谎的叙述</span></h2></div>

<div class="devlog-source-block" data-source-block="109"><p>如果一个角色的证词不可靠，应该怎么写？</p></div>

<div class="devlog-source-block" data-source-block="110"><p>最直接的办法，是让他说假话：某件事情明明发生了，他却否认；随后玩家找到记录，推翻他的说法。这种结构当然有效，但我们也担心，如果所有证词都以这种方式出现，调查就会渐渐变成寻找哪一句是假话。</p></div>

<div class="devlog-source-block" data-source-block="111"><p>我们更感兴趣的是另一种情况：一个人说出的话可以是真的，但我们据此形成的整体理解，仍然可能出错。</p></div>

<div class="devlog-source-block" data-source-block="112"><p>这让我重新想到阿加莎·克里斯蒂的《罗杰疑案》。为了保留初读的体验，这里不展开它的具体手法。它带给我们的一个启发是，阅读时，我们会不断替叙述补上联系：</p></div>

<div class="devlog-source-block" data-source-block="113"><p><span class="devlog-source-emphasis">一句话明确说了什么，和我们以为它说了什么，未必完全相同。</span></p></div>

<div class="devlog-source-block" data-source-block="114"><figure><a href="/media/devlogs/astra-nexus/A-6.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-6.png" width="453" height="701" loading="lazy" alt="Agatha Christie Ltd. The Murder of Roger Ackroyd. 官方作品资料，初版于 1926 年。[6]" /></a></figure></div>

<div class="devlog-source-block" data-source-block="115"><p class="devlog-caption"><code>Agatha Christie Ltd. The Murder of Roger Ackroyd. 官方作品资料，初版于 1926 年。[6]</code></p></div>

<div class="devlog-source-block" data-source-block="116"><p>这个间隙，也让我们重新思考 K-3089 中的人物证词。</p></div>

<div class="devlog-source-block" data-source-block="117"><p>先举一个与游戏剧情无关的假设。</p></div>

<div class="devlog-source-block" data-source-block="118"><p>一名人物说：“事故发生时，我不在控制室。”我们找到另一份独立记录，确认他当时确实在别处。</p></div>

<div class="devlog-source-block" data-source-block="119"><p>到这里，我们知道了他在那个时间不在那个地点。但在阅读过程中，我们可能已经顺势替他说完了另一句话：“所以，这场事故与他无关。”</p></div>

<div class="devlog-source-block" data-source-block="120"><p><span class="devlog-source-emphasis">后一个判断，并不包含在前一句话里。</span></p></div>

<div class="devlog-source-block" data-source-block="121"><p>他是否提前做过什么，是否通过其他方式参与，仍然需要调查。同样，这些尚未排除的可能性，也不能反过来证明他负有责任。我们拥有的是一条关于位置的信息；它与事故责任之间，还缺少其他证据。</p></div>

<div class="devlog-source-block" data-source-block="122"><p>这里甚至不需要有一句假话。错误可能就发生在我们自行补上的那一步。</p></div>

<div class="devlog-source-block" data-source-block="123"><p>因此，我们希望玩家面对人物证词时，除了判断真假，还会再问一句：</p></div>

<div class="devlog-source-block" data-source-block="124"><blockquote><p><span class="devlog-source-emphasis">这句话真正能够证明到哪里？</span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="125"><p>这也影响了我们对人物的写法。我们希望先弄清楚，一个人当时能够看见什么、知道什么，以及他后来怎样理解那段经历。他可能有所隐瞒，也可能真诚地相信自己的解释；有些事情没有被说出来，只是因为在他的记忆里，它们从来不重要。</p></div>

<div class="devlog-source-block" data-source-block="126"><p>这些差别值得保留下来。否则，人物很容易只剩下提供正确线索或错误线索的功能。</p></div>

<div class="devlog-source-block" data-source-block="127"><p>玩家需要留意的，也就包括叙述本身：一个人为什么主动提起这件事？他是在描述亲眼所见，还是转述后来听到的说法？哪些联系由他说了出来，哪些又是我们自己补上的？</p></div>

<div class="devlog-source-block" data-source-block="128"><p>我们希望，玩家在一份记录、一次交谈和一件修复后的设备之间，逐渐形成自己的解释。随后出现的信息，也可能让他回头重新阅读一句早已看过的话。</p></div>

<div class="devlog-source-block" data-source-block="129"><p>那句话没有改变，改变的是它与其他线索的关系，以及我们理解它的方式。</p></div>

<div class="devlog-source-block" data-source-block="130"><p><span class="devlog-source-emphasis">我们想寻找的“涌现”，也发生在这里：</span>分散的信息开始产生联系，一个关于过去的解释逐渐成形。而调查还要继续，因为这个解释究竟能被证据支持到哪里，仍然需要玩家亲自检验。</p></div>

<div class="devlog-source-block" data-source-block="131"><hr /></div>

<div class="devlog-source-block" data-source-block="132"><h2 id="source-heading-6"><span class="devlog-source-emphasis">6. 把涌现落实到玩家的动作里</span></h2></div>

<div class="devlog-source-block" data-source-block="133"><p>如果这是游戏：</p></div>

<div class="devlog-source-block" data-source-block="134"><p>玩家能够亲手做什么？<br />哪些事情只能由角色说出来？<br />哪些信息应该存在于档案？<br />哪些东西能够被观察？<br />哪一些结论必须留给玩家自己？</p></div>

<div class="devlog-source-block" data-source-block="135"><p>我们最开始得到了一条非常粗糙的链条：</p></div>

<div class="devlog-source-block" data-source-block="136"><p><span class="devlog-source-emphasis"><strong>发现设备</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>检查 K-3089</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>查询订单</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>恢复铭文</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>寻找指定使用者</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>阅读事故记录</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>询问仍然活着的人</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>比较他们的说法</strong></span><br /><span class="devlog-source-emphasis">↓</span><br /><span class="devlog-source-emphasis"><strong>发现某些东西无法同时成立</strong></span></p></div>

<div class="devlog-source-block" data-source-block="137"><p>我们希望，一条记录单独出现时，只能回答一个局部问题；当它与另一份档案、一次维修和一个人的回忆放在一起时，玩家才开始看见新的联系。某份已经读过的材料，也可能因此有了不同的含义。我们想把‘涌现’放在这个过程中：玩家逐渐形成自己的解释，并在新的证据面前修正它。</p></div>

<div class="devlog-source-block" data-source-block="138"><p>这甚至还不能算玩法设计，但起码可以推进了，可以演变成：</p></div>

<div class="devlog-source-block" data-source-block="139"><p><strong>玩家可以执行的动作。</strong></p></div>

<div class="devlog-source-block" data-source-block="140"><p>故事开始获得交互性。接下来的难题，是让每次操作带来理解上的变化。查到一条记录以后，玩家为什么想去找某个人？修复一个部件以后，之前见过的文字会不会有了新的含义？我们需要研究：</p></div>

<div class="devlog-source-block" data-source-block="141"><blockquote><p><span class="devlog-source-emphasis"><strong>现实中的调查究竟是怎样从残缺的信息中建立结论的？</strong></span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="142"><p>以及更具体地：</p></div>

<div class="devlog-source-block" data-source-block="143"><blockquote><p><span class="devlog-source-emphasis"><strong>当一个复杂系统发生事故时，我们应该相信人，还是相信机器？</strong></span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="144"><p>在目前的设计里，玩家可以按不同顺序认识人物，但设备的维修依然有明确依赖。我们要处理好这些相遇：人物已经知道的事情不必重复介绍，设备已经完成的修复应当改变下一次交谈。让玩家感到，刚才的行动在这里留下了痕迹。</p></div>

<div class="devlog-source-block" data-source-block="145"><p>这些局部联系最终能否形成一段有说服力的调查体验，需要靠试玩回答。我们尤其想观察，玩家会在什么时候主动回看旧记录、在什么时候想再问一句，以及他给出的解释究竟能被已有信息支持到哪里。</p></div>

<div class="devlog-source-block" data-source-block="146"><hr /></div>

<div class="devlog-source-block" data-source-block="147"><h2 id="source-heading-7"><span class="devlog-source-emphasis">7. 尾言｜当故事终于可以被触碰</span></h2></div>

<div class="devlog-source-block" data-source-block="148"><p>写到这里的时候，《K-3089》的0.1基本已经搭起来，完整主线正在继续构建。第一次制作解谜游戏的我们还是觉得很开心，到现在这一步我们的想法已经彻底变成了完成它，能完成一个解谜游戏将是我们今年最有成就感的事情之一，这就足够了。</p></div>

<div class="devlog-source-block" data-source-block="149"><figure><a href="/media/devlogs/astra-nexus/A-7.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-7.png" width="949" height="544" loading="lazy" alt="GAME DEV LOG 01 | 涌现与回忆 —— 未领取的过去，正文图片 7" /></a></figure></div>

<div class="devlog-source-block" data-source-block="150"><figure><a href="/media/devlogs/astra-nexus/A-8.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-8.png" width="1054" height="587" loading="lazy" alt="GAME DEV LOG 01 | 涌现与回忆 —— 未领取的过去，正文图片 8" /></a></figure></div>

<div class="devlog-source-block" data-source-block="151"><p>它当然还很早。</p></div>

<div class="devlog-source-block" data-source-block="152"><p>还有许多工作。眼下最重要的，是让动作、反馈和信息能够接起来，再检验玩家是否愿意继续追问。</p></div>

<div class="devlog-source-block" data-source-block="153"><p>最初的故事已经开始有了可以观察和操作的形状。</p></div>

<div class="devlog-source-block" data-source-block="154"><p>那台 K-3089，也从文字里的一个物件，走进了我们的界面与设备探索中。</p></div>

<div class="devlog-source-block" data-source-block="155"><figure><a href="/media/devlogs/astra-nexus/A-9.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-9.png" width="3440" height="1392" loading="lazy" alt="《K-3089》的粗糙版本界面与视觉探索：
以维修终端承载档案、人物通讯和证据关系，并探索设备检视的表现。" /></a></figure></div>

<div class="devlog-source-block" data-source-block="156"><figure><a href="/media/devlogs/astra-nexus/A-10.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-10.png" width="1280" height="720" loading="lazy" alt="《K-3089》的粗糙版本界面与视觉探索：
以维修终端承载档案、人物通讯和证据关系，并探索设备检视的表现。" /></a></figure></div>

<div class="devlog-source-block" data-source-block="157"><figure><a href="/media/devlogs/astra-nexus/A-11.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-11.png" width="1280" height="720" loading="lazy" alt="《K-3089》的粗糙版本界面与视觉探索：
以维修终端承载档案、人物通讯和证据关系，并探索设备检视的表现。" /></a></figure></div>

<div class="devlog-source-block" data-source-block="158"><p class="devlog-caption"><code>《K-3089》的粗糙版本界面与视觉探索：</code></p></div>

<div class="devlog-source-block" data-source-block="159"><p class="devlog-caption"><code>以维修终端承载档案、人物通讯和证据关系，并探索设备检视的表现。</code></p></div>

<div class="devlog-source-block" data-source-block="160"><hr /></div>

<div class="devlog-source-block" data-source-block="161"><p>开发调查游戏和玩调查游戏有时候很像。我们同样只有一些已经确定的东西，一些仍然无法回答的问题，以及下一块还没有被找到的证据。</p></div>

<div class="devlog-source-block" data-source-block="162"><p>“涌现”也让我们有了一个具体的检验标准：</p></div>

<div class="devlog-source-block" data-source-block="163"><p><span class="devlog-source-emphasis">当玩家把两条线索放到一起时，他是否产生了之前没有的问题，或者重新理解了一个已经见过的事实？</span></p></div>

<div class="devlog-source-block" data-source-block="164"><p>我们希望那个变化，最终能由玩家自己说出来。</p></div>

<div class="devlog-source-block" data-source-block="165"><p>目前唯一可以确定的是：</p></div>

<div class="devlog-source-block" data-source-block="166"><p><span class="devlog-source-emphasis">关于这台无人领取已久的机器，我们也还在调查。</span></p></div>

<div class="devlog-source-block" data-source-block="167"><blockquote><p><span class="devlog-source-emphasis"><strong>K-3089</strong></span><br /><span class="devlog-source-emphasis"><strong>STATUS: UNCLAIMED</strong></span><br /><span class="devlog-source-emphasis"><strong>CASE: OPEN</strong></span></p></blockquote></div>

<div class="devlog-source-block" data-source-block="168"><p><span class="devlog-source-emphasis">*创作说明：本作计划由团队自主完成最终美术、游戏叙事文本、游戏玩法和交互设计系统。AI 工具用于辅助编程、资料检索与开发文档整理。</span></p></div>

<div class="devlog-source-block" data-source-block="169"><h2 id="source-heading-8">References</h2></div>

<div class="devlog-source-block" data-source-block="170"><p><strong>[1]</strong> Grace Lee. <em>Critical find by Airman just doing job.</em> 56th Fighter Wing Public Affairs, Luke Air Force Base, 8 August 2014.</p></div>

<div class="devlog-source-block" data-source-block="171"><p><strong>[2]</strong> Luke Air Force Base. <em>Luke Heritage Pamphlet 1941–2021.</em> 2014 年 5 月 6 日条目：记录 SrA Jessica M. Reitano 首次发现 F-16 座舱区域 longeron 裂纹。</p></div>

<div class="devlog-source-block" data-source-block="172"><p>[3] U.S. Air Force photograph by Senior Airman Grace Lee. <em>Critical find by Airman just doing job.</em> VIRIN: 140725-F-NQ441-001.JPG. Luke Air Force Base photo archive. Public Domain; cleared for release.</p></div>

<div class="devlog-source-block" data-source-block="173"><p><strong>[4]</strong> Aristotle. <em>Poetics</em>, Parts XI, XVI. 关于 reversal、recognition，以及《俄狄浦斯王》作为“从事件自身产生识认”的典型案例。</p></div>

<div class="devlog-source-block" data-source-block="174"><p><a href="https://classics.mit.edu/Aristotle/poetics.1.1.html">经典文学档案馆</a></p></div>

<div class="devlog-source-block" data-source-block="175"><p><strong>[5]</strong> Stanford Encyclopedia of Philosophy. <em>Aristotle’s Aesthetics.</em> 关于亚里士多德将 plot、reversal、recognition 等作为悲剧结构核心的讨论。</p></div>

<div class="devlog-source-block" data-source-block="176"><p><a href="https://plato.stanford.edu/entries/aristotle-aesthetics">斯坦福哲学百科全书</a></p></div>

<div class="devlog-source-block" data-source-block="177"><p><strong>[6]</strong> Agatha Christie Ltd. <em>The Murder of Roger Ackroyd.</em> 官方作品资料，初版于 1926 年。</p></div>

<div class="devlog-source-block" data-source-block="178"><p><a href="https://www.agathachristie.com/en/stories/the-murder-of-roger-ackroyd">阿加莎·克里斯蒂</a></p></div>

<div class="devlog-source-block" data-source-block="179"><p><a href="https://www.taptap.cn/hashtag/%E8%81%9A%E5%85%89%E7%81%AFGameJam%E5%BC%80%E5%8F%91%E8%80%85%E6%97%A5%E5%BF%97">#聚光灯gamejam开发者日志</a> <a href="https://www.taptap.cn/hashtag/%E8%81%9A%E5%85%89%E7%81%AF">#聚光灯</a> <a href="https://www.taptap.cn/hashtag/%E8%81%9A%E5%85%89%E7%81%AF%E6%B8%B8%E6%88%8F%E5%88%9B%E4%BD%9C%E6%8C%91%E6%88%98">#聚光灯游戏创作挑战</a> <a href="https://www.taptap.cn/hashtag/%E7%8B%AC%E7%AB%8B%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91">#独立游戏开发</a> <a href="https://www.taptap.cn/hashtag/%E8%A7%A3%E8%B0%9C%E6%B8%B8%E6%88%8F">#解谜游戏</a> <a href="https://www.taptap.cn/hashtag/%E6%8E%A8%E7%90%86%E8%A7%A3%E8%B0%9C">#推理解谜</a> <a href="https://www.taptap.cn/hashtag/%E8%99%9A%E6%9E%84%E5%8F%99%E4%BA%8B">#虚构叙事</a> <a href="https://www.taptap.cn/hashtag/%E5%8F%99%E4%BA%8B%E6%B8%B8%E6%88%8F">#叙事游戏</a> <a href="https://www.taptap.cn/hashtag/%E7%A7%91%E5%B9%BB%E6%B8%B8%E6%88%8F">#科幻游戏</a> </p></div>

<div class="devlog-attachments" aria-label="原文附图"><figure><a href="/media/devlogs/astra-nexus/A-10.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-10.png" width="1280" height="720" loading="lazy" alt="原文附图 1" /></a></figure>
<figure><a href="/media/devlogs/astra-nexus/A-3.png" target="_blank" rel="noopener" aria-label="查看原尺寸图片"><img src="/media/devlogs/astra-nexus/A-3.png" width="2467" height="1214" loading="lazy" alt="原文附图 2" /></a></figure></div>
