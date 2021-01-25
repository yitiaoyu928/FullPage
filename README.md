# FullPage
## 使用方法
FullPage使用面向对象方法，使用前请使用new操作符初始化代码	
```new FullPage(".view", '.content', true, true, 'bottom');```
FullPage接受两个必选参数，参数一是父盒子，用于包裹子盒子，参数二位子盒子，用于存放内容，它还接受5个可选参数， 从第三个参数开始，他们分别是：

是否使用使用鼠标滚轮，默认为true。

是否显示小圆点菜单，默认为false。

小圆点位置，默认为"left"，此外，还可以为:"right"，"top"，"bottom"。

小圆点选中颜色，默认为#f40。

小圆点未选中颜色，默认为#fff。