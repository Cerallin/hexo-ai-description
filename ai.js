const { OpenAI } = require("openai");

module.exports = async function (content, config) {
  const { api_key, api_url, model, max_tokens, prompt } = config;

  const client = new OpenAI({
    apiKey: api_key,
    baseURL: api_url || "https://api.openai.com/v1",
  });

  // 发送聊天请求
  const response = await client.chat.completions.create({
    model: model || "gpt-4o", // 若未提供 model，默认使用 gpt-4
    messages: [{
      role: "user",
      content: [
        prompt,
        content,
      ].join('\n')
    }],
    max_tokens: max_tokens,
  });

  const result = response.choices[0].message.content

  return result.replaceAll(/\<think\>(.|\s)*\<\/think\>\s+/g, '');
};
