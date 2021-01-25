(function (window, document) {
  document.body.style.overflow = "hidden";
  window.FullPage = function (
    el,
    childEl,
    isWhell = true,
    isTabCircle = false,
    floatDirection = "left",
    tabCircleFocusColor = "#f40",
    tabCircleBlurColor = "#fff"
  ) {
    if (this === window) {
      throw new Error("FullPage should be created using new");
    }
    // 获取父盒子元素
    this.$el = document.querySelector(el);
    let _this = this;
    // 获取子盒子元素
    this.$child = document.querySelectorAll(childEl);
    // 保存子盒子个数，便于便利使用
    this.$childLength = this.$child.length;
    // 小圆点选中颜色
    this.$tabCircleFocusColor = tabCircleFocusColor;
    // 小圆点失去焦点颜色
    this.$tabCircleBlurColor = tabCircleBlurColor;
    // 小圆点方向
    this.$floatDirection = floatDirection;
    let uls = null;
    let lis = null;
    // 是否显示小圆点，默认为false(不显示)
    if (typeof isTabCircle !== "boolean") {
      throw new TypeError("isTabCircle should be true or false");
    } else if (isTabCircle) {
      this.tabCircle();
      uls = this.$el.getElementsByTagName("ul")[0];
      lis = uls.getElementsByTagName("li");
      lis[0].style.backgroundColor = this.$tabCircleFocusColor;
      uls.addEventListener("click", function (e) {
        let targets = e.target || e.srcElement;
        if (targets.nodeName.toLowerCase() === "li") {
          for (let j = 0; j < _this.$childLength; j++) {
            _this.$child[j].style.opacity = "0";
          }
          _this.$child[targets.index].style.display = "block";
          _this.$child[targets.index].style.opacity = "1";
          for (let k = 0; k < lis.length; k++) {
            lis[k].style.backgroundColor = _this.$tabCircleBlurColor;
          }
          lis[targets.index].style.backgroundColor = _this.$tabCircleFocusColor;
        }
      });
      this.floatDirection(this.$floatDirection, uls);
    }
    // 定义网页宽和搞到原型上面
    Object.defineProperties(this, {
      WIDTH: {
        get() {
          let w =
            window.innerWidth ||
            window.screen.width ||
            window.visualViewport.width;
          return w;
        },
      },
      HEIGHT: {
        get() {
          let h =
            window.innerHeight ||
            window.screen.height ||
            window.visualViewport.height;
          return h;
        },
      },
    });
    // 设置外盒子(el)全屏
    this.setFullPage();
    // 设置子盒子(childEl)全屏
    this.eachChild();
    // 使用滚轮滚动页面
    if (typeof isWhell !== "boolean") {
      throw new TypeError("isWhell should be true or false");
    } else if (isWhell) {
      let count = 0;
      window.addEventListener("mousewheel", function (e) {
        // 滚轮向上滚动的时候deltaY为-100，滚轮向下滚动的时候deltaY是100
        if (e.deltaY > 0) {
          count++;
          if (count > _this.$childLength - 1) {
            count = 0;
          }
        } else {
          count--;
          if (count < 0) {
            count = _this.$childLength - 1;
          }
        }
        for (let j = 0; j < _this.$childLength; j++) {
          _this.$child[j].style.opacity = "0";
        }
        for (let k = 0; k < lis.length; k++) {
          lis[k].style.backgroundColor = _this.$tabCircleBlurColor;
        }
        _this.$child[count].style.opacity = "1";
        lis[count].style.backgroundColor = _this.$tabCircleFocusColor;
      });
      window.onresize = function () {
        // 设置外盒子(el)全屏
        _this.setFullPage();
        // 设置子盒子(childEl)全屏
        _this.eachChild();
      };
    }
  };
  // 设置父盒子全屏
  FullPage.prototype.setFullPage = function () {
    this.$el.style.position = "relative";
    this.$el.style.overflow = "hidden";
    this.$el.style.height = this.HEIGHT + "px";
    this.$el.style.width = this.WIDTH + "px";
  };
  // 设置子盒子全屏
  FullPage.prototype.eachChild = function (child) {
    let _this = this;
    for (let i = 0; i < this.$childLength; i++) {
      this.$child[i].index = i;
      this.$child[i].style.transition = "all 0.5s ease";
      this.$child[i].style.position = "absolute";
      this.$child[i].style.opacity = "0";
      this.$child[i].style.width = "100%";
      this.$child[i].style.height = "100%";
      this.$child[i].style.display = "none";
    }
    setTimeout(function () {
      for (let i = 0; i < _this.$childLength; i++) {
        _this.$child[i].style.display = "block";
      }
    });

    this.$child[0].style.opacity = "1";
  };
  // 是否显示小圆点
  FullPage.prototype.tabCircle = function () {
    let ul = document.createElement("ul");
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < this.$childLength; i++) {
      let li = document.createElement("li");
      li.style.width = "20px";
      li.style.height = "20px";
      li.style.borderRadius = "50%";
      li.style.border = "1px solid #ccc";
      li.style.cursor = "pointer";
      li.style.margin = "10px";
      li.index = i;
      li.style.backgroundColor = this.$tabCircleBlurColor;
      li.style.overflow = "hidden";
      fragment.appendChild(li);
    }
    ul.style.position = "absolute";
    ul.style.listStyle = "none";
    ul.style.margin = "0px";
    ul.style.padding = "0px";
    ul.appendChild(fragment);
    this.$el.appendChild(ul);
  };
  // 设置小圆点方向
  FullPage.prototype.floatDirection = function (direction, ul) {
    if (typeof direction !== "string") {
      throw new TypeError(
        "direction should be string,It's expecting values [left,right,top,bottom]"
      );
    }
    let directions = direction.toLowerCase();
    let lis = ul.getElementsByTagName("li");
    if (directions === "left") {
      ul.style[directions] = "20px";
      ul.style.top = "50%";
      ul.style.transform = "translateY(-50%)";
    } else if (directions === "right") {
      ul.style[directions] = "20px";
      ul.style.top = "50%";
      ul.style.transform = "translateY(-50%)";
    } else if (directions === "top") {
      ul.style[directions] = "20px";
      ul.style.left = "50%";
      ul.style.transform = "translateX(-50%)";
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.float = "left";
        lis[i].style.margin = "10px";
      }
    } else {
      ul.style.bottom = "20px";
      ul.style.left = "50%";
      ul.style.transform = "translateX(-50%)";
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.float = "left";
        lis[i].style.margin = "10px";
      }
    }
  };
})(window, document);
