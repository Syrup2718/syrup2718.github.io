---
title: 'ROS2 基本介紹'
description: 'ROS2 是什麼，可以吃嗎？'
pubDate: 'Aug 24 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['Robotic', 'ROS2', '筆記']
---

就是用來放我對 ROS2 了解多少的地方！

這是第一次接觸 ROS2 所以有一些地方可能會有錯誤><
之後就慢慢補充啦

## ROS2 簡介

ROS2（Robot Operating System 2）是一個專門給機器人用的軟體框架，我覺得可以理解成就是一種機器人用來溝通不同功能模組的橋樑，都可以透過 ROS 2 互相交換資料。

### Node 

整個裡面最核心的概念就是 Node（節點），能夠把每一個功能都模組化，一個模組就是一個 Node。

除了 Node 以外，再來就是 Topic 和 Service。

### Topic 
Topic 的話我覺得可以理解成