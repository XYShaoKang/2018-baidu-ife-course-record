# 弹性布局 flex

在父级加`display:flex;`
设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效添加 flex 之后，父元素变为伸缩容器 - Flex Container, 子元素变为伸缩项 - Flex Item
附带会产生一个主轴(main axis)和侧轴(cross axis)，默认主轴从左往右，侧轴从上往下。伸缩容器的水平尺寸为主尺寸，垂直尺寸为侧尺寸。伸缩项将按主轴和侧轴的方向进行排列。伸缩容器属性

## 伸缩容器

* flex-direction 改变主轴方向
  * row (default)
  * row-reverse 翻转主轴
  * column 调换主轴和侧轴
  * column-reverse 调换主轴和侧轴，并翻转主轴
* flex-wrap 当伸缩项超出容器时的行为，改变侧轴方向
  * nowrap (default) 所有伸缩项在一行上
  * wrap 当伸缩项超出容器时从上到下换行
  * wrap-reverse 当伸缩项超出容器时从下到上换行
* flex-flow flex-direction 和 flex-wrap 简写，根据值来判断具体的属性。
* justify-content 控制伸缩项在主轴的展现方式
  * flex-start (default)向主轴开始方向对齐
  * flex-end 向主轴终点方向对齐
  * center 居中对齐
  * space-between 把多余的空间平均分配，除了起点和终点
  * space-around 把多余的空间平均分配，伸缩项的两边距离相等
  * space-evenly 把多余空间平均分配，任何两个伸缩项之间的间距相等
* align-items 控制伸缩项在侧轴的展现方式
  * stretch (default) 拉伸伸缩项，如果伸缩项没有指定高度，会拉伸伸缩项为这一行的整体高度。
  * center 居中对齐
  * flex-start 向起点对齐
  * flex-end 向终点对齐
  * baseline 与基线对齐
* align-content 控制伸缩项所组成的行（列）在侧轴的展现方式。
  > 该属性在伸缩行（列）只有一行（列）的时候不生效
  * stretch (default)
  * flex-start
  * flex-end
  * center
  * space-between
  * space-around

## 伸缩项

* order 改变指定伸缩项的位置，值为整数，默认是 0，数值越大越靠后。
* align-self 控制指定伸缩项在侧轴的展现方式。
  * stretch (default)
  * flex-start
  * flex-end
  * baseline
* flex-grow 控制伸缩项在伸缩行的伸展程度，值为整数，是把行空白地方按比例分配。
* flex-shrink 控制伸缩项在伸缩行的收缩程度，值为整数
* flex-basis 定义伸缩项伸缩前的尺寸，值为 `auto` | `<length>`，默认为`auto`
  > 设置了 grow 或 shrink 的伸缩项将以这个尺寸为基准进行伸缩。
* flex `flex-grow`、`flex-shrink`、`flex-basis`的缩写，值为 none 或者三种属性的集合，none 代表`0 0 auto`。如果某个属性不写，那么他们的默认值是：
  > flex-grow:1
  >
  > flex-shrink:1
  >
  > flex-basis:0

>如果要让列固定宽度，设置flex-shrink和flex-grow 的值为0，因为flex-grow的值默认为0，所以一般设置flex-shrink的值为0即可。

参考

[FlexBox-弹性盒子详解](http://study.163.com/course/courseMain.htm?courseId=1003164044)
[Flexbox完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
[深入理解 flex-grow & flex-shrink & flex-basis](https://segmentfault.com/a/1190000006741711)
