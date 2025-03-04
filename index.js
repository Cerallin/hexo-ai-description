const log = require('hexo-log').default()
const fs = require('hexo-fs')
const fm = require('hexo-front-matter')

const strip = require('./strip')
const aiDescription = require('./ai')

const config = Object.assign({
    default: false,
    api_url: "https://api.openai.com/v1",
    prompt: '你是一个摘要生成工具，你需要解释我发送给你的内容，不要换行，不要超过200字，只需要介绍文章的内容，不需要提出建议和缺少的东西。请用中文回答，输出的内容开头为“这篇文章介绍了”',
    ignore_elements: [
        'table',
        'pre',
        'figure'
    ],
    max_tokens: 2000,
}, hexo.config.ai_description)

async function attachExcerptToPost(data) {
    // Skip if already has a description
    if (data.description) {
        return data;
    }

    let toGenerate = data.ai_description
    if (typeof toGenerate === "undefined") {
        toGenerate = config.default
    }

    if (!toGenerate) {
        return data;
    }

    const content = strip(data.content, config.ignore_elements);
    if (config.max_tokens && content.length > config.max_tokens) {
        log.info(`Skipping "${data.title}": Content exceeds max token limit.`);
        return data;
    }

    log.info(`Generating description for "${data.title}"...`);
    const filePath = this.source_dir + data.source;
    const frontMatter = fm.parse(await fs.readFile(filePath));

    frontMatter.description = data.description = await aiDescription(content, config);

    await fs.writeFile(filePath, `---\n${fm.stringify(frontMatter)}`);
    log.info(`Description saved for "${data.title}".`);

    return data;
}

hexo.extend.filter.register('after_post_render', attachExcerptToPost);
