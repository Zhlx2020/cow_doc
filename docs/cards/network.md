# TCP 三次握手的详细流程和每个状态的含义？

1. 客户端发送 SYN 包，进入 SYN_SENT 状态
2. 服务端收到后回复 SYN+ACK，进入 SYN_RCVD 状态
3. 客户端收到后发送 ACK，双方进入 ESTABLISHED 状态

关键点：
- SYN 用于同步序列号
- ACK 确认对方的序列号
- 三次握手防止旧连接请求造成混乱

# Vue3 Composition API vs Options API？

Composition API 优势：更好的逻辑复用（代替 mixin）、类型推导更友好、按功能组织代码而非选项分散、tree-shaking 更彻底。适合大型项目和 TypeScript。


# HTTP 和 HTTPS 的区别？

HTTPS = HTTP + SSL/TLS
- 加密传输
- 身份验证
- 数据完整性保护