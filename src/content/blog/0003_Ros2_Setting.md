---
title: 'ROS2 環境設定'
description: '從 0 開始的 ROS2 世界'
pubDate: 'Aug 27 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
tags: ['Robotic', 'ROS2', '筆記']
---

想要使用，那總要知道怎麼用吧！
這裡就會簡單介紹一下該怎麼建置環境啦~

> **環境配置**
> Linux 版本: Ubuntu 22.04
> ROS2 版本: Humble
> 語法: Python

## 建置環境
整體的過程大概是
```
Workspace -> Package -> Node -> Build -> Source -> Run
```

### 建立 Workspace
這個就是用來放 ROS2 專案與 Package 的工作資料夾。

首先建立資料夾
```shell
mkdir -p ~/ros2_ws/src
``` 

`ros2_ws` 就是整個的工作區
`src` 則是放置程式碼的地方

### 建立 Package

**如果要使用 Ros2 相關指令，需先輸入下方指令**
```shell
source /opt/ros/humble/setup.bash
```

接下來就是開始建置package啦

```shell
cd ~/ros2_ws/src
ros2 pkg create <package_name> --build-type ament_python --node-name <node_name> --dependencies rclpy px4_msgs
```

`--build-type` 可以選擇用 c++ 或 python
`--node-name` 就是節點名稱
`--dependencies` 是會使用到的依賴項目

整個資料夾會變成這樣子
```shell
src/
└── <pkg_name>/
    │
    ├── package.xml
    ├── setup.py
    ├── setup.cfg
    │
    ├── resource/
    │   └── <pkg_name>
    │
    └── <pkg_name>/
        └── __init__.py
        └── <node_name>
```

### 建立 Node

Node 之後都會放在這邊
```shell
src/
└── <pkg_name>/
    └── <pkg_name>/
        └── test_node.py
```

可以簡單的用個程式測試
```py
import rclpy
from rclpy.node import Node

class TestNode(Node):
    def __init__(self):
        super().__init__('test_node')
        self.get_logger().info(
            'Test node started'
        )

def main(args=None):
    rclpy.init(args=args)
    node = TestNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == '__main__':
    main()
```

`class TestNode(Node):` 代表建立一個 Node。
`rclpy.init(args=args)` 代表初始化 ROS2 Python 系統。
`rclpy.spin(node)` 讓這個 Node 一直活著，等待 ROS2 事件。

寫好程式之後，還要再去 setup.py 設定
```py
entry_points={
    'console_scripts': [
        'test_node = uav_control.test_node:main',
        # '<node_name> = <pkg_name>.<node_name>:執行main()'
    ],
},
```

### 額外設定
如果之後會增加其他的 dependency 那就可以到 package.xml 裡面設定

```xml
<depend>dependency_name</depend>
```

### 準備 Build
先回到 workspace
```shell
cd ~/ros2_ws
source /opt/ros/humble/setup.bash
```

開始 build
```shell
colcon build --symlink-install --packages-select <pkg_name>
```

`--symlink-install` 當你在修改程式碼後，不用每次的重新 build
`--packages-select` 能夠只針對某個 package 去 build

跑完後就會把東西丟到 `install/` 裡面，然後就可以使用下面的指令來載入我們的 workspace。
```shell
source install/setup.bash
```

### 檢查一下
檢查一下 ROS2 能不能找到我們的 package。
```shell
# 檢查 Package
ros2 pkg list | grep <pkg_name> 
# 檢查 Executable
ros2 pkg executables <pkg_name> 
```

### 執行 Node
透過下面的指令就能夠順利執行啦！
```shell
ros2 run <pkg_name> <node_name>
```

