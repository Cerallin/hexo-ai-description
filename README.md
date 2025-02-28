# hexo-ai-description

## 配置文件
```
ai_description:
  default: false
  api_url:
  model:
  prompt: '你是一个摘要生成工具，你需要解释我发送给你的内容，不要换行，不要超过200字，只需要介绍文章的内容，不需要提出建议和缺少的东西。请用中文回答，输出的内容开头为“ai: 这篇文章介绍了”'
  ignore_elements: [
    'table', 'pre', 'figure'
  ]
  max_token: 2000,
```
