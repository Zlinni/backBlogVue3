# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


# 注意tailwind和postcss现在会生成cjs文件
为了esm而设计

# 暗色模式设计及响应式
darkMode
写在tailwind.config.cjs里面.编写暗色的50-900的色调
然后darkMode是class类型

这样我们能在vue模板中使用`:class={'dark':darkMode}`去控制

响应式的尺寸也在里面编写

# 响应式的设计结合tailwind

容器给min-h-full表示最小高度100%
内层容器给grid布局 占12 mxauto 
然后是响应式的部分:`sm-px-6 lg:max-w-7xl`
`lg:max-w-7xl`这行代码表示超过lg尺寸最大的width就是1280px(80rem) 这部分的完整
```html
                  <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

```

```javascript
      <div :class="{'dark':darkMode}">
            <div class="bg-white dark:bg-dim-900">
                  <!-- 容器以及布局 -->
                  <div class="min-h-full">
                        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
                              <!-- LeftSideBar -->
                              <div class="md:block xs:col-span-1 xl:col-span-2">
                                    <div class="sticky top-0">
                                          <SideBarLeft />
                                    </div>
                              </div>
                              <!-- MainContent -->
                              <!-- RightSideBar -->
                        </div>
                  </div>
            </div>
      </div>
```

# 时间转数字的操作
naiveui提供的时间是转成时间戳的就很神奇，后面发现这样操作就ok了,这样的话后台对比是否在这个时间段内也很方便
```javascript
+new Date('2012-09-03')
```

# mongoose 时间区间查询
```javascript
      $and: [{ date: { $gt: startTime } }, { date: { $lt: endTime } }]
```
注意还要把schema里面的date转化为Date格式

转化的结果
```javaScript
+new Date('2022-04-21 08:31:57')
1650501117000
//转后
+new Date('2022-04-21T00:31:57.000Z')
1650501117000
```

注意在前端把这种字符串转化
```javaScript
new Date('2022-04-21T00:31:57.000Z').toLocaleString()
```

# ts定义window上面的变量类型
在`*.d.ts`中声明
```javaScript
declare interface Window{
  $message: MessageApiInjection
}
```

