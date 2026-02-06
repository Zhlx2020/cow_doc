# VitePress部署流程

## 购买域名
https://www.spaceship.com/zh/application/advanced-dns-application/manage/777468.xyz/
## 托管域名
<p>注册Cloudflare之后，进入域管理，点击加入域。</p>

![alt text](assets/image.png)

<p>回到space网站中，找到自己的主域名（这里假设我的域名为33333.xyz）</p>

![alt text](assets/image-1.png)

<p>将主域名粘贴到Cloudflare域输入框</p>

![alt text](assets/image-3.png)

<p>选择免费计划</p>

![alt text](assets/image-2.png)
这里是告诉你你的这个域名已经做了哪些解析，不用管
![alt text](assets/image-4.png)
这里Cloudflare给你分配了两个域名服务器，你需要将这两个域名服务器配置到space中
![alt text](assets/image-5.png)
进入space，点击change按钮
![alt text](assets/image-6.png)
选择自定义name server，然后填入 Cloudflare 的域名服务器
![alt text](assets/image-7.png)
完成之后回到Cloudflare点击立即检测，这里大概要1小时左右同步
![alt text](assets/image-8.png)
可以回到space中，查看同步的进度，所有的服务器都online就可以了
![alt text](assets/image-9.png)
检测通过后，配置cname域名解析，名称配置blog（自动拼接为blog.33333.xyz），内容配置为gitpage提供的zhlx2020.github.io
![alt text](assets/image-10.png)
最后去ssl界面，将端对端连接方式改为full
![alt text](assets/image-11.png)
然后去github的gitpage中配置自定义域名为blog.33333.xyz
![alt text](assets/image-12.png)
最后访问网站，看是否成功
![alt text](assets/image-13.png)